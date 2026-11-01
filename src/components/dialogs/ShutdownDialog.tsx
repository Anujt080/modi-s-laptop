import React, { useState } from 'react';
import { useDesktopStore } from '../../store/useDesktopStore';
import { Win98Icon } from '../common/Win98Icon';
import { sound } from '../../sound/soundEngine';

export const ShutdownDialog: React.FC = () => {
  const { isShutdownDialogOpen, closeShutdownDialog, setBootPhase } = useDesktopStore();
  const [option, setOption] = useState<'shutdown' | 'restart' | 'dos'>('shutdown');

  if (!isShutdownDialogOpen) return null;

  const handleConfirm = () => {
    sound.playClick();
    closeShutdownDialog();

    if (option === 'shutdown') {
      sound.playShutdown();
      setBootPhase('shutdown');
    } else if (option === 'restart') {
      sound.playStartup();
      setBootPhase('bios');
    } else if (option === 'dos') {
      sound.playStartup();
      setBootPhase('bios');
    }
  };

  return (
    <div className="fixed inset-0 z-[999990] bg-black/40 flex items-center justify-center p-4">
      <div className="win-window w-[340px] shadow-2xl">
        {/* Titlebar */}
        <div className="win-titlebar">
          <div className="win-titlebar-text">
            <span>Shut Down Windows</span>
          </div>
          <div className="win-titlebar-buttons">
            <button
              className="win-btn-title"
              onClick={() => {
                sound.playClick();
                closeShutdownDialog();
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Dialog Body */}
        <div className="p-3 bg-[#c0c0c0] text-[11px] select-none flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <Win98Icon name="shutdown" size={32} />
            <div className="flex-1">
              <p className="font-bold text-gray-800 mb-2">
                What do you want the computer to do?
              </p>

              <div className="space-y-1.5 pl-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="shutdown-action"
                    checked={option === 'shutdown'}
                    onChange={() => setOption('shutdown')}
                  />
                  <span><u>S</u>hut down</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="shutdown-action"
                    checked={option === 'restart'}
                    onChange={() => setOption('restart')}
                  />
                  <span><u>R</u>estart</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="shutdown-action"
                    checked={option === 'dos'}
                    onChange={() => setOption('dos')}
                  />
                  <span>Restart in <u>M</u>S-DOS mode</span>
                </label>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2 pt-2 border-t border-[#808080]">
            <button
              className="win-btn font-bold px-4 py-1"
              onClick={handleConfirm}
            >
              OK
            </button>
            <button
              className="win-btn px-4 py-1"
              onClick={() => {
                sound.playClick();
                closeShutdownDialog();
              }}
            >
              Cancel
            </button>
            <button
              className="win-btn px-4 py-1"
              onClick={() => {
                sound.playAsterisk();
                alert(
                  'Shut Down Help:\n\nSelecting "Shut down" archives all open handles and transitions to the safe-to-turn-off memorial screen.\n\nYou can always reboot back into the 2026 discovery at any time.'
                );
              }}
            >
              Help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

