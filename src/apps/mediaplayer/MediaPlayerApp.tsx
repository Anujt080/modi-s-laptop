import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../../sound/soundEngine';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number; // seconds
  type: 'synth' | 'cassette' | 'polaris';
}

const PLAYLIST: Track[] = [
  {
    id: 't1',
    title: 'national_broadcast_chime.wav',
    artist: 'Doordarshan Special News Chime',
    duration: 38,
    type: 'synth',
  },
  {
    id: 't2',
    title: 'vibrant_gujarat_theme.mid',
    artist: 'Gandhinagar Summit Fanfare (General MIDI)',
    duration: 45,
    type: 'synth',
  },
  {
    id: 't3',
    title: 'press_information_brief.wav',
    artist: 'PIB Press Pool Audio Transmission',
    duration: 32,
    type: 'cassette',
  },
];


export const MediaPlayerApp: React.FC<{ windowId: string; initialFile?: string }> = ({
  initialFile,
}) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() => {
    if (initialFile?.includes('cassette')) return 0;
    if (initialFile?.includes('synth')) return 1;
    return 0;
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{ oscs: OscillatorNode[]; gains: GainNode[] } | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const currentTrack = PLAYLIST[currentTrackIndex];

  // Synthesizes retro sounds according to track type
  const startAudioSynthesis = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      // Clean up previous oscillators
      stopAudioSynthesis();

      const oscs: OscillatorNode[] = [];
      const gains: GainNode[] = [];

      if (currentTrack.type === 'synth') {
        // Upbeat 90s arpeggio notes
        const melody = [261.63, 329.63, 392.0, 523.25, 440.0, 392.0];
        melody.forEach((f) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(f, ctx.currentTime);

          gain.gain.setValueAtTime(0.04 * volume, ctx.currentTime);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          oscs.push(osc);
          gains.push(gain);
        });
      } else if (currentTrack.type === 'cassette') {
        // Cassette tape hiss and eerie low tone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(110, ctx.currentTime); // Low hum
        gain.gain.setValueAtTime(0.06 * volume, ctx.currentTime);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        oscs.push(osc);
        gains.push(gain);

        // Morse-like pulse beep
        const beeper = ctx.createOscillator();
        const beepGain = ctx.createGain();
        beeper.type = 'sine';
        beeper.frequency.setValueAtTime(1420, ctx.currentTime);
        beepGain.gain.setValueAtTime(0.03 * volume, ctx.currentTime);

        beeper.connect(beepGain);
        beepGain.connect(ctx.destination);
        beeper.start();
        oscs.push(beeper);
        gains.push(beepGain);
      } else {
        // Cosmic sweep
        const sweep = ctx.createOscillator();
        const sweepGain = ctx.createGain();
        sweep.type = 'sine';
        sweep.frequency.setValueAtTime(300, ctx.currentTime);
        sweep.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 3);
        sweepGain.gain.setValueAtTime(0.05 * volume, ctx.currentTime);

        sweep.connect(sweepGain);
        sweepGain.connect(ctx.destination);
        sweep.start();
        oscs.push(sweep);
        gains.push(sweepGain);
      }

      synthNodesRef.current = { oscs, gains };
    } catch {}
  };

  const stopAudioSynthesis = () => {
    if (synthNodesRef.current) {
      synthNodesRef.current.oscs.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      synthNodesRef.current = null;
    }
  };

  const handlePlay = () => {
    sound.playClick();
    setIsPlaying(true);
    startAudioSynthesis();
  };

  const handlePause = () => {
    sound.playClick();
    setIsPlaying(false);
    stopAudioSynthesis();
  };

  const handleStop = () => {
    sound.playClick();
    setIsPlaying(false);
    setCurrentTime(0);
    stopAudioSynthesis();
  };

  const handleNext = () => {
    sound.playClick();
    stopAudioSynthesis();
    setCurrentTime(0);
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  const handlePrev = () => {
    sound.playClick();
    stopAudioSynthesis();
    setCurrentTime(0);
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  // Track timer
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((t) => {
          if (t >= currentTrack.duration) {
            handleNext();
            return 0;
          }
          return t + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  // Restart audio when track changes if playing
  useEffect(() => {
    if (isPlaying) {
      startAudioSynthesis();
    }
    return () => stopAudioSynthesis();
  }, [currentTrackIndex]);

  // Canvas Visualizer animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    const renderVisualizer = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (isPlaying) {
        phase += 0.15;
        const bars = 24;
        const barWidth = canvas.width / bars;

        // Draw frequency bars
        for (let i = 0; i < bars; i++) {
          const height = Math.abs(Math.sin(phase + i * 0.4)) * (canvas.height * 0.7) + 5;
          const y = canvas.height - height;

          // Gradient green to yellow to red
          const grad = ctx.createLinearGradient(0, canvas.height, 0, 0);
          grad.addColorStop(0, '#00ff00');
          grad.addColorStop(0.7, '#ffff00');
          grad.addColorStop(1, '#ff0000');

          ctx.fillStyle = grad;
          ctx.fillRect(i * barWidth + 1, y, barWidth - 2, height);
        }

        // Oscilloscope green wave
        ctx.strokeStyle = '#00ff66';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 2) {
          const y =
            canvas.height / 2 +
            Math.sin(x * 0.05 + phase * 2) * 20 * Math.cos(x * 0.02 + phase);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else {
        // Flatline idle line
        ctx.strokeStyle = '#004400';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();

        ctx.fillStyle = '#00ff00';
        ctx.font = '10px monospace';
        ctx.fillText('STANDBY // 1420.405 MHz', 10, 20);
      }

      animFrameRef.current = requestAnimationFrame(renderVisualizer);
    };

    renderVisualizer();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#c0c0c0] p-1 select-none text-[11px]">
      {/* Menu Bar */}
      <div className="win-menubar -mx-1 -mt-1 mb-1">
        <div className="win-menu-item"><u>F</u>ile</div>
        <div className="win-menu-item"><u>V</u>iew</div>
        <div className="win-menu-item"><u>P</u>lay</div>
        <div className="win-menu-item"><u>F</u>avorites</div>
        <div className="win-menu-item"><u>H</u>elp</div>
      </div>

      {/* Visualizer Display Screen */}
      <div className="win-inset bg-black p-1 mb-2 relative flex flex-col">
        <canvas ref={canvasRef} width={420} height={140} className="w-full h-28 bg-black" />
        <div className="flex justify-between items-center px-1 text-[#00ff00] font-mono text-[10px] mt-1">
          <span className="truncate max-w-[240px]">{currentTrack.title}</span>
          <span>
            {formatTime(currentTime)} / {formatTime(currentTrack.duration)}
          </span>
        </div>
      </div>

      {/* Seek Progress Bar */}
      <div className="px-1 mb-2">
        <div className="win-inset bg-white h-2 relative">
          <div
            className="bg-[#000080] h-full"
            style={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}
          />
        </div>
      </div>

      {/* Control Buttons */}
      <div className="win-inset-gray p-1.5 flex items-center justify-between mb-2">
        <div className="flex items-center gap-1">
          <button
            className="win-btn font-bold"
            style={{ minWidth: 26, minHeight: 22, padding: 0 }}
            title="Previous"
            onClick={handlePrev}
          >
            |◀
          </button>
          {isPlaying ? (
            <button
              className="win-btn font-bold"
              style={{ minWidth: 26, minHeight: 22, padding: 0 }}
              title="Pause"
              onClick={handlePause}
            >
              ❚❚
            </button>
          ) : (
            <button
              className="win-btn font-bold text-[#008000]"
              style={{ minWidth: 26, minHeight: 22, padding: 0 }}
              title="Play"
              onClick={handlePlay}
            >
              ▶
            </button>
          )}
          <button
            className="win-btn font-bold text-[#ff0000]"
            style={{ minWidth: 26, minHeight: 22, padding: 0 }}
            title="Stop"
            onClick={handleStop}
          >
            ■
          </button>
          <button
            className="win-btn font-bold"
            style={{ minWidth: 26, minHeight: 22, padding: 0 }}
            title="Next"
            onClick={handleNext}
          >
            ▶|
          </button>
        </div>

        {/* Volume Slider */}
        <div className="flex items-center gap-1.5">
          <span>🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-16 h-2 cursor-pointer"
          />
        </div>
      </div>

      {/* Playlist Box */}
      <div className="flex-1 win-inset bg-white p-1 overflow-y-auto">
        <div className="text-[10px] text-gray-500 font-bold border-b border-gray-300 pb-0.5 mb-1 px-1">
          PLAYLIST
        </div>
        {PLAYLIST.map((t, idx) => (
          <div
            key={t.id}
            className={`px-1.5 py-1 cursor-pointer flex justify-between items-center text-[11px] ${
              idx === currentTrackIndex ? 'bg-[#000080] text-white font-bold' : 'hover:bg-gray-100'
            }`}
            onClick={() => {
              sound.playClick();
              stopAudioSynthesis();
              setCurrentTime(0);
              setCurrentTrackIndex(idx);
              setIsPlaying(true);
            }}
          >
            <div className="flex items-center gap-1.5">
              <span>{idx === currentTrackIndex && isPlaying ? '▶' : '•'}</span>
              <span>{t.title}</span>
            </div>
            <span className="text-[10px] opacity-80">{formatTime(t.duration)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
