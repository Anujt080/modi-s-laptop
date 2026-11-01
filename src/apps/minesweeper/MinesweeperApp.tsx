import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../../sound/soundEngine';

type CellState = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  isQuestion: boolean;
  neighborMines: number;
};

export const MinesweeperApp: React.FC<{ windowId: string }> = () => {
  const [rows] = useState(9);
  const [cols] = useState(9);
  const [totalMines] = useState(10);

  const [grid, setGrid] = useState<CellState[][]>([]);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle');
  const [smileyState, setSmileyState] = useState<'normal' | 'gasp' | 'won' | 'dead'>('normal');
  const [timer, setTimer] = useState(0);
  const [flagsLeft, setFlagsLeft] = useState(totalMines);
  const timerRef = useRef<any>(null);

  // Initialize board
  const initBoard = () => {
    sound.playClick();
    if (timerRef.current) clearInterval(timerRef.current);

    const newGrid: CellState[][] = Array(rows)
      .fill(null)
      .map(() =>
        Array(cols).fill(null).map(() => ({
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          isQuestion: false,
          neighborMines: 0,
        }))
      );

    // Place mines randomly
    let placed = 0;
    while (placed < totalMines) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      if (!newGrid[r][c].isMine) {
        newGrid[r][c].isMine = true;
        placed++;
      }
    }

    // Calculate neighbors
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!newGrid[r][c].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && newGrid[nr][nc].isMine) {
                count++;
              }
            }
          }
          newGrid[r][c].neighborMines = count;
        }
      }
    }

    setGrid(newGrid);
    setGameState('idle');
    setSmileyState('normal');
    setTimer(0);
    setFlagsLeft(totalMines);
  };

  useEffect(() => {
    initBoard();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Timer interval
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimer((t) => Math.min(999, t + 1));
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  // Reveal flood fill
  const revealCell = (r: number, c: number) => {
    if (gameState === 'won' || gameState === 'lost') return;
    const cell = grid[r][c];
    if (cell.isRevealed || cell.isFlagged) return;

    if (gameState === 'idle') {
      setGameState('playing');
    }

    // Hit a mine!
    if (cell.isMine) {
      sound.playError();
      const updated = grid.map((row) =>
        row.map((item) => (item.isMine ? { ...item, isRevealed: true } : item))
      );
      setGrid(updated);
      setGameState('lost');
      setSmileyState('dead');
      return;
    }

    sound.playClick();
    const updated = grid.map((row) => row.map((item) => ({ ...item })));

    const flood = (cr: number, cc: number) => {
      if (cr < 0 || cr >= rows || cc < 0 || cc >= cols) return;
      const cur = updated[cr][cc];
      if (cur.isRevealed || cur.isFlagged || cur.isMine) return;

      cur.isRevealed = true;

      if (cur.neighborMines === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr !== 0 || dc !== 0) {
              flood(cr + dr, cc + dc);
            }
          }
        }
      }
    };

    flood(r, c);
    setGrid(updated);

    // Check for win condition
    let unrevealedSafe = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (!updated[i][j].isMine && !updated[i][j].isRevealed) {
          unrevealedSafe++;
        }
      }
    }

    if (unrevealedSafe === 0) {
      sound.playAsterisk();
      setGameState('won');
      setSmileyState('won');
      confetti({ particleCount: 80, spread: 60 });
    }
  };

  // Flag toggle
  const handleRightClick = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameState === 'won' || gameState === 'lost') return;
    const cell = grid[r][c];
    if (cell.isRevealed) return;

    sound.playClick();
    const updated = grid.map((row) => row.map((item) => ({ ...item })));
    const target = updated[r][c];

    if (!target.isFlagged && !target.isQuestion) {
      target.isFlagged = true;
      setFlagsLeft((f) => f - 1);
    } else if (target.isFlagged) {
      target.isFlagged = false;
      target.isQuestion = true;
      setFlagsLeft((f) => f + 1);
    } else {
      target.isQuestion = false;
    }

    setGrid(updated);
  };

  const getNumberColor = (num: number) => {
    const colors = [
      '',
      '#0000ff', // 1: Blue
      '#008000', // 2: Green
      '#ff0000', // 3: Red
      '#000080', // 4: Dark Blue
      '#800000', // 5: Maroon
      '#008080', // 6: Teal
      '#000000', // 7: Black
      '#808080', // 8: Gray
    ];
    return colors[num] || '#000000';
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#c0c0c0] p-1.5 select-none items-center justify-between">
      {/* Menu Bar */}
      <div className="win-menubar w-full mb-1 -mt-0.5 -mx-0.5">
        <div className="win-menu-item" onClick={initBoard}><u>G</u>ame</div>
        <div className="win-menu-item"><u>H</u>elp</div>
      </div>

      {/* Main Mine Window Container */}
      <div className="win-outset p-1.5 flex flex-col items-center gap-1.5 bg-[#c0c0c0]">
        {/* Scoreboard Header */}
        <div className="win-inset-gray w-full flex items-center justify-between p-1 px-2">
          {/* Mine count */}
          <div className="bg-black text-[#ff0000] font-mono text-[18px] font-bold px-1 tracking-widest border border-[#808080]">
            {String(Math.max(-99, Math.min(999, flagsLeft))).padStart(3, '0')}
          </div>

          {/* Smiley Button */}
          <button
            className="win-btn w-6 h-6 p-0 flex items-center justify-center text-[14px]"
            style={{ minWidth: 26, minHeight: 26 }}
            onClick={initBoard}
          >
            {smileyState === 'normal' && '🙂'}
            {smileyState === 'gasp' && '😮'}
            {smileyState === 'won' && '😎'}
            {smileyState === 'dead' && '😵'}
          </button>

          {/* Timer */}
          <div className="bg-black text-[#ff0000] font-mono text-[18px] font-bold px-1 tracking-widest border border-[#808080]">
            {String(timer).padStart(3, '0')}
          </div>
        </div>

        {/* Board Cells */}
        <div
          className="win-inset bg-[#808080] p-[2px] grid gap-[1px]"
          style={{
            gridTemplateColumns: `repeat(${cols}, 16px)`,
            gridTemplateRows: `repeat(${rows}, 16px)`,
          }}
          onMouseDown={() => {
            if (gameState === 'playing' || gameState === 'idle') setSmileyState('gasp');
          }}
          onMouseUp={() => {
            if (gameState !== 'won' && gameState !== 'lost') setSmileyState('normal');
          }}
        >
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                className={`w-4 h-4 text-[11px] font-bold flex items-center justify-center cursor-pointer ${
                  cell.isRevealed
                    ? 'bg-[#c0c0c0] border-[0.5px] border-[#808080]'
                    : 'win-btn'
                }`}
                style={{
                  minWidth: 16,
                  minHeight: 16,
                  padding: 0,
                  backgroundColor: cell.isRevealed && cell.isMine ? '#ff0000' : undefined,
                }}
                onClick={() => revealCell(r, c)}
                onContextMenu={(e) => handleRightClick(e, r, c)}
              >
                {cell.isRevealed ? (
                  cell.isMine ? (
                    '💣'
                  ) : cell.neighborMines > 0 ? (
                    <span style={{ color: getNumberColor(cell.neighborMines) }}>
                      {cell.neighborMines}
                    </span>
                  ) : (
                    ''
                  )
                ) : cell.isFlagged ? (
                  '🚩'
                ) : cell.isQuestion ? (
                  '?'
                ) : (
                  ''
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="text-[10px] text-gray-700 mt-1">
        Left Click: Reveal | Right Click: Flag
      </div>
    </div>
  );
};
