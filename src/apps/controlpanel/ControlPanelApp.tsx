import React, { useState, useEffect, useRef } from 'react';
import { useDesktopStore, type WallpaperStyle } from '../../store/useDesktopStore';
import { Win98Icon } from '../../components/common/Win98Icon';
import { sound } from '../../sound/soundEngine';

export const ControlPanelApp: React.FC<{ windowId: string }> = () => {
  const { wallpaper, setWallpaper, crtEnabled, toggleCrt, soundEnabled, toggleSound } =
    useDesktopStore();

  const [activeTab, setActiveTab] = useState<'display' | 'datetime' | 'system' | 'mouse'>('display');
  const [selectedWallpaper, setSelectedWallpaper] = useState<WallpaperStyle>(wallpaper);
  const [screenSaver, setScreenSaver] = useState<'pipes' | 'starfield' | 'matrix'>('starfield');
  const clockCanvasRef = useRef<HTMLCanvasElement>(null);
  const saverCanvasRef = useRef<HTMLCanvasElement>(null);

  // Analog clock animation
  useEffect(() => {
    if (activeTab !== 'datetime') return;
    const canvas = clockCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const renderClock = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = new Date();
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = 55;

      // Clock circle face
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Hour ticks
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6;
        const x1 = cx + Math.sin(angle) * (radius - 8);
        const y1 = cy - Math.cos(angle) * (radius - 8);
        const x2 = cx + Math.sin(angle) * radius;
        const y2 = cy - Math.cos(angle) * radius;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Hands
      const hours = now.getHours() % 12;
      const mins = now.getMinutes();
      const secs = now.getSeconds();

      // Hour hand
      const hrAngle = (hours + mins / 60) * ((Math.PI * 2) / 12);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.sin(hrAngle) * 32, cy - Math.cos(hrAngle) * 32);
      ctx.stroke();

      // Minute hand
      const minAngle = (mins + secs / 60) * ((Math.PI * 2) / 60);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.sin(minAngle) * 44, cy - Math.cos(minAngle) * 44);
      ctx.stroke();

      // Second hand
      const secAngle = secs * ((Math.PI * 2) / 60);
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.sin(secAngle) * 48, cy - Math.cos(secAngle) * 48);
      ctx.stroke();

      animId = requestAnimationFrame(renderClock);
    };

    renderClock();
    return () => cancelAnimationFrame(animId);
  }, [activeTab]);

  // Screen Saver preview animation
  useEffect(() => {
    if (activeTab !== 'display') return;
    const canvas = saverCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let step = 0;
    const stars = Array(40).fill(0).map(() => ({
      x: (Math.random() - 0.5) * canvas.width,
      y: (Math.random() - 0.5) * canvas.height,
      z: Math.random() * canvas.width,
    }));

    const renderSaver = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      step++;

      if (screenSaver === 'starfield') {
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        ctx.fillStyle = '#ffffff';
        stars.forEach((s) => {
          s.z -= 1.5;
          if (s.z <= 0) s.z = canvas.width;
          const k = 120 / s.z;
          const px = s.x * k + cx;
          const py = s.y * k + cy;
          if (px >= 0 && px < canvas.width && py >= 0 && py < canvas.height) {
            const sz = Math.max(1, (1 - s.z / canvas.width) * 3);
            ctx.fillRect(px, py, sz, sz);
          }
        });
      } else if (screenSaver === 'pipes') {
        // 3D Pipes simulation
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 4;
        const x = (step * 3) % canvas.width;
        const y = (canvas.height / 2) + Math.sin(step * 0.1) * 30;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        // Matrix code
        ctx.fillStyle = '#00ff00';
        ctx.font = '8px monospace';
        for (let i = 0; i < 15; i++) {
          const char = String.fromCharCode(33 + Math.floor(Math.random() * 90));
          ctx.fillText(char, (i * 12) % canvas.width, (step * 2 + i * 15) % canvas.height);
        }
      }

      animId = requestAnimationFrame(renderSaver);
    };

    renderSaver();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, screenSaver]);

  const applyWallpaper = () => {
    sound.playAsterisk();
    setWallpaper(selectedWallpaper);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#c0c0c0] p-2 select-none text-[11px]">
      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#808080] mb-2">
        <button
          className={`win-btn ${activeTab === 'display' ? 'depressed font-bold' : ''}`}
          onClick={() => {
            sound.playClick();
            setActiveTab('display');
          }}
        >
          Display
        </button>
        <button
          className={`win-btn ${activeTab === 'datetime' ? 'depressed font-bold' : ''}`}
          onClick={() => {
            sound.playClick();
            setActiveTab('datetime');
          }}
        >
          Date / Time
        </button>
        <button
          className={`win-btn ${activeTab === 'system' ? 'depressed font-bold' : ''}`}
          onClick={() => {
            sound.playClick();
            setActiveTab('system');
          }}
        >
          System
        </button>
        <button
          className={`win-btn ${activeTab === 'mouse' ? 'depressed font-bold' : ''}`}
          onClick={() => {
            sound.playClick();
            setActiveTab('mouse');
          }}
        >
          Mouse & CRT
        </button>
      </div>

      {/* Tab 1: Display Properties */}
      {activeTab === 'display' && (
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex gap-4">
            {/* Monitor Preview Frame */}
            <div className="flex flex-col items-center">
              <div className="win-outset p-2 bg-[#d4d0c8]">
                <canvas
                  ref={saverCanvasRef}
                  width={140}
                  height={100}
                  className="bg-black win-inset"
                />
              </div>
              <span className="text-[10px] mt-1 text-gray-700">Display Preview</span>
            </div>

            {/* Settings */}
            <div className="flex-1 space-y-3">
              <div>
                <label className="font-bold block mb-1">Desktop Wallpaper:</label>
                <div className="win-inset bg-white p-1 h-28 overflow-y-auto">
                  {[
                    { id: 'vintage_portrait', label: 'Vintage Urban Portrait with Blurred Crowd (Default)' },
                    { id: 'teal', label: 'Windows 98 Teal (Original)' },
                    { id: 'clouds', label: 'Clouds (Classic 98)' },
                    { id: 'setup98', label: 'Setup 98 Gradient' },
                    { id: 'bliss', label: 'Pine Ridge Valley' },
                    { id: 'matrix', label: 'Digital Matrix Green' },
                    { id: 'mystery', label: 'Blackwood Observatory Night' },
                  ].map((wp) => (
                    <div
                      key={wp.id}
                      className={`px-1.5 py-0.5 cursor-pointer ${
                        selectedWallpaper === wp.id ? 'bg-[#000080] text-white font-bold' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => {
                        sound.playClick();
                        setSelectedWallpaper(wp.id as WallpaperStyle);
                      }}
                    >
                      {wp.label}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Screen Saver:</label>
                <select
                  className="win-inset px-1 py-0.5 w-full bg-white text-xs outline-none"
                  value={screenSaver}
                  onChange={(e) => setScreenSaver(e.target.value as any)}
                >
                  <option value="starfield">Starfield Simulation</option>
                  <option value="pipes">3D Neon Pipes</option>
                  <option value="matrix">Digital Telemetry Matrix</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-[#808080] pt-2">
            <button className="win-btn font-bold" onClick={applyWallpaper}>
              Apply
            </button>
            <button
              className="win-btn"
              onClick={() => {
                applyWallpaper();
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Date / Time Properties */}
      {activeTab === 'datetime' && (
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex items-center justify-around p-2">
            <div className="flex flex-col items-center">
              <canvas
                ref={clockCanvasRef}
                width={130}
                height={130}
                className="mb-2"
              />
              <span className="font-mono text-xs font-bold">{new Date().toLocaleTimeString()}</span>
            </div>

            <div className="win-inset bg-white p-2 text-center text-xs space-y-1">
              <div className="font-bold text-blue-900 border-b pb-1">
                {new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
              </div>
              <div className="text-[11px] text-gray-700">
                Today is <b>{new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</b>
              </div>
              <div className="text-[10px] text-gray-500 mt-2">
                Time Zone: Indian Standard Time (IST, UTC+5:30)
              </div>
            </div>
          </div>

          <div className="border-t border-[#808080] pt-2 flex justify-end">
            <button className="win-btn font-bold" onClick={() => sound.playClick()}>
              OK
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: System Properties */}
      {activeTab === 'system' && (
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex items-start gap-4 p-2">
            <Win98Icon name="computer" size={48} />
            <div className="space-y-3 text-xs">
              <div>
                <b className="text-blue-900">System:</b>
                <div className="pl-2 mt-0.5">
                  Microsoft Windows 98<br />
                  Second Edition (Sachivalaya Edition)<br />
                  Build 4.10.1998 [Recovered Nov 2026]
                </div>
              </div>

              <div>
                <b className="text-blue-900">Registered to:</b>
                <div className="pl-2 mt-0.5">
                  R.K. Dave (Desk Officer)<br />
                  Gujarat Chief Minister's Office / General Admin Dept<br />
                  Sachivalaya, Gandhinagar — Gujarat (India)<br />
                  Terminal: GNR-CMO-ADM-98
                </div>
              </div>

              <div>
                <b className="text-blue-900">Computer:</b>
                <div className="pl-2 mt-0.5">
                  GenuineIntel<br />
                  Pentium(r) II Processor 450MHz<br />
                  64.0MB RAM<br />
                  Hard Drive: 4.3 GB (Drive C:) + 8.4 GB (Drive D:)
                </div>
              </div>

              <div className="pt-1">
                <button
                  className="win-btn text-[10px]"
                  onClick={() => {
                    sound.playError();
                    alert('Error 404: Accountability Not Found. The requested institution is currently undergoing bureaucratic restructuring.');
                  }}
                >
                  Verify System Accountability...
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-[#808080] pt-2 flex justify-end">
            <button className="win-btn font-bold" onClick={() => sound.playClick()}>
              OK
            </button>
          </div>
        </div>
      )}


      {/* Tab 4: Mouse & CRT */}
      {activeTab === 'mouse' && (
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-4 p-2 text-xs">
            <div className="p-2 border border-gray-400 bg-gray-50">
              <b className="text-blue-900 block mb-1">CRT Monitor Simulation</b>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={crtEnabled}
                  onChange={toggleCrt}
                />
                <span>Enable CRT Scanlines & Glass Vignette</span>
              </label>
            </div>

            <div className="p-2 border border-gray-400 bg-gray-50">
              <b className="text-blue-900 block mb-1">Sound Effects</b>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={toggleSound}
                />
                <span>Enable Windows 98 Sound Effects & Chimes</span>
              </label>
            </div>
          </div>

          <div className="border-t border-[#808080] pt-2 flex justify-end">
            <button className="win-btn font-bold" onClick={() => sound.playClick()}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
