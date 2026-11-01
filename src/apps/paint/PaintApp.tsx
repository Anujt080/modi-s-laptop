import React, { useRef, useState, useEffect } from 'react';
import { sound } from '../../sound/soundEngine';

type Tool = 'pencil' | 'brush' | 'eraser' | 'fill' | 'line' | 'rect' | 'ellipse';

const WIN98_PALETTE = [
  '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080',
  '#808040', '#004040', '#0080ff', '#004080', '#8000ff', '#804000',
  '#ffffff', '#c0c0c0', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff',
  '#ffff80', '#00ff80', '#80ffff', '#8080ff', '#ff0080', '#ff8040',
];

export const PaintApp: React.FC<{ windowId: string }> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tempCanvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState<Tool>('pencil');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [brushSize, setBrushSize] = useState(2);
  const [isDrawing, setIsDrawing] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });

  // Initialize white canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.floor(e.clientX - rect.left),
      y: Math.floor(e.clientY - rect.top),
    };
  };

  // Simple flood fill
  const floodFill = (startX: number, startY: number, fillColor: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    // Convert hex to rgb
    const tempDiv = document.createElement('div');
    tempDiv.style.color = fillColor;
    document.body.appendChild(tempDiv);
    const rgbStr = window.getComputedStyle(tempDiv).color;
    document.body.removeChild(tempDiv);
    const match = rgbStr.match(/\d+/g);
    if (!match) return;
    const fillR = parseInt(match[0]);
    const fillG = parseInt(match[1]);
    const fillB = parseInt(match[2]);

    const targetIdx = (startY * canvas.width + startX) * 4;
    const targetR = data[targetIdx];
    const targetG = data[targetIdx + 1];
    const targetB = data[targetIdx + 2];

    if (targetR === fillR && targetG === fillG && targetB === fillB) return;

    const queue: [number, number][] = [[startX, startY]];
    const visited = new Uint8Array(canvas.width * canvas.height);

    while (queue.length > 0) {
      const [x, y] = queue.pop()!;
      if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue;
      const idx: number = y * canvas.width + x;
      if (visited[idx]) continue;
      visited[idx] = 1;

      const pIdx = idx * 4;
      if (
        data[pIdx] === targetR &&
        data[pIdx + 1] === targetG &&
        data[pIdx + 2] === targetB
      ) {
        data[pIdx] = fillR;
        data[pIdx + 1] = fillG;
        data[pIdx + 2] = fillB;
        data[pIdx + 3] = 255;

        queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
      }
    }

    ctx.putImageData(imgData, 0, 0);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasCoords(e);
    startPos.current = { x, y };
    setIsDrawing(true);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const color = e.button === 2 ? bgColor : fgColor;

    if (selectedTool === 'fill') {
      sound.playClick();
      floodFill(x, y, color);
      setIsDrawing(false);
      return;
    }

    ctx.strokeStyle = selectedTool === 'eraser' ? bgColor : color;
    ctx.lineWidth = selectedTool === 'eraser' ? brushSize * 4 : brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (selectedTool === 'pencil' || selectedTool === 'brush' || selectedTool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { x, y } = getCanvasCoords(e);
    const canvas = canvasRef.current;
    const tempCanvas = tempCanvasRef.current;
    if (!canvas || !tempCanvas) return;

    const ctx = canvas.getContext('2d');
    const tempCtx = tempCanvas.getContext('2d');
    if (!ctx || !tempCtx) return;

    const color = e.buttons === 2 ? bgColor : fgColor;

    if (selectedTool === 'pencil' || selectedTool === 'brush' || selectedTool === 'eraser') {
      ctx.strokeStyle = selectedTool === 'eraser' ? bgColor : color;
      ctx.lineWidth = selectedTool === 'eraser' ? brushSize * 4 : brushSize;
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      // Preview shapes on temporary canvas
      tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
      tempCtx.strokeStyle = color;
      tempCtx.lineWidth = brushSize;

      if (selectedTool === 'line') {
        tempCtx.beginPath();
        tempCtx.moveTo(startPos.current.x, startPos.current.y);
        tempCtx.lineTo(x, y);
        tempCtx.stroke();
      } else if (selectedTool === 'rect') {
        const w = x - startPos.current.x;
        const h = y - startPos.current.y;
        tempCtx.strokeRect(startPos.current.x, startPos.current.y, w, h);
      } else if (selectedTool === 'ellipse') {
        const rx = Math.abs(x - startPos.current.x) / 2;
        const ry = Math.abs(y - startPos.current.y) / 2;
        const cx = Math.min(startPos.current.x, x) + rx;
        const cy = Math.min(startPos.current.y, y) + ry;
        tempCtx.beginPath();
        tempCtx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        tempCtx.stroke();
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const { x, y } = getCanvasCoords(e);
    const canvas = canvasRef.current;
    const tempCanvas = tempCanvasRef.current;
    if (!canvas || !tempCanvas) return;

    const ctx = canvas.getContext('2d');
    const tempCtx = tempCanvas.getContext('2d');
    if (!ctx || !tempCtx) return;

    const color = e.button === 2 ? bgColor : fgColor;
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;

    if (selectedTool === 'line') {
      ctx.beginPath();
      ctx.moveTo(startPos.current.x, startPos.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (selectedTool === 'rect') {
      const w = x - startPos.current.x;
      const h = y - startPos.current.y;
      ctx.strokeRect(startPos.current.x, startPos.current.y, w, h);
    } else if (selectedTool === 'ellipse') {
      const rx = Math.abs(x - startPos.current.x) / 2;
      const ry = Math.abs(y - startPos.current.y) / 2;
      const cx = Math.min(startPos.current.x, x) + rx;
      const cy = Math.min(startPos.current.y, y) + ry;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
  };

  const handleClear = () => {
    sound.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleSave = () => {
    sound.playAsterisk();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'painting.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#c0c0c0] select-none">
      {/* Menu Bar */}
      <div className="win-menubar">
        <div className="win-menu-item" onClick={handleSave}><u>F</u>ile (Save PNG)</div>
        <div className="win-menu-item" onClick={handleClear}><u>E</u>dit (Clear)</div>
        <div className="win-menu-item"><u>V</u>iew</div>
        <div className="win-menu-item"><u>I</u>mage</div>
        <div className="win-menu-item"><u>H</u>elp</div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Toolbar */}
        <div className="w-[58px] bg-[#c0c0c0] p-1 border-r border-[#808080] flex flex-col gap-1 items-center">
          <div className="grid grid-cols-2 gap-1 win-inset-gray p-1">
            {[
              { id: 'pencil', label: '✎', title: 'Pencil' },
              { id: 'brush', label: '🖌', title: 'Brush' },
              { id: 'eraser', label: '⌫', title: 'Eraser' },
              { id: 'fill', label: '🪣', title: 'Fill With Color' },
              { id: 'line', label: '╱', title: 'Line' },
              { id: 'rect', label: '▭', title: 'Rectangle' },
              { id: 'ellipse', label: '◯', title: 'Ellipse' },
            ].map((tool) => (
              <button
                key={tool.id}
                className={`w-[22px] h-[22px] win-btn ${selectedTool === tool.id ? 'depressed' : ''}`}
                style={{ minWidth: 22, minHeight: 22, padding: 0 }}
                title={tool.title}
                onClick={() => {
                  sound.playClick();
                  setSelectedTool(tool.id as Tool);
                }}
              >
                {tool.label}
              </button>
            ))}
          </div>

          {/* Brush Sizes */}
          <div className="win-inset-gray p-1 w-full flex flex-col items-center gap-1.5 mt-2">
            {[1, 3, 6, 10].map((sz) => (
              <div
                key={sz}
                className={`w-full h-3 flex items-center justify-center cursor-pointer ${
                  brushSize === sz ? 'bg-[#000080]' : ''
                }`}
                onClick={() => {
                  sound.playClick();
                  setBrushSize(sz);
                }}
              >
                <div
                  className="rounded-full"
                  style={{
                    width: sz,
                    height: sz,
                    backgroundColor: brushSize === sz ? '#ffffff' : '#000000',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Center Drawing Canvas Viewport */}
        <div className="flex-1 overflow-auto bg-[#808080] p-2 flex items-center justify-center">
          <div className="relative win-inset bg-white" style={{ width: 500, height: 320 }}>
            <canvas
              ref={canvasRef}
              width={500}
              height={320}
              className="absolute left-0 top-0 cursor-crosshair"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onContextMenu={(e) => e.preventDefault()}
            />
            <canvas
              ref={tempCanvasRef}
              width={500}
              height={320}
              className="absolute left-0 top-0 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Bottom Color Palette */}
      <div className="h-[46px] bg-[#c0c0c0] border-t border-[#808080] flex items-center px-2 gap-3">
        {/* Current Colors preview */}
        <div className="win-inset-gray relative w-8 h-8">
          <div
            className="absolute right-0.5 bottom-0.5 w-5 h-5 border border-black"
            style={{ backgroundColor: bgColor }}
            title="Background Color (Right Click)"
          />
          <div
            className="absolute left-0.5 top-0.5 w-5 h-5 border border-black z-10"
            style={{ backgroundColor: fgColor }}
            title="Foreground Color (Left Click)"
          />
        </div>

        {/* 28 Colors Grid */}
        <div className="grid grid-cols-14 grid-rows-2 gap-[1px] win-inset p-[2px] bg-white">
          {WIN98_PALETTE.map((color, i) => (
            <div
              key={i}
              className="w-3.5 h-3.5 cursor-pointer border border-[#808080]"
              style={{ backgroundColor: color }}
              onClick={() => {
                sound.playClick();
                setFgColor(color);
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                sound.playClick();
                setBgColor(color);
              }}
            />
          ))}
        </div>

        <div className="text-[10px] text-gray-700 ml-auto">
          Left-click = Primary | Right-click = Secondary
        </div>
      </div>
    </div>
  );
};
