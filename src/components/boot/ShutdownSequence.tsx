import React, { useState, useEffect } from 'react';
import { useDesktopStore } from '../../store/useDesktopStore';
import { sound } from '../../sound/soundEngine';

export const ShutdownSequence: React.FC = () => {
  const { bootPhase, setBootPhase } = useDesktopStore();
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    if (bootPhase !== 'shutdown') {
      return;
    }

    // Progression:
    // Step 0: "Please wait while your computer shuts down..."
    // Step 1: "System archive successfully recovered."
    // Step 2: "Last recorded activity: November 2016."
    // Step 3: "Some files were never recovered."
    // Step 4: Final screen: "It's now safe to turn off your computer." with restart buttons!

    const t1 = setTimeout(() => setStep(1), 1800);
    const t2 = setTimeout(() => setStep(2), 3600);
    const t3 = setTimeout(() => setStep(3), 5400);
    const t4 = setTimeout(() => setStep(4), 7200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [bootPhase]);

  if (bootPhase !== 'shutdown') return null;

  const handleRestart = () => {
    sound.playStartup();
    setBootPhase('bios');
  };

  const handleResume = () => {
    sound.playAsterisk();
    setBootPhase('desktop');
  };

  return (
    <div className="fixed inset-0 z-[999999] bg-black select-none flex flex-col items-center justify-center p-6 text-center">
      {/* Intermediate Closing Screen (Steps 0 - 3) */}
      {step < 4 && (
        <div className="flex flex-col items-center justify-center space-y-6 max-w-xl animate-fade-in">
          {/* Windows 98 Shutdown Banner */}
          <div className="text-gray-300 font-sans tracking-wide">
            <h2 className="text-3xl font-black text-white drop-shadow">
              Microsoft<span className="text-blue-400"> Windows</span>
              <span className="text-red-500 ml-1">98</span>
            </h2>
            <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">
              Gujarat Secretariat Archival System
            </p>
          </div>

          <div className="w-16 h-1 bg-red-600 rounded" />

          {/* Prompt Required Messages appearing in sequence */}
          <div className="space-y-4 font-mono text-sm leading-relaxed min-h-[140px] flex flex-col justify-center">
            <div className="text-blue-300 animate-pulse">
              Please wait while your computer shuts down...
            </div>

            {step >= 1 && (
              <div className="text-green-400 font-bold text-base transition-opacity duration-500">
                ✔ "System archive successfully recovered."
              </div>
            )}

            {step >= 2 && (
              <div className="text-yellow-300 font-semibold text-sm transition-opacity duration-500">
                ⏳ "Last recorded activity: November 2016."
              </div>
            )}

            {step >= 3 && (
              <div className="text-red-400 font-bold text-sm transition-opacity duration-500">
                ⚠ "Some files were never recovered."
              </div>
            )}
          </div>

          <div className="text-[11px] text-gray-500 font-mono">
            Flushing disk cache to permanent storage... Sector write OK.
          </div>
        </div>
      )}

      {/* Iconic Final Orange/Black Screen: "It's now safe to turn off your computer." */}
      {step >= 4 && (
        <div className="flex flex-col items-center justify-center space-y-8 max-w-2xl animate-fade-in">
          {/* Authentic classic Win98 orange text font */}
          <div className="space-y-2">
            <h1
              className="text-4xl md:text-5xl font-black tracking-tight"
              style={{
                color: '#d46b08',
                fontFamily: '"MS Sans Serif", Arial, sans-serif',
                textShadow: '0 0 16px rgba(212, 107, 8, 0.4)',
              }}
            >
              It's now safe to turn off<br />your computer.
            </h1>
            <p className="text-xs text-gray-400 font-mono mt-3">
              GNR-CMO-ADM-98 // Sachivalaya Political Archive (2001–2016)
            </p>
          </div>

          {/* Historical Memorial Reflection */}
          <div className="border border-gray-800 bg-gray-950/80 p-4 max-w-md text-xs font-mono text-gray-300 text-left space-y-2 shadow-2xl">
            <div className="text-yellow-400 font-bold border-b border-gray-800 pb-1">
              ARCHIVAL RECOVERY SUMMARY (NOVEMBER 2026):
            </div>
            <div>• Timeline documented: October 2001 – November 2016</div>
            <div>• Historical records verified: 100%</div>
            <div>• Demonetisation cutoff preserved: 08 November 2016</div>
            <div>• Desk Officer: R.K. Dave (Status: Missing since Nov 2016)</div>
          </div>

          {/* Restart & Exploration Options */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={handleRestart}
              className="win-btn font-bold px-6 py-2 bg-[#c0c0c0] text-black text-xs hover:bg-white shadow-lg flex items-center gap-2"
            >
              <span>🔄</span>
              <span>Reboot Computer (Return to 2026 Discovery)</span>
            </button>

            <button
              onClick={handleResume}
              className="win-btn font-semibold px-5 py-2 bg-[#d4d0c8] text-gray-900 text-xs hover:bg-white shadow flex items-center gap-2"
            >
              <span>🔍</span>
              <span>Continue Exploring Archive</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
