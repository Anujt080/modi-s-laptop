import React, { useState } from 'react';
import { useDesktopStore } from '../../store/useDesktopStore';
import { Win98Icon } from '../common/Win98Icon';
import { sound } from '../../sound/soundEngine';

export const StartMenu: React.FC = () => {
  const { isStartMenuOpen, toggleStartMenu, openWindow, triggerBsod, openShutdownDialog } =
    useDesktopStore();
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  if (!isStartMenuOpen) return null;

  return (
    <div
      className="win-start-menu"
      onClick={(e) => e.stopPropagation()}
      onMouseLeave={() => setActiveSubmenu(null)}
    >
      {/* Vertical Windows 98 Blue Banner */}
      <div className="win-start-sidebar">
        <div className="win-start-sidebar-text">
          Windows<span className="win-start-sidebar-sub">98</span>
        </div>
      </div>

      {/* Start Menu Items */}
      <div className="win-start-items">
        {/* Programs */}
        <div
          className="win-start-item justify-between"
          onMouseEnter={() => setActiveSubmenu('programs')}
        >
          <div className="flex items-center gap-2">
            <Win98Icon name="folder" size={20} />
            <span><u>P</u>rograms</span>
          </div>
          <span className="text-[10px]">▶</span>

          {/* Programs Submenu */}
          {activeSubmenu === 'programs' && (
            <div className="win-start-submenu" style={{ top: 0 }}>
              <div
                className="win-start-item"
                onClick={() => openWindow('notepad', 'Notepad', 'notepad')}
              >
                <Win98Icon name="notepad" size={18} />
                <span>Notepad</span>
              </div>
              <div
                className="win-start-item"
                onClick={() => openWindow('paint', 'Paint', 'paint')}
              >
                <Win98Icon name="paint" size={18} />
                <span>Paint</span>
              </div>
              <div
                className="win-start-item"
                onClick={() => openWindow('calculator', 'Calculator', 'calculator')}
              >
                <Win98Icon name="calculator" size={18} />
                <span>Calculator</span>
              </div>
              <div
                className="win-start-item"
                onClick={() => openWindow('minesweeper', 'Minesweeper', 'minesweeper')}
              >
                <Win98Icon name="minesweeper" size={18} />
                <span>Minesweeper</span>
              </div>
              <div
                className="win-start-item"
                onClick={() => openWindow('astrogame', 'Astro-98 Space Defender', 'astrogame')}
              >
                <Win98Icon name="astrogame" size={18} />
                <span>Astro-98 (Secret)</span>
              </div>
              <div
                className="win-start-item"
                onClick={() => openWindow('imageviewer', 'Imaging (Photos)', 'pictures')}
              >
                <Win98Icon name="pictures" size={18} />
                <span>Imaging for Windows</span>
              </div>
              <div
                className="win-start-item"
                onClick={() => openWindow('mediaplayer', 'Windows Media Player', 'mediaplayer')}
              >
                <Win98Icon name="mediaplayer" size={18} />
                <span>Media Player</span>
              </div>
              <div
                className="win-start-item"
                onClick={() => openWindow('terminal', 'MS-DOS Prompt', 'terminal')}
              >
                <Win98Icon name="terminal" size={18} />
                <span>MS-DOS Prompt</span>
              </div>
              <div
                className="win-start-item"
                onClick={() => openWindow('ie', 'Internet Explorer', 'ie')}
              >
                <Win98Icon name="ie" size={18} />
                <span>Internet Explorer</span>
              </div>
              <div
                className="win-start-item"
                onClick={() => openWindow('mail', 'Outlook Express', 'mail')}
              >
                <Win98Icon name="mail" size={18} />
                <span>Outlook Express</span>
              </div>
            </div>
          )}
        </div>

        {/* Documents */}
        <div
          className="win-start-item justify-between"
          onMouseEnter={() => setActiveSubmenu('documents')}
        >
          <div className="flex items-center gap-2">
            <Win98Icon name="documents" size={20} />
            <span><u>D</u>ocuments</span>
          </div>
          <span className="text-[10px]">▶</span>

          {/* Documents Submenu */}
          {activeSubmenu === 'documents' && (
            <div className="win-start-submenu" style={{ top: '24px', minWidth: '240px' }}>
              <div
                className="win-start-item"
                onClick={() =>
                  openWindow('notepad', 'demonetisation_announcement.txt', 'notepad', { fileId: 'file-demonetisation' })
                }
              >
                <Win98Icon name="file-text" size={18} />
                <span className="truncate">demonetisation_announcement.txt</span>
              </div>
              <div
                className="win-start-item"
                onClick={() =>
                  openWindow('notepad', 'gujarat_timeline_2001_2013.txt', 'notepad', {
                    fileId: 'file-guj-timeline',
                  })
                }
              >
                <Win98Icon name="file-text" size={18} />
                <span className="truncate">gujarat_timeline_2001_2013.txt</span>
              </div>
              <div
                className="win-start-item"
                onClick={() =>
                  openWindow('notepad', 'election_results_2014.csv', 'notepad', {
                    fileId: 'file-election-results',
                  })
                }
              >
                <Win98Icon name="file-text" size={18} />
                <span className="truncate">election_results_2014.csv</span>
              </div>
              <div
                className="win-start-item"
                onClick={() =>
                  openWindow('notepad', 'make_in_india.pdf', 'notepad', {
                    fileId: 'file-make-in-india',
                  })
                }
              >
                <Win98Icon name="file-pdf" size={18} />
                <span className="truncate">make_in_india.pdf</span>
              </div>
              <div className="win-context-separator my-1" />
              <div
                className="win-start-item"
                onClick={() =>
                  openWindow('explorer', 'My Documents', 'documents', { path: 'dir-my-docs' })
                }
              >
                <Win98Icon name="folder" size={18} />
                <span className="truncate">Open My Documents</span>
              </div>
              <div
                className="win-start-item"
                onClick={() =>
                  openWindow('explorer', 'Backup Drive (D:)', 'drive-d', { path: 'root-d' })
                }
              >
                <Win98Icon name="drive-d" size={18} />
                <span className="truncate">Open Backup Drive (D:)</span>
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <div
          className="win-start-item justify-between"
          onMouseEnter={() => setActiveSubmenu('settings')}
        >
          <div className="flex items-center gap-2">
            <Win98Icon name="controlpanel" size={20} />
            <span><u>S</u>ettings</span>
          </div>
          <span className="text-[10px]">▶</span>

          {activeSubmenu === 'settings' && (
            <div className="win-start-submenu" style={{ top: '48px' }}>
              <div
                className="win-start-item"
                onClick={() => openWindow('controlpanel', 'Control Panel', 'controlpanel')}
              >
                <Win98Icon name="controlpanel" size={18} />
                <span>Control Panel</span>
              </div>
            </div>
          )}
        </div>

        {/* Find */}
        <div
          className="win-start-item"
          onClick={() => {
            openWindow('explorer', 'Find: All Files', 'find', { path: 'root-c' });
          }}
        >
          <Win98Icon name="find" size={20} />
          <span><u>F</u>ind</span>
        </div>

        {/* Help */}
        <div
          className="win-start-item"
          onClick={() => {
            sound.playAsterisk();
            alert(
              '=== GANDHINAGAR POLITICAL ARCHIVE (2001–2016) GUIDE ===\n\n' +
                '1. Explore Drive C: & Backup Drive D: to investigate verified historical documents, court findings, and policy dossiers.\n' +
                '2. Browse early 2000s web portals (Gujarat Government, ECI 2014, RBI Demonetisation, Supreme Court) on Internet Explorer.\n' +
                '3. Inspect administrative emails in Outlook Express from 2001 to November 2016.\n' +
                '4. Launch MS-DOS Prompt and run commands like "timeline", "democracy", "accountability", "promises", or "recover".\n' +
                '5. Examine photographs in Imaging using the UV Scanner to discover the secret archive password.\n' +
                '6. Select Shut Down to view the archival recovery conclusion.'
            );
            toggleStartMenu(false);
          }}
        >
          <Win98Icon name="help" size={20} />
          <span><u>H</u>elp</span>
        </div>

        {/* Run */}
        <div
          className="win-start-item"
          onClick={() => {
            const cmd = prompt('Type the name of a program, folder, document, or command to run:');
            if (cmd) {
              const lower = cmd.toLowerCase().trim();
              if (lower === 'crash') triggerBsod();
              else if (lower === 'cmd' || lower === 'command' || lower === 'terminal')
                openWindow('terminal', 'MS-DOS Prompt', 'terminal');
              else if (lower === 'calc')
                openWindow('calculator', 'Calculator', 'calculator');
              else if (lower === 'notepad')
                openWindow('notepad', 'Notepad', 'notepad');
              else if (lower === 'ie' || lower === 'browser')
                openWindow('ie', 'Internet Explorer', 'ie');
              else if (lower === 'mail' || lower === 'outlook')
                openWindow('mail', 'Outlook Express', 'mail');
              else if (lower === 'c:' || lower === 'd:')
                openWindow('explorer', `Exploring - ${cmd.toUpperCase()}`, 'folder', { path: lower === 'd:' ? 'root-d' : 'root-c' });
              else
                openWindow('explorer', `Exploring - ${cmd}`, 'folder');
            }
            toggleStartMenu(false);
          }}
        >
          <Win98Icon name="run" size={20} />
          <span><u>R</u>un...</span>
        </div>

        <div className="win-context-separator my-1" />

        {/* Shut Down */}
        <div
          className="win-start-item text-red-900 font-bold"
          onClick={() => {
            openShutdownDialog();
          }}
        >
          <Win98Icon name="shutdown" size={20} />
          <span><u>S</u>hut Down...</span>
        </div>

      </div>
    </div>
  );
};
