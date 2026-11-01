import React, { useRef, useState } from 'react';
import { useDesktopStore } from '../../store/useDesktopStore';
import { DesktopIcon } from './DesktopIcon';
import { WindowManager } from '../window/WindowManager';
import { Taskbar } from './Taskbar';
import { StartMenu } from './StartMenu';
import { ContextMenu } from './ContextMenu';
import { BSOD } from '../dialogs/BSOD';
import { ErrorDialogContainer } from '../dialogs/ErrorDialog';
import { ShutdownDialog } from '../dialogs/ShutdownDialog';

export const Desktop: React.FC = () => {
  const {
    desktopIcons,
    clearSelectedIcons,
    openContextMenu,
    closeContextMenu,
    toggleStartMenu,
    wallpaper,
    crtEnabled,
  } = useDesktopStore();

  // Selection box state
  const [selectionBox, setSelectionBox] = useState<{
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
  } | null>(null);

  const desktopRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    // If clicking on desktop background
    if ((e.target as HTMLElement).classList.contains('win-desktop-bg')) {
      toggleStartMenu(false);
      closeContextMenu();

      if (e.button === 2) {
        // Right click desktop
        openContextMenu(e.clientX, e.clientY, 'desktop');
        return;
      }

      clearSelectedIcons();
      setSelectionBox({
        startX: e.clientX,
        startY: e.clientY,
        currentX: e.clientX,
        currentY: e.clientY,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (selectionBox) {
      setSelectionBox((prev) =>
        prev
          ? {
              ...prev,
              currentX: e.clientX,
              currentY: e.clientY,
            }
          : null
      );
    }
  };

  const handleMouseUp = () => {
    setSelectionBox(null);
  };

  const getWallpaperStyle = (): React.CSSProperties => {
    switch (wallpaper) {
      case 'vintage_portrait':
        return {
          backgroundColor: '#008080',
          backgroundImage: `url('/wallpapers/vintage_urban_portrait.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        };
      case 'clouds':
        return {
          background: 'linear-gradient(180deg, #1084d0 0%, #a4d8ff 50%, #ffffff 100%)',
        };
      case 'setup98':
        return {
          background: 'linear-gradient(135deg, #000080 0%, #1084d0 100%)',
        };
      case 'bliss':
        return {
          background: 'linear-gradient(180deg, #4da6ff 0%, #80d4ff 40%, #52b788 40%, #2d6a4f 100%)',
        };
      case 'matrix':
        return {
          background: '#021808',
          backgroundImage: 'radial-gradient(#00ff66 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        };
      case 'mystery':
        return {
          background: 'linear-gradient(180deg, #09091f 0%, #170d30 50%, #2e1065 100%)',
        };
      case 'teal':
      default:
        return {
          backgroundColor: '#008080',
        };
    }
  };

  return (
    <div
      ref={desktopRef}
      className="win-desktop-bg relative w-screen h-screen overflow-hidden select-none"
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        ...getWallpaperStyle(),
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onContextMenu={(e) => {
        if ((e.target as HTMLElement).classList.contains('win-desktop-bg')) {
          e.preventDefault();
        }
      }}
    >
      {/* Desktop Icons */}
      {desktopIcons.map((item) => (
        <DesktopIcon key={item.id} item={item} />
      ))}

      {/* Selection Marquee Box */}
      {selectionBox && (
        <div
          className="win-selection-box"
          style={{
            left: `${Math.min(selectionBox.startX, selectionBox.currentX)}px`,
            top: `${Math.min(selectionBox.startY, selectionBox.currentY)}px`,
            width: `${Math.abs(selectionBox.currentX - selectionBox.startX)}px`,
            height: `${Math.abs(selectionBox.currentY - selectionBox.startY)}px`,
          }}
        />
      )}

      {/* Window Manager */}
      <WindowManager />

      {/* Taskbar */}
      <Taskbar />

      {/* Start Menu */}
      <StartMenu />

      {/* Context Menu */}
      <ContextMenu />

      {/* BSOD Modal */}
      <BSOD />

      {/* Shutdown Dialog */}
      <ShutdownDialog />

      {/* Error Dialog Popups */}
      <ErrorDialogContainer />

      {/* CRT Scanlines and Glass Vignette Overlay */}
      {crtEnabled && (
        <>
          <div className="crt-overlay" />
          <div className="crt-vignette" />
        </>
      )}
    </div>
  );
};
