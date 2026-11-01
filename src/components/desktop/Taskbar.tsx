import React, { useState, useEffect } from 'react';
import { useDesktopStore } from '../../store/useDesktopStore';
import { Win98Icon } from '../common/Win98Icon';
import { sound } from '../../sound/soundEngine';

export const Taskbar: React.FC = () => {
  const {
    windows,
    activeWindowId,
    focusWindow,
    minimizeWindow,
    isStartMenuOpen,
    toggleStartMenu,
    soundEnabled,
    toggleSound,
    crtEnabled,
    toggleCrt,
  } = useDesktopStore();

  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
      );
      setDateStr(
        now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTaskClick = (winId: string) => {
    const win = windows[winId];
    if (!win) return;

    if (activeWindowId === winId && !win.isMinimized) {
      minimizeWindow(winId);
    } else {
      focusWindow(winId);
    }
  };

  return (
    <div className="win-taskbar">
      {/* Start Button */}
      <button
        className={`win-start-btn ${isStartMenuOpen ? 'active' : ''}`}
        onClick={() => toggleStartMenu()}
      >
        <Win98Icon name="start-logo" size={16} />
        <span className="font-bold text-[11px] text-black tracking-wide">Start</span>
      </button>

      {/* Vertical Divider */}
      <div className="w-[2px] h-[20px] win-inset mx-0.5" />

      {/* Running Windows Task Items */}
      <div className="flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar">
        {Object.values(windows).map((win) => {
          const isActive = activeWindowId === win.id && !win.isMinimized;
          return (
            <button
              key={win.id}
              className={`win-task-item ${isActive ? 'active' : ''}`}
              onClick={() => handleTaskClick(win.id)}
              title={win.title}
            >
              <Win98Icon name={win.icon} size={15} />
              <span className="truncate text-black">{win.title}</span>
            </button>
          );
        })}
      </div>

      {/* System Tray */}
      <div className="win-systray">
        {/* CRT Toggle Icon */}
        <button
          className="cursor-pointer text-[12px] opacity-80 hover:opacity-100 flex items-center"
          title={`CRT Scanlines: ${crtEnabled ? 'ON' : 'OFF'} (Click to toggle)`}
          onClick={() => {
            sound.playClick();
            toggleCrt();
          }}
        >
          {crtEnabled ? '📺' : '🖥️'}
        </button>

        {/* Sound Toggle Icon */}
        <button
          className="cursor-pointer flex items-center"
          title={`Audio: ${soundEnabled ? 'ON' : 'MUTED'} (Click to toggle)`}
          onClick={() => {
            sound.playClick();
            toggleSound();
          }}
        >
          <Win98Icon name="speaker" size={14} />
          {!soundEnabled && <span className="text-red-600 font-bold text-[10px] ml-0.5">✕</span>}
        </button>

        {/* Digital Clock */}
        <div className="text-[11px] font-sans text-black cursor-default" title={dateStr}>
          {timeStr}
        </div>
      </div>
    </div>
  );
};
