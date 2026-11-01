import React, { useState, useEffect } from 'react';
import { sound } from '../../sound/soundEngine';

export const CalculatorApp: React.FC<{ windowId: string }> = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState<number>(0);

  const inputDigit = (digit: string) => {
    sound.playClick();
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    sound.playClick();
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearAll = () => {
    sound.playClick();
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    sound.playClick();
    setDisplay('0');
  };

  const handleBackspace = () => {
    sound.playClick();
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const toggleSign = () => {
    sound.playClick();
    const val = parseFloat(display);
    setDisplay(String(-val));
  };

  const performOperation = (nextOperator: string) => {
    sound.playClick();
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentValue = prevValue || 0;
      let result = currentValue;

      switch (operator) {
        case '+':
          result = currentValue + inputValue;
          break;
        case '-':
          result = currentValue - inputValue;
          break;
        case '*':
          result = currentValue * inputValue;
          break;
        case '/':
          result = inputValue !== 0 ? currentValue / inputValue : 0;
          break;
      }

      setPrevValue(result);
      setDisplay(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator === '=' ? null : nextOperator);
  };

  const handleSqrt = () => {
    sound.playClick();
    const val = parseFloat(display);
    if (val >= 0) {
      setDisplay(String(Math.sqrt(val)));
    } else {
      sound.playError();
      setDisplay('Error');
    }
  };

  const handleReciprocal = () => {
    sound.playClick();
    const val = parseFloat(display);
    if (val !== 0) {
      setDisplay(String(1 / val));
    } else {
      sound.playError();
      setDisplay('Cannot divide by zero');
    }
  };

  const handlePercent = () => {
    sound.playClick();
    const val = parseFloat(display);
    setDisplay(String(val / 100));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        inputDigit(e.key);
      } else if (e.key === '.') {
        inputDecimal();
      } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        performOperation(e.key);
      } else if (e.key === 'Enter' || e.key === '=') {
        performOperation('=');
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        clearAll();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-[#c0c0c0] p-1.5 select-none text-[11px]">
      {/* Menu Bar */}
      <div className="win-menubar mb-1 -mt-0.5 -mx-0.5">
        <div className="win-menu-item"><u>E</u>dit</div>
        <div className="win-menu-item"><u>V</u>iew</div>
        <div className="win-menu-item"><u>H</u>elp</div>
      </div>

      {/* LCD Display */}
      <div className="win-inset bg-white p-1 mb-2 text-right font-mono text-[16px] overflow-hidden whitespace-nowrap h-7 flex items-center justify-end px-2">
        {display}
      </div>

      {/* Memory indicator box & Top clear controls */}
      <div className="flex gap-1.5 mb-2">
        <div className="win-inset-gray w-7 h-6 flex items-center justify-center font-bold text-[#800000]">
          {memory !== 0 ? 'M' : ''}
        </div>
        <button
          className="win-btn flex-1 text-[#ff0000] font-bold"
          style={{ minWidth: 40 }}
          onClick={handleBackspace}
        >
          Backspace
        </button>
        <button
          className="win-btn flex-1 text-[#ff0000] font-bold"
          style={{ minWidth: 40 }}
          onClick={clearEntry}
        >
          CE
        </button>
        <button
          className="win-btn flex-1 text-[#ff0000] font-bold"
          style={{ minWidth: 40 }}
          onClick={clearAll}
        >
          C
        </button>
      </div>

      {/* Keypad Grid */}
      <div className="grid grid-cols-5 gap-1.5 flex-1">
        {/* Row 1 */}
        <button
          className="win-btn text-[#ff0000] font-bold"
          style={{ minWidth: 32 }}
          onClick={() => {
            sound.playClick();
            setMemory(0);
          }}
        >
          MC
        </button>
        <button
          className="win-btn font-bold text-[#0000ff]"
          style={{ minWidth: 32 }}
          onClick={() => inputDigit('7')}
        >
          7
        </button>
        <button
          className="win-btn font-bold text-[#0000ff]"
          style={{ minWidth: 32 }}
          onClick={() => inputDigit('8')}
        >
          8
        </button>
        <button
          className="win-btn font-bold text-[#0000ff]"
          style={{ minWidth: 32 }}
          onClick={() => inputDigit('9')}
        >
          9
        </button>
        <button
          className="win-btn text-[#ff0000] font-bold"
          style={{ minWidth: 32 }}
          onClick={() => performOperation('/')}
        >
          /
        </button>

        {/* Row 2 */}
        <button
          className="win-btn text-[#ff0000] font-bold"
          style={{ minWidth: 32 }}
          onClick={() => {
            sound.playClick();
            setDisplay(String(memory));
            setWaitingForOperand(true);
          }}
        >
          MR
        </button>
        <button
          className="win-btn font-bold text-[#0000ff]"
          style={{ minWidth: 32 }}
          onClick={() => inputDigit('4')}
        >
          4
        </button>
        <button
          className="win-btn font-bold text-[#0000ff]"
          style={{ minWidth: 32 }}
          onClick={() => inputDigit('5')}
        >
          5
        </button>
        <button
          className="win-btn font-bold text-[#0000ff]"
          style={{ minWidth: 32 }}
          onClick={() => inputDigit('6')}
        >
          6
        </button>
        <button
          className="win-btn text-[#ff0000] font-bold"
          style={{ minWidth: 32 }}
          onClick={() => performOperation('*')}
        >
          *
        </button>

        {/* Row 3 */}
        <button
          className="win-btn text-[#ff0000] font-bold"
          style={{ minWidth: 32 }}
          onClick={() => {
            sound.playClick();
            setMemory(parseFloat(display));
          }}
        >
          MS
        </button>
        <button
          className="win-btn font-bold text-[#0000ff]"
          style={{ minWidth: 32 }}
          onClick={() => inputDigit('1')}
        >
          1
        </button>
        <button
          className="win-btn font-bold text-[#0000ff]"
          style={{ minWidth: 32 }}
          onClick={() => inputDigit('2')}
        >
          2
        </button>
        <button
          className="win-btn font-bold text-[#0000ff]"
          style={{ minWidth: 32 }}
          onClick={() => inputDigit('3')}
        >
          3
        </button>
        <button
          className="win-btn text-[#ff0000] font-bold"
          style={{ minWidth: 32 }}
          onClick={() => performOperation('-')}
        >
          -
        </button>

        {/* Row 4 */}
        <button
          className="win-btn text-[#ff0000] font-bold"
          style={{ minWidth: 32 }}
          onClick={() => {
            sound.playClick();
            setMemory(memory + parseFloat(display));
          }}
        >
          M+
        </button>
        <button
          className="win-btn font-bold text-[#0000ff]"
          style={{ minWidth: 32 }}
          onClick={() => inputDigit('0')}
        >
          0
        </button>
        <button
          className="win-btn font-bold text-[#0000ff]"
          style={{ minWidth: 32 }}
          onClick={toggleSign}
        >
          +/-
        </button>
        <button
          className="win-btn font-bold text-[#0000ff]"
          style={{ minWidth: 32 }}
          onClick={inputDecimal}
        >
          .
        </button>
        <button
          className="win-btn text-[#ff0000] font-bold"
          style={{ minWidth: 32 }}
          onClick={() => performOperation('+')}
        >
          +
        </button>

        {/* Row 5 */}
        <button
          className="win-btn text-[#000080]"
          style={{ minWidth: 32 }}
          onClick={handleSqrt}
        >
          sqrt
        </button>
        <button
          className="win-btn text-[#000080]"
          style={{ minWidth: 32 }}
          onClick={handlePercent}
        >
          %
        </button>
        <button
          className="win-btn text-[#000080]"
          style={{ minWidth: 32 }}
          onClick={handleReciprocal}
        >
          1/x
        </button>
        <button
          className="win-btn font-bold text-[#ff0000] col-span-2"
          style={{ minWidth: 60 }}
          onClick={() => performOperation('=')}
        >
          =
        </button>
      </div>
    </div>
  );
};
