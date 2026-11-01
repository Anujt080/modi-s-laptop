import React, { useEffect } from 'react';
import { useDesktopStore } from '../../store/useDesktopStore';

export const BSOD: React.FC = () => {
  const { bsodActive, dismissBsod } = useDesktopStore();

  useEffect(() => {
    if (!bsodActive) return;

    const handleKeyDown = () => {
      dismissBsod();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bsodActive, dismissBsod]);

  if (!bsodActive) return null;

  return (
    <div
      className="fixed inset-0 bg-[#0000aa] text-white font-mono text-[14px] p-10 flex flex-col items-center justify-center z-[999999] select-none cursor-pointer"
      onClick={dismissBsod}
      style={{ lineHeight: '1.6' }}
    >
      <div className="max-w-2xl bg-transparent">
        <div className="text-center mb-6">
          <span className="bg-[#a8a8a8] text-[#0000aa] px-2 py-0.5 font-bold text-base">
            Windows
          </span>
        </div>

        <p className="mb-4">
          A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) +
          00010E36. The current application will be terminated.
        </p>

        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>Press any key to terminate the current application.</li>
          <li>
            Press CTRL+ALT+DEL again to restart your computer. You will lose any unsaved information in all applications.
          </li>
        </ul>

        <div className="text-center font-bold tracking-wider animate-pulse mt-8">
          Press any key or click to continue _
        </div>
      </div>
    </div>
  );
};
