import React, { useState, useEffect } from 'react';
import { useFileSystemStore } from '../../store/useFileSystemStore';
import { useDesktopStore } from '../../store/useDesktopStore';
import { sound } from '../../sound/soundEngine';

interface NotepadAppProps {
  windowId: string;
  initialFileId?: string;
}

export const NotepadApp: React.FC<NotepadAppProps> = ({ windowId, initialFileId }) => {
  const { nodes, updateFileContent, createFile } = useFileSystemStore();
  const { closeWindow, showError } = useDesktopStore();

  const file = initialFileId ? nodes[initialFileId] : null;
  const [content, setContent] = useState<string>(file?.content || '');
  const [wordWrap, setWordWrap] = useState<boolean>(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [currentFileId, setCurrentFileId] = useState<string | null>(initialFileId || null);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  useEffect(() => {
    if (file) {
      setContent(file.content || '');
      setCurrentFileId(file.id);
    }
  }, [file]);

  const handleCursorChange = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    const textBefore = target.value.substring(0, target.selectionStart);
    const lines = textBefore.split('\n');
    setCursorPos({
      line: lines.length,
      col: lines[lines.length - 1].length + 1,
    });
  };

  const handleSave = () => {
    sound.playClick();
    if (currentFileId) {
      updateFileContent(currentFileId, content);
      sound.playAsterisk();
    } else {
      const newId = createFile('dir-my-docs', 'Untitled.txt', content, 'text');
      setCurrentFileId(newId);
      sound.playAsterisk();
    }
    setActiveMenu(null);
  };

  const handleNew = () => {
    sound.playClick();
    setContent('');
    setCurrentFileId(null);
    setActiveMenu(null);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#c0c0c0]" onClick={() => setActiveMenu(null)}>
      {/* Menu Bar */}
      <div className="win-menubar relative">
        {/* File Menu */}
        <div className="relative">
          <div
            className={`win-menu-item ${activeMenu === 'file' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              setActiveMenu(activeMenu === 'file' ? null : 'file');
            }}
          >
            <u>F</u>ile
          </div>
          {activeMenu === 'file' && (
            <div className="win-context-menu" style={{ left: 0, top: '22px' }}>
              <div className="win-context-row" onClick={handleNew}>
                New
              </div>
              <div className="win-context-row" onClick={handleSave}>
                Save
              </div>
              <div className="win-context-row" onClick={handleSave}>
                Save As...
              </div>
              <div className="win-context-separator" />
              <div
                className="win-context-row"
                onClick={() => {
                  sound.playClick();
                  closeWindow(windowId);
                }}
              >
                Exit
              </div>
            </div>
          )}
        </div>

        {/* Edit Menu */}
        <div className="relative">
          <div
            className={`win-menu-item ${activeMenu === 'edit' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              setActiveMenu(activeMenu === 'edit' ? null : 'edit');
            }}
          >
            <u>E</u>dit
          </div>
          {activeMenu === 'edit' && (
            <div className="win-context-menu" style={{ left: 0, top: '22px' }}>
              <div
                className="win-context-row"
                onClick={() => {
                  sound.playClick();
                  document.execCommand('undo');
                  setActiveMenu(null);
                }}
              >
                Undo
              </div>
              <div className="win-context-separator" />
              <div
                className="win-context-row"
                onClick={() => {
                  sound.playClick();
                  document.execCommand('selectAll');
                  setActiveMenu(null);
                }}
              >
                Select All
              </div>
              <div
                className="win-context-row"
                onClick={() => {
                  sound.playClick();
                  const time = new Date().toLocaleString();
                  setContent((prev) => prev + '\n' + time);
                  setActiveMenu(null);
                }}
              >
                Time/Date
              </div>
              <div className="win-context-separator" />
              <div
                className="win-context-row"
                onClick={() => {
                  sound.playClick();
                  setWordWrap(!wordWrap);
                  setActiveMenu(null);
                }}
              >
                {wordWrap ? '✓ ' : '   '}Word Wrap
              </div>
            </div>
          )}
        </div>

        {/* Help Menu */}
        <div className="relative">
          <div
            className={`win-menu-item ${activeMenu === 'help' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              setActiveMenu(activeMenu === 'help' ? null : 'help');
            }}
          >
            <u>H</u>elp
          </div>
          {activeMenu === 'help' && (
            <div className="win-context-menu" style={{ left: 0, top: '22px' }}>
              <div
                className="win-context-row"
                onClick={() => {
                  showError('About Notepad', 'Windows 98 Notepad\nCopyright (C) 1981-1998 Microsoft Corp.', 'info');
                  setActiveMenu(null);
                }}
              >
                About Notepad
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Historical Metadata Banner if applicable */}
      {file?.metadata && (
        <div className="bg-[#e8e4dc] border-b border-[#909090] px-3 py-1.5 text-[11px] text-gray-900 select-text flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#000080] text-xs">
              {file.metadata.documentTitle || file.name}
            </span>
            <div className="flex items-center gap-1.5">
              {file.metadata.category === 'verified_fact' && (
                <span className="bg-green-100 text-green-900 border border-green-500 px-1.5 py-0.2 rounded text-[9px] font-bold">
                  ✔ VERIFIED FACT
                </span>
              )}
              {file.metadata.category === 'judicial_finding' && (
                <span className="bg-purple-100 text-purple-900 border border-purple-500 px-1.5 py-0.2 rounded text-[9px] font-bold">
                  ⚖ JUDICIAL FINDING
                </span>
              )}
              {file.metadata.category === 'official_statement' && (
                <span className="bg-blue-100 text-blue-900 border border-blue-500 px-1.5 py-0.2 rounded text-[9px] font-bold">
                  🏛 OFFICIAL STATEMENT
                </span>
              )}
              {file.metadata.category === 'journalistic_investigation' && (
                <span className="bg-yellow-100 text-yellow-900 border border-yellow-600 px-1.5 py-0.2 rounded text-[9px] font-bold">
                  📰 INVESTIGATION
                </span>
              )}
              {file.metadata.category === 'public_criticism' && (
                <span className="bg-orange-100 text-orange-900 border border-orange-500 px-1.5 py-0.2 rounded text-[9px] font-bold">
                  💬 PUBLIC CRITICISM
                </span>
              )}
              {file.metadata.category === 'opposition_allegation' && (
                <span className="bg-red-100 text-red-900 border border-red-500 px-1.5 py-0.2 rounded text-[9px] font-bold">
                  ⚠️ ALLEGATION
                </span>
              )}
              {file.metadata.category === 'fictional_story' && (
                <span className="bg-amber-100 text-amber-900 border border-amber-600 px-1.5 py-0.2 rounded text-[9px] font-bold">
                  📖 FICTIONAL STORY ELEMENT
                </span>
              )}
            </div>
          </div>

          <div className="text-[10px] text-gray-600 flex flex-wrap gap-x-4">
            {file.metadata.historicalDate && (
              <span><b>Period:</b> {file.metadata.historicalDate}</span>
            )}
            {file.metadata.sourceOrPublication && (
              <span><b>Source:</b> {file.metadata.sourceOrPublication}</span>
            )}
            {file.metadata.publicSourceUrl && (
              <span>
                <b>Public Reference:</b>{' '}
                <a
                  href={file.metadata.publicSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  {file.metadata.publicSourceUrl}
                </a>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Editor Canvas */}
      <div className="flex-1 p-0.5 bg-[#dfdfdf] flex">
        <textarea
          className="flex-1 win-inset p-1.5 resize-none outline-none font-mono text-[12px] bg-white text-black"
          style={{
            whiteSpace: wordWrap ? 'pre-wrap' : 'pre',
            overflowX: wordWrap ? 'hidden' : 'auto',
            overflowY: 'scroll',
            lineHeight: '1.4',
          }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyUp={handleCursorChange}
          onClick={handleCursorChange}
          spellCheck={false}
          autoFocus
        />
      </div>

      {/* Status Bar */}
      <div className="h-[20px] bg-[#c0c0c0] border-t border-[#808080] flex items-center px-2 text-[10px] text-black gap-4 select-none">
        <div className="win-inset px-2 py-0.5 flex-1">
          {file ? file.name : 'Untitled'}
        </div>
        <div className="win-inset px-2 py-0.5 w-24 text-right">
          Ln {cursorPos.line}, Col {cursorPos.col}
        </div>
      </div>
    </div>
  );
};
