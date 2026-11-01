import React from 'react';
import { useDesktopStore } from '../../store/useDesktopStore';
import { Win98Icon } from '../common/Win98Icon';

export const ErrorDialogContainer: React.FC = () => {
  const { errors, dismissError } = useDesktopStore();

  if (errors.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99000] flex items-center justify-center">
      {errors.map((err, idx) => (
        <div
          key={err.id}
          className="pointer-events-auto win-outset p-1 w-80 bg-[#c0c0c0] shadow-2xl absolute"
          style={{
            top: `calc(40% + ${idx * 24}px)`,
            left: `calc(50% - 160px + ${idx * 24}px)`,
          }}
        >
          {/* Title Bar */}
          <div className="win-titlebar mb-3">
            <span>{err.title}</span>
            <button className="win-ctrl-btn" onClick={() => dismissError(err.id)}>
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="flex items-start gap-3 px-3 py-2">
            <Win98Icon name={err.type} size={32} />
            <div className="text-xs whitespace-pre-wrap flex-1 text-black leading-relaxed">
              {err.message}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 p-2 mt-2">
            <button
              className="win-btn font-bold"
              onClick={() => dismissError(err.id)}
              autoFocus
            >
              OK
            </button>
            <button className="win-btn" onClick={() => dismissError(err.id)}>
              Cancel
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
