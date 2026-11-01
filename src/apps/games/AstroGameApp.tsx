import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../../sound/soundEngine';

interface Bullet {
  x: number;
  y: number;
}

interface Alien {
  x: number;
  y: number;
  alive: boolean;
}

export const AstroGameApp: React.FC<{ windowId: string }> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const gameState = useRef({
    playerX: 210,
    playerSpeed: 4,
    bullets: [] as Bullet[],
    aliens: [] as Alien[],
    alienDir: 1,
    alienSpeed: 1.2,
    keys: { left: false, right: false, space: false },
    lastShot: 0,
  });

  const initAliens = () => {
    const list: Alien[] = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 8; c++) {
        list.push({
          x: 40 + c * 45,
          y: 40 + r * 30,
          alive: true,
        });
      }
    }
    return list;
  };

  const startGame = () => {
    sound.playClick();
    setScore(0);
    setLives(3);
    setGameOver(false);
    setGameStarted(true);
    gameState.current.playerX = 210;
    gameState.current.bullets = [];
    gameState.current.aliens = initAliens();
    gameState.current.alienSpeed = 1.2;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') gameState.current.keys.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd') gameState.current.keys.right = true;
      if (e.key === ' ' || e.key === 'Spacebar') {
        gameState.current.keys.space = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') gameState.current.keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd') gameState.current.keys.right = false;
      if (e.key === ' ' || e.key === 'Spacebar') gameState.current.keys.space = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Main Game Loop
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = (timestamp: number) => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (gameStarted && !gameOver) {
        const state = gameState.current;

        // Player Movement
        if (state.keys.left) state.playerX = Math.max(10, state.playerX - state.playerSpeed);
        if (state.keys.right) state.playerX = Math.min(canvas.width - 30, state.playerX + state.playerSpeed);

        // Firing Lasers
        if (state.keys.space && timestamp - state.lastShot > 280) {
          state.bullets.push({ x: state.playerX + 10, y: canvas.height - 35 });
          state.lastShot = timestamp;
          sound.playClick();
        }

        // Update Bullets
        state.bullets.forEach((b) => (b.y -= 7));
        state.bullets = state.bullets.filter((b) => b.y > 0);

        // Update Aliens
        let hitEdge = false;
        state.aliens.forEach((a) => {
          if (!a.alive) return;
          a.x += state.alienSpeed * state.alienDir;
          if (a.x < 15 || a.x > canvas.width - 35) hitEdge = true;
        });

        if (hitEdge) {
          state.alienDir *= -1;
          state.aliens.forEach((a) => {
            a.y += 12;
            if (a.y >= canvas.height - 50 && a.alive) {
              setGameOver(true);
              sound.playError();
            }
          });
        }

        // Bullet vs Alien Collision
        state.bullets.forEach((b) => {
          state.aliens.forEach((a) => {
            if (a.alive && b.x >= a.x && b.x <= a.x + 24 && b.y >= a.y && b.y <= a.y + 18) {
              a.alive = false;
              b.y = -100; // consumed
              setScore((s) => s + 100);
              sound.playAsterisk();
            }
          });
        });

        // Respawn if all dead
        if (state.aliens.every((a) => !a.alive)) {
          state.aliens = initAliens();
          state.alienSpeed += 0.5;
        }

        // Draw Player Ship (Retro 1998 polygon)
        ctx.fillStyle = '#00ff00';
        ctx.beginPath();
        ctx.moveTo(state.playerX + 10, canvas.height - 35);
        ctx.lineTo(state.playerX + 22, canvas.height - 15);
        ctx.lineTo(state.playerX - 2, canvas.height - 15);
        ctx.closePath();
        ctx.fill();

        // Draw Bullets
        ctx.fillStyle = '#ffff00';
        state.bullets.forEach((b) => {
          ctx.fillRect(b.x - 1, b.y, 2, 8);
        });

        // Draw Aliens (Pixel UFOs)
        ctx.fillStyle = '#ff3333';
        state.aliens.forEach((a) => {
          if (!a.alive) return;
          // UFO body
          ctx.fillRect(a.x + 4, a.y, 16, 4);
          ctx.fillRect(a.x, a.y + 4, 24, 6);
          ctx.fillRect(a.x + 6, a.y + 10, 12, 3);
          // Eyes
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(a.x + 6, a.y + 5, 3, 3);
          ctx.fillRect(a.x + 15, a.y + 5, 3, 3);
          ctx.fillStyle = '#ff3333';
        });
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameStarted, gameOver]);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#c0c0c0] p-1.5 select-none items-center justify-between">
      {/* Header Info */}
      <div className="win-inset-gray w-full flex justify-between items-center px-3 py-1 font-mono text-xs font-bold text-[#000080]">
        <div>SCORE: {score}</div>
        <div>LIVES: {lives}</div>
      </div>

      {/* Game Canvas */}
      <div className="win-inset bg-black p-1 relative my-1">
        <canvas ref={canvasRef} width={440} height={360} className="bg-black" />

        {/* Start / Game Over Overlay */}
        {(!gameStarted || gameOver) && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white p-4 text-center">
            <h1 className="text-2xl font-mono text-[#00ff00] font-bold mb-2">
              {gameOver ? 'MISSION FAILED' : 'ASTRO-98 DEFENDER'}
            </h1>
            <p className="text-xs text-gray-300 max-w-xs mb-4">
              Defend the Blackwood Ridge receiver from unidentified telemetry probes!
            </p>
            <div className="text-[11px] text-yellow-300 mb-4 font-mono">
              Controls: [A / D] or [← / →] to Move | [SPACEBAR] to Shoot
            </div>
            <button className="win-btn font-bold text-sm px-6 py-1" onClick={startGame}>
              {gameOver ? 'TRY AGAIN' : 'START GAME'}
            </button>
          </div>
        )}
      </div>

      <div className="text-[10px] text-gray-600">
        Hidden Secret Game — C:\Games\Astro98.exe
      </div>
    </div>
  );
};
