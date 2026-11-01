import React, { useRef, useState, useEffect } from 'react';
import type { WindowInstance } from '../../types';
import { useDesktopStore } from '../../store/useDesktopStore';
import { Win98Icon } from '../common/Win98Icon';

interface WindowProps {
  window: WindowInstance;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ window: win, children }) => {
  const {
    activeWindowId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useDesktopStore();

  const isFocused = activeWindowId === win.id;
  const windowRef = useRef<HTMLDivElement>(null);

  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ mouseX: 0, mouseY: 0, winX: 0, winY: 0 });

  // Resizing state
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const resizeStartPos = useRef({ mouseX: 0, mouseY: 0, width: 0, height: 0, winX: 0, winY: 0 });

  // Handle Dragging
  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (win.isMaximized) return;
    if ((e.target as HTMLElement).closest('.win-titlebar-controls')) return;

    focusWindow(win.id);
    setIsDragging(true);
    dragStartPos.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      winX: win.x,
      winY: win.y,
    };
  };

  // Handle Resizing
  const handleResizeMouseDown = (direction: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (win.isMaximized) return;
    focusWindow(win.id);
    setIsResizing(direction);
    resizeStartPos.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      width: win.width,
      height: win.height,
      winX: win.x,
      winY: win.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStartPos.current.mouseX;
        const deltaY = e.clientY - dragStartPos.current.mouseY;
        const newX = Math.max(0, Math.min(window.innerWidth - 60, dragStartPos.current.winX + deltaX));
        const newY = Math.max(0, Math.min(window.innerHeight - 60, dragStartPos.current.winY + deltaY));
        updateWindowPosition(win.id, newX, newY);
      }

      if (isResizing) {
        const deltaX = e.clientX - resizeStartPos.current.mouseX;
        const deltaY = e.clientY - resizeStartPos.current.mouseY;
        const minW = win.minWidth || 200;
        const minH = win.minHeight || 150;

        let newW = resizeStartPos.current.width;
        let newH = resizeStartPos.current.height;
        let newX = resizeStartPos.current.winX;
        let newY = resizeStartPos.current.winY;

        if (isResizing.includes('e')) {
          newW = Math.max(minW, resizeStartPos.current.width + deltaX);
        }
        if (isResizing.includes('s')) {
          newH = Math.max(minH, resizeStartPos.current.height + deltaY);
        }
        if (isResizing.includes('w')) {
          const possibleW = resizeStartPos.current.width - deltaX;
          if (possibleW >= minW) {
            newW = possibleW;
            newX = resizeStartPos.current.winX + deltaX;
          }
        }
        if (isResizing.includes('n')) {
          const possibleH = resizeStartPos.current.height - deltaY;
          if (possibleH >= minH) {
            newH = possibleH;
            newY = resizeStartPos.current.winY + deltaY;
          }
        }

        updateWindowSize(win.id, newW, newH);
        updateWindowPosition(win.id, newX, newY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(null);
    };

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, win, updateWindowPosition, updateWindowSize]);

  if (win.isMinimized) return null;

  const style: React.CSSProperties = win.isMaximized
    ? {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: 'calc(100vh - 28px)',
        zIndex: win.zIndex,
        pointerEvents: 'auto',
      }
    : {
        position: 'absolute',
        left: `${win.x}px`,
        top: `${win.y}px`,
        width: `${win.width}px`,
        height: `${win.height}px`,
        zIndex: win.zIndex,
        pointerEvents: 'auto',
      };

  return (
    <div
      ref={windowRef}
      className="win-outset flex flex-col"
      style={{
        ...style,
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseDown={() => focusWindow(win.id)}
    >
      {/* Title Bar */}
      <div
        className={`win-titlebar ${!isFocused ? 'inactive' : ''}`}
        onMouseDown={handleTitleBarMouseDown}
        onDoubleClick={() => (win.isMaximized ? restoreWindow(win.id) : maximizeWindow(win.id))}
      >
        <div className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
          <Win98Icon name={win.icon} size={15} />
          <span className="truncate select-none">{win.title}</span>
        </div>

        <div className="win-titlebar-controls">
          <button
            className="win-ctrl-btn"
            title="Minimize"
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(win.id);
            }}
          >
            _
          </button>
          <button
            className="win-ctrl-btn"
            title={win.isMaximized ? 'Restore' : 'Maximize'}
            onClick={(e) => {
              e.stopPropagation();
              if (win.isMaximized) restoreWindow(win.id);
              else maximizeWindow(win.id);
            }}
          >
            {win.isMaximized ? '❐' : '□'}
          </button>
          <button
            className="win-ctrl-btn"
            title="Close"
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(win.id);
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 overflow-hidden relative flex flex-col bg-[#c0c0c0]">
        {children}
      </div>

      {/* Resize handles */}
      {!win.isMaximized && (
        <>
          <div
            className="absolute top-0 left-0 w-2 h-2 cursor-nw-resize"
            onMouseDown={(e) => handleResizeMouseDown('nw', e)}
          />
          <div
            className="absolute top-0 right-0 w-2 h-2 cursor-ne-resize"
            onMouseDown={(e) => handleResizeMouseDown('ne', e)}
          />
          <div
            className="absolute bottom-0 left-0 w-2 h-2 cursor-sw-resize"
            onMouseDown={(e) => handleResizeMouseDown('sw', e)}
          />
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize z-20"
            onMouseDown={(e) => handleResizeMouseDown('se', e)}
          />
          <div
            className="absolute top-0 left-2 right-2 h-1 cursor-n-resize"
            onMouseDown={(e) => handleResizeMouseDown('n', e)}
          />
          <div
            className="absolute bottom-0 left-2 right-2 h-1 cursor-s-resize"
            onMouseDown={(e) => handleResizeMouseDown('s', e)}
          />
          <div
            className="absolute left-0 top-2 bottom-2 w-1 cursor-w-resize"
            onMouseDown={(e) => handleResizeMouseDown('w', e)}
          />
          <div
            className="absolute right-0 top-2 bottom-2 w-1 cursor-e-resize"
            onMouseDown={(e) => handleResizeMouseDown('e', e)}
          />
        </>
      )}
    </div>
  );
};
