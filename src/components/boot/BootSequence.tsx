import React, { useState, useEffect } from 'react';
import { useDesktopStore } from '../../store/useDesktopStore';
import { sound } from '../../sound/soundEngine';

export const BootSequence: React.FC = () => {
  const { bootPhase, setBootPhase } = useDesktopStore();
  const [memoryCount, setMemoryCount] = useState(0);
  const [biosStage, setBiosStage] = useState(0);

  // Skip button handler
  const handleSkip = () => {
    sound.playStartup();
    setBootPhase('desktop');
  };

  useEffect(() => {
    if (bootPhase === 'desktop') return;

    // BIOS Stage 1: Memory Counting
    const memInterval = setInterval(() => {
      setMemoryCount((prev) => {
        if (prev >= 65536) {
          clearInterval(memInterval);
          setTimeout(() => setBiosStage(1), 400);
          return 65536;
        }
        return prev + 8192;
      });
    }, 90);

    // BIOS Stage 2 -> Windows 98 Splash Screen
    const timer1 = setTimeout(() => {
      setBootPhase('splash');
    }, 2800);

    // Splash Screen -> Desktop
    const timer2 = setTimeout(() => {
      sound.playStartup();
      setBootPhase('desktop');
    }, 6200);

    return () => {
      clearInterval(memInterval);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [bootPhase, setBootPhase]);

  if (bootPhase === 'desktop') return null;

  return (
    <div className="fixed inset-0 z-[999999] bg-black text-white select-none flex flex-col justify-between p-6">
      {/* Skip Button for Judges */}
      <button
        onClick={handleSkip}
        className="absolute top-4 right-4 z-50 win-btn font-bold text-xs bg-[#c0c0c0] text-black shadow-lg"
      >
        ⏩ Skip to Desktop (Judge Shortcut)
      </button>

      {/* PHASE 1: Award Modular BIOS */}
      {bootPhase === 'bios' && (
        <div className="font-mono text-xs text-gray-200 leading-relaxed max-w-3xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="font-bold text-white text-sm">Award Modular BIOS v4.51PG, An Energy Star Ally</div>
              <div>Copyright (C) 1984-98, Award Software, Inc.</div>
              <div className="text-gray-400 mt-1">GANDHINAGAR-SEC10-CHIPSET / CMO-ARCHIVE TERMINAL</div>
            </div>
            <div className="border border-white p-2 text-center text-[10px] font-bold">
              ENERGY<br />STAR
            </div>
          </div>

          <div className="space-y-1 mb-4">
            <div>Pentium(R) II CPU at 450MHz (Workstation GNR-CMO-ADM-98)</div>
            <div>
              Memory Test : <span className="text-white font-bold">{memoryCount}KB</span> OK
            </div>
          </div>

          {biosStage >= 1 && (
            <div className="space-y-1 text-gray-300">
              <div>Award Plug and Play BIOS Extension v1.0A</div>
              <div>Detecting IDE Primary Master ... WDC AC34300L (C: LOCAL DISK - ARCHIVE)</div>
              <div>Detecting IDE Secondary Master ... SEAGATE 8GB (D: BACKUP DRIVE)</div>
              <div className="text-yellow-300">System Warning: Machine missing since Nov 2016. Recovered Nov 2026.</div>
              <div className="text-yellow-200 text-[11px]">Reconstructing partial clusters... Partition integrity 96%</div>
              <div className="text-green-400 font-bold mt-4">Starting Microsoft Windows 98 Political Archive...</div>
            </div>
          )}
        </div>
      )}

      {/* PHASE 2: Windows 98 Cloud Splash Screen */}
      {bootPhase === 'splash' && (
        <div
          className="fixed inset-0 flex flex-col items-center justify-between p-8"
          style={{
            background: 'linear-gradient(180deg, #1084d0 0%, #ffffff 70%, #d4d0c8 100%)',
          }}
        >
          {/* Windows 98 Logo */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-center">
              <div className="inline-block relative">
                <h1 className="text-5xl font-black text-[#000080] font-sans tracking-tight drop-shadow-md">
                  Microsoft<br />
                  <span className="text-6xl text-[#1e3f66]">Windows</span>
                  <span className="text-6xl text-[#d43f00] ml-2">98</span>
                </h1>
              </div>
              <p className="text-xs text-[#000080] font-bold tracking-widest uppercase mt-4">
                Second Edition — Sachivalaya Archive Edition
              </p>
              <div className="mt-2 text-[11px] font-mono text-gray-700 bg-white/70 px-3 py-1 border border-gray-400 inline-block shadow-sm">
                Recovered: November 2026 | Last Active: November 2016
              </div>
            </div>
          </div>

          {/* Animated Segmented Blue Loading Bar */}
          <div className="w-80 mb-8 flex flex-col items-center">
            <div className="win-inset bg-black p-1 w-full h-6 flex overflow-hidden">
              <div className="h-full bg-blue-600 animate-pulse flex gap-1 w-full">
                {Array(18).fill(0).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-[1px]"
                  />
                ))}
              </div>
            </div>
            <span className="text-[10px] text-gray-700 font-bold mt-2">
              Loading 2001–2016 political records & historical files...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
