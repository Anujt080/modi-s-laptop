import React from 'react';
import { useDesktopStore } from '../../store/useDesktopStore';
import { Window } from './Window';

import { ExplorerApp } from '../../apps/explorer/ExplorerApp';
import { NotepadApp } from '../../apps/notepad/NotepadApp';
import { PaintApp } from '../../apps/paint/PaintApp';
import { CalculatorApp } from '../../apps/calculator/CalculatorApp';
import { MinesweeperApp } from '../../apps/minesweeper/MinesweeperApp';
import { MediaPlayerApp } from '../../apps/mediaplayer/MediaPlayerApp';
import { InternetExplorerApp } from '../../apps/browser/InternetExplorerApp';
import { OutlookExpressApp } from '../../apps/mail/OutlookExpressApp';
import { CommandPromptApp } from '../../apps/terminal/CommandPromptApp';
import { ControlPanelApp } from '../../apps/controlpanel/ControlPanelApp';
import { AstroGameApp } from '../../apps/games/AstroGameApp';
import { ImageViewerApp } from '../../apps/imageviewer/ImageViewerApp';

export const WindowManager: React.FC = () => {
  const { windows } = useDesktopStore();

  const renderAppContent = (win: any) => {
    switch (win.appType) {
      case 'explorer':
        return <ExplorerApp windowId={win.id} initialPathId={win.data?.path} />;
      case 'notepad':
        return <NotepadApp windowId={win.id} initialFileId={win.data?.fileId} />;
      case 'paint':
        return <PaintApp windowId={win.id} />;
      case 'calculator':
        return <CalculatorApp windowId={win.id} />;
      case 'minesweeper':
        return <MinesweeperApp windowId={win.id} />;
      case 'mediaplayer':
        return <MediaPlayerApp windowId={win.id} initialFile={win.data?.fileId} />;
      case 'ie':
        return <InternetExplorerApp windowId={win.id} />;
      case 'mail':
        return <OutlookExpressApp windowId={win.id} />;
      case 'terminal':
        return <CommandPromptApp windowId={win.id} />;
      case 'controlpanel':
        return <ControlPanelApp windowId={win.id} />;
      case 'astrogame':
        return <AstroGameApp windowId={win.id} />;
      case 'imageviewer':
        return <ImageViewerApp windowId={win.id} fileId={win.data?.fileId} />;
      default:
        return (
          <div className="p-4 bg-white win-inset m-2 flex-1">
            Application ({win.appType}) is running.
          </div>
        );
    }
  };

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 28,
        pointerEvents: 'none',
        zIndex: 100,
      }}
    >
      {Object.values(windows).map((win) => (
        <Window key={win.id} window={win}>
          {renderAppContent(win)}
        </Window>
      ))}
    </div>
  );
};
