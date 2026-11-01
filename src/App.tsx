import React from 'react';
import { useDesktopStore } from './store/useDesktopStore';
import { BootSequence } from './components/boot/BootSequence';
import { ShutdownSequence } from './components/boot/ShutdownSequence';
import { Desktop } from './components/desktop/Desktop';
import './styles/win98.css';

export const App: React.FC = () => {
  const { bootPhase } = useDesktopStore();

  return (
    <div
      className="w-screen h-screen overflow-hidden select-none bg-black relative"
      style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}
    >
      {bootPhase !== 'desktop' && bootPhase !== 'shutdown' && <BootSequence />}
      {bootPhase === 'shutdown' && <ShutdownSequence />}
      <Desktop />
    </div>
  );
};

export default App;

