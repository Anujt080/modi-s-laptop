import React, { useState, useEffect, useRef } from 'react';
import { useFileSystemStore } from '../../store/useFileSystemStore';
import { useDesktopStore } from '../../store/useDesktopStore';
import type { FileNode } from '../../types';
import { Win98Icon } from '../../components/common/Win98Icon';
import { sound } from '../../sound/soundEngine';

interface ExplorerAppProps {
  windowId: string;
  initialPathId?: string;
}

export const ExplorerApp: React.FC<ExplorerAppProps> = ({ windowId, initialPathId = 'my-computer' }) => {
  const {
    nodes,
    recycleBinIds,
    getChildren,
    createFolder,
    createFile,
    deleteNode,
    restoreNode,
    emptyRecycleBin,
    unlockFile,
  } = useFileSystemStore();

  const { openWindow, triggerBsod, showError, updateWindowTitle } = useDesktopStore();

  const [currentFolderId, setCurrentFolderId] = useState<string>(initialPathId);
  const [history, setHistory] = useState<string[]>([initialPathId]);
  const [historyIdx, setHistoryIdx] = useState(0);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

  const imageUploadRef = useRef<HTMLInputElement>(null);

  // Password prompt modal state
  const [passwordPromptNode, setPasswordPromptNode] = useState<FileNode | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const isMyComputer = currentFolderId === 'my-computer';
  const isRecycleBin = currentFolderId === 'recycle-bin';
  const currentNode = !isRecycleBin && !isMyComputer ? nodes[currentFolderId] : null;

  const currentPathDisplay = isMyComputer
    ? 'My Computer'
    : isRecycleBin
    ? 'Recycle Bin'
    : currentNode
    ? currentNode.path
    : 'C:';

  // Synchronize window title dynamically based on active folder
  useEffect(() => {
    let title = 'Exploring';
    if (currentFolderId === 'my-computer') {
      title = 'My Computer';
    } else if (currentFolderId === 'root-c') {
      title = 'Local Disk (C:)';
    } else if (currentFolderId === 'root-d') {
      title = 'Local Disk (D:)';
    } else if (isRecycleBin) {
      title = 'Recycle Bin';
    } else if (currentNode) {
      title = currentNode.name;
    }
    updateWindowTitle(windowId, title);
  }, [currentFolderId, currentNode, isRecycleBin, windowId, updateWindowTitle]);

  // Virtual items displayed when viewing "My Computer"
  const myComputerItems: FileNode[] = [
    {
      id: 'my-comp-c',
      name: 'Local Disk (C:)',
      isDirectory: true,
      parentId: 'my-computer',
      path: 'C:',
      modified: '2016-11-11 23:14',
      fileType: 'system',
      icon: 'drive-c',
      metadata: {
        documentTitle: 'Local Disk (C:)',
        summary: 'Primary partition containing Gujarat CMO administrative documents, political archives, and system files (2001–2016).',
        category: 'verified_fact',
      },
    },
    {
      id: 'my-comp-d',
      name: 'Local Disk (D:)',
      isDirectory: true,
      parentId: 'my-computer',
      path: 'D:',
      modified: '2016-11-12 02:30',
      fileType: 'system',
      icon: 'drive-d',
      metadata: {
        documentTitle: 'Local Disk (D:)',
        summary: 'Backup storage containing judicial records, commission reports, news clippings, and unrecovered clusters.',
        category: 'verified_fact',
      },
    },
    {
      id: 'my-comp-control',
      name: 'Control Panel',
      isDirectory: false,
      parentId: 'my-computer',
      path: 'Control Panel',
      modified: '1998-06-25 00:00',
      fileType: 'system',
      icon: 'controlpanel',
      systemApp: 'controlpanel',
      metadata: {
        documentTitle: 'Control Panel',
        summary: 'Windows 98 configuration, display properties, audio mixer, and system themes.',
        category: 'verified_fact',
      },
    },
    {
      id: 'my-comp-printers',
      name: 'Printers',
      isDirectory: false,
      parentId: 'my-computer',
      path: 'Printers',
      modified: '2016-11-11 18:00',
      fileType: 'system',
      icon: 'printer',
      metadata: {
        documentTitle: 'Printers',
        summary: 'Default Printer: HP LaserJet 6L (Gandhinagar CMO Administration) on LPT1:',
        category: 'verified_fact',
      },
    },
    {
      id: 'my-comp-network',
      name: 'Dial-up Networking',
      isDirectory: false,
      parentId: 'my-computer',
      path: 'Dial-up Networking',
      modified: '2016-11-11 18:00',
      fileType: 'system',
      icon: 'network',
      metadata: {
        documentTitle: 'Dial-up Networking',
        summary: 'Configured Connection: BSNL / NIC Gandhinagar 56k Dial-up Gateway.',
        category: 'verified_fact',
      },
    },
  ];

  const rawChildren: FileNode[] = isMyComputer
    ? myComputerItems
    : isRecycleBin
    ? (recycleBinIds.map((id) => nodes[id]).filter(Boolean) as FileNode[])
    : getChildren(currentFolderId);

  const children = searchFilter.trim()
    ? rawChildren.filter(
        (item) =>
          item.name.toLowerCase().includes(searchFilter.toLowerCase().trim()) ||
          item.metadata?.documentTitle?.toLowerCase().includes(searchFilter.toLowerCase().trim()) ||
          item.metadata?.summary?.toLowerCase().includes(searchFilter.toLowerCase().trim())
      )
    : rawChildren;

  const selectedNode = selectedNodeId
    ? isMyComputer
      ? myComputerItems.find((n) => n.id === selectedNodeId) || null
      : nodes[selectedNodeId] || null
    : null;

  const navigateTo = (folderId: string) => {
    sound.playClick();
    setCurrentFolderId(folderId);
    setHistory((prev) => [...prev.slice(0, historyIdx + 1), folderId]);
    setHistoryIdx((prev) => prev + 1);
    setSelectedNodeId(null);
  };

  const handleBack = () => {
    if (historyIdx > 0) {
      sound.playClick();
      const nextIdx = historyIdx - 1;
      setHistoryIdx(nextIdx);
      setCurrentFolderId(history[nextIdx]);
      setSelectedNodeId(null);
    }
  };

  const handleForward = () => {
    if (historyIdx < history.length - 1) {
      sound.playClick();
      const nextIdx = historyIdx + 1;
      setHistoryIdx(nextIdx);
      setCurrentFolderId(history[nextIdx]);
      setSelectedNodeId(null);
    }
  };

  const handleUp = () => {
    if (isMyComputer) return;

    if (currentFolderId === 'root-c' || currentFolderId === 'root-d' || isRecycleBin) {
      navigateTo('my-computer');
      return;
    }
    if (currentNode?.parentId) {
      navigateTo(currentNode.parentId);
    } else {
      navigateTo('my-computer');
    }
  };

  const handleItemDoubleClick = (node: FileNode) => {
    sound.playClick();

    // Handling special "My Computer" virtual items
    if (node.id === 'my-comp-c') {
      navigateTo('root-c');
      return;
    }
    if (node.id === 'my-comp-d') {
      navigateTo('root-d');
      return;
    }
    if (node.id === 'my-comp-control') {
      openWindow('controlpanel', 'Control Panel', 'controlpanel');
      return;
    }
    if (node.id === 'my-comp-printers') {
      showError(
        'Printers',
        'Installed Printers:\n\n• HP LaserJet 6L (Default)\n  Port: LPT1: Local Printer\n  Status: Ready (Offline since 12 Nov 2016)',
        'info'
      );
      return;
    }
    if (node.id === 'my-comp-dialup') {
      showError(
        'Dial-Up Networking',
        'Configured Connection:\n\n• BSNL / NIC Gandhinagar 56k Dial-up\n  Telephone: 232-50000\n  Status: Disconnected (No dial tone detected).',
        'info'
      );
      return;
    }

    if (node.isDirectory) {
      navigateTo(node.id);
      return;
    }

    // Easter Egg: bad_driver.vxd triggers BSOD
    if (node.name === 'bad_driver.vxd') {
      triggerBsod();
      return;
    }

    // Easter Egg: Corrupted sector cluster
    if (node.id === 'file-corrupted-cluster') {
      sound.playError();
      showError(
        'Sector Corruption Notice',
        'Physical sector cluster 0x8F91 is partially corrupted from the November 2016 power cutoff.\n\nTo attempt forensic reconstruction, launch MS-DOS Prompt and type: RECOVER',
        'warning'
      );
      return;
    }

    // Password Protected Check
    if (node.isPasswordProtected) {
      sound.playAsterisk();
      setPasswordPromptNode(node);
      setPasswordInput('');
      setPasswordError(false);
      return;
    }

    // Launch Image Viewer for images (including memes)
    const isImage =
      node.fileType === 'image' ||
      /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(node.name);

    if (isImage) {
      openWindow('imageviewer', node.name, 'pictures', { fileId: node.id });
      return;
    }

    // Launch Notepad for documents
    if (
      node.fileType === 'text' ||
      node.fileType === 'doc' ||
      node.fileType === 'pdf' ||
      node.fileType === 'csv' ||
      node.fileType === 'log'
    ) {
      openWindow('notepad', node.name, node.fileType === 'pdf' ? 'file-pdf' : 'notepad', {
        fileId: node.id,
      });
      return;
    }

    // Launch Media Player for audio
    if (node.fileType === 'audio') {
      openWindow('mediaplayer', 'Windows Media Player', 'mediaplayer', { fileId: node.id });
      return;
    }

    // Launch registered system app
    if (node.systemApp) {
      openWindow(node.systemApp, node.name, node.icon || 'file-exe');
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordPromptNode) return;
    const success = unlockFile(passwordPromptNode.id, passwordInput);
    if (success) {
      const unlockedId = passwordPromptNode.id;
      const unlockedName = passwordPromptNode.name;
      setPasswordPromptNode(null);
      openWindow('notepad', unlockedName, 'notepad', { fileId: unlockedId });
    } else {
      setPasswordError(true);
    }
  };

  // Allow importing real images from the user's hard drive into the current folder
  const handleImageImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const targetFolder = isMyComputer || isRecycleBin ? 'dir-memes-political' : currentFolderId;
      const newId = createFile(targetFolder, file.name, dataUrl, 'image');
      sound.playAsterisk();
      setSelectedNodeId(newId);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Helper to render tree node folders
  const renderTreeFolder = (folderId: string, label: string, iconName = 'folder', depth = 1) => {
    const item = nodes[folderId];
    if (!item) return null;
    const isCurrent = currentFolderId === folderId;

    return (
      <div
        key={folderId}
        style={{ paddingLeft: `${depth * 14}px` }}
        className={`px-1 py-0.5 cursor-pointer flex items-center gap-1.5 ${
          isCurrent ? 'bg-[#000080] text-white font-bold' : 'hover:bg-gray-100 text-black'
        }`}
        onClick={() => navigateTo(folderId)}
      >
        <Win98Icon name={item.icon || iconName} size={15} />
        <span className="truncate">{label || item.name}</span>
      </div>
    );
  };

  const getCategoryBadge = (category?: string) => {
    switch (category) {
      case 'verified_fact':
        return <span className="bg-green-100 text-green-800 border border-green-400 px-1 text-[9px] font-bold">VERIFIED FACT</span>;
      case 'judicial_finding':
        return <span className="bg-purple-100 text-purple-800 border border-purple-400 px-1 text-[9px] font-bold">JUDICIAL FINDING</span>;
      case 'official_statement':
        return <span className="bg-blue-100 text-blue-800 border border-blue-400 px-1 text-[9px] font-bold">OFFICIAL RECORD</span>;
      case 'journalistic_investigation':
        return <span className="bg-yellow-100 text-yellow-800 border border-yellow-400 px-1 text-[9px] font-bold">INVESTIGATION</span>;
      case 'public_criticism':
        return <span className="bg-orange-100 text-orange-800 border border-orange-400 px-1 text-[9px] font-bold">PUBLIC CRITIQUE</span>;
      case 'opposition_allegation':
        return <span className="bg-red-100 text-red-800 border border-red-400 px-1 text-[9px] font-bold">ALLEGATION</span>;
      case 'fictional_story':
        return <span className="bg-gray-200 text-gray-700 border border-gray-400 px-1 text-[9px] font-bold">STORYTELLING ELEMENT</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#c0c0c0] select-none text-[11px] relative">
      {/* Hidden File Picker to import images into current folder */}
      <input
        ref={imageUploadRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
        style={{ display: 'none' }}
        onChange={handleImageImport}
      />

      {/* Menu Bar */}
      <div className="win-menubar">
        <div className="win-menu-item"><u>F</u>ile</div>
        <div className="win-menu-item"><u>E</u>dit</div>
        <div className="win-menu-item"><u>V</u>iew</div>
        <div className="win-menu-item"><u>G</u>o</div>
        <div className="win-menu-item"><u>F</u>avorites</div>
        <div className="win-menu-item"><u>H</u>elp</div>
      </div>

      {/* Toolbar */}
      <div className="bg-[#c0c0c0] p-1 flex items-center justify-between border-b border-[#808080] flex-wrap gap-1">
        <div className="flex items-center gap-1">
          <button
            className={`win-btn ${historyIdx <= 0 ? 'opacity-50 pointer-events-none' : ''}`}
            style={{ minWidth: 46, minHeight: 22 }}
            onClick={handleBack}
          >
            ◀ Back
          </button>
          <button
            className={`win-btn ${historyIdx >= history.length - 1 ? 'opacity-50 pointer-events-none' : ''}`}
            style={{ minWidth: 50, minHeight: 22 }}
            onClick={handleForward}
          >
            Forward ▶
          </button>
          <button
            className={`win-btn ${isMyComputer ? 'opacity-50 pointer-events-none' : ''}`}
            style={{ minWidth: 36, minHeight: 22 }}
            onClick={handleUp}
            title="Up One Level"
          >
            ▲ Up
          </button>
          <div className="w-[1px] h-4 bg-[#808080] mx-0.5" />
          
          <button
            className="win-btn"
            style={{ minWidth: 46, minHeight: 22 }}
            onClick={() => {
              const name = prompt('Enter new folder name:', 'New Folder');
              if (name && !isRecycleBin && !isMyComputer) {
                createFolder(currentFolderId, name);
              }
            }}
          >
            + New Folder
          </button>

          <button
            className="win-btn bg-emerald-50 text-emerald-900 font-bold"
            style={{ minWidth: 84, minHeight: 22 }}
            onClick={() => imageUploadRef.current?.click()}
            title="Import JPG, PNG, GIF, or WEBP photos into this folder"
          >
            🖼️ Add Photo...
          </button>

          {isRecycleBin ? (
            <button
              className="win-btn text-[#ff0000] font-bold"
              style={{ minWidth: 90, minHeight: 22 }}
              onClick={emptyRecycleBin}
            >
              Empty Recycle Bin
            </button>
          ) : (
            selectedNodeId && !isMyComputer && (
              <button
                className="win-btn"
                style={{ minWidth: 46, minHeight: 22 }}
                onClick={() => {
                  deleteNode(selectedNodeId);
                  setSelectedNodeId(null);
                }}
              >
                🗑 Delete
              </button>
            )
          )}
        </div>

        {/* Quick Filter */}
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-gray-700">Filter:</span>
          <input
            type="text"
            placeholder="Search archive..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="win-inset px-1 py-0.5 text-[10px] bg-white outline-none w-28 font-mono"
          />
          {searchFilter && (
            <button
              className="win-btn text-[9px] px-1 py-0.5"
              onClick={() => setSearchFilter('')}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Address Bar */}
      <div className="bg-[#c0c0c0] px-1 py-1 flex items-center gap-1.5 border-b border-[#808080]">
        <span className="font-bold text-[11px] text-[#404040]">Address</span>
        <div className="win-inset bg-white flex-1 flex items-center px-1.5 h-5">
          <span className="font-mono text-[11px] truncate text-black">{currentPathDisplay}</span>
        </div>
      </div>

      {/* Main 2-Pane Explorer Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Drive / Tree Pane */}
        <div className="w-56 bg-white win-inset m-1 p-1 overflow-y-auto shrink-0 select-none">
          <div className="font-bold text-[#000080] mb-1.5 px-1 border-b pb-0.5 flex justify-between items-center">
            <span>Folders & Drives</span>
            <span className="text-[9px] text-gray-500">2001–2016</span>
          </div>

          <div className="space-y-0.5 text-[11px]">
            {/* MY COMPUTER ROOT */}
            <div
              className={`px-1 py-0.5 cursor-pointer flex items-center gap-1.5 font-bold ${
                isMyComputer ? 'bg-[#000080] text-white' : 'hover:bg-gray-100 text-black'
              }`}
              onClick={() => navigateTo('my-computer')}
            >
              <Win98Icon name="computer" size={16} />
              <span>My Computer</span>
            </div>

            {/* DRIVE C: */}
            <div
              className={`px-1 py-0.5 ml-2 cursor-pointer flex items-center gap-1.5 ${
                currentFolderId === 'root-c' ? 'bg-[#000080] text-white font-bold' : 'hover:bg-gray-100 text-black'
              }`}
              onClick={() => navigateTo('root-c')}
            >
              <Win98Icon name="drive-c" size={16} />
              <span>Local Disk (C:)</span>
            </div>

            {/* Subfolders of C: */}
            <div className="space-y-0.5 ml-2">
              {renderTreeFolder('dir-my-docs', 'MY DOCUMENTS', 'documents', 1)}
              {renderTreeFolder('dir-gujarat-2001-2013', 'GUJARAT_2001_2013', 'folder', 2)}
              {renderTreeFolder('dir-elections-2014', 'ELECTIONS_2014', 'folder', 2)}
              {renderTreeFolder('dir-govt-policies', 'GOVERNMENT_POLICIES', 'folder', 2)}
              {renderTreeFolder('dir-controversies', 'CONTROVERSIES', 'folder', 2)}
              {renderTreeFolder('dir-final-archive-2016', 'FINAL_ARCHIVE_2016', 'folder', 2)}

              {renderTreeFolder('dir-my-pics', 'MY PICTURES', 'pictures', 1)}
              {renderTreeFolder('dir-work-epstein', 'WORK WITH EPSTEIN', 'pictures', 2)}
              {renderTreeFolder('dir-memes-political', 'POLITICAL MEMES', 'pictures', 2)}
              {renderTreeFolder('dir-pics-gujarat', 'GUJARAT_ARCHIVE', 'pictures', 2)}
              {renderTreeFolder('dir-pics-election2014', 'ELECTION_2014', 'pictures', 2)}
              {renderTreeFolder('dir-pics-national', 'NATIONAL_EVENTS', 'pictures', 2)}

              {renderTreeFolder('dir-program-files', 'PROGRAM FILES', 'folder', 1)}
              {renderTreeFolder('dir-windows', 'WINDOWS', 'folder', 1)}
              {renderTreeFolder('dir-secret', 'SECRET', 'secret', 1)}
            </div>

            {/* DRIVE D: */}
            <div
              className={`px-1 py-0.5 ml-2 cursor-pointer flex items-center gap-1.5 mt-2 border-t pt-1 ${
                currentFolderId === 'root-d' ? 'bg-[#000080] text-white font-bold' : 'hover:bg-gray-100 text-black'
              }`}
              onClick={() => navigateTo('root-d')}
            >
              <Win98Icon name="drive-d" size={16} />
              <span>Local Disk (D:)</span>
            </div>

            {/* Subfolders of D: */}
            <div className="space-y-0.5 ml-2">
              {renderTreeFolder('dir-d-historical', 'HISTORICAL_RECORDS', 'folder', 1)}
              {renderTreeFolder('dir-d-news', 'NEWS_CLIPPINGS', 'folder', 1)}
              {renderTreeFolder('dir-d-public-docs', 'PUBLIC_DOCUMENTS', 'folder', 1)}
              {renderTreeFolder('dir-d-court-cases', 'COURT_CASES', 'folder', 1)}
              {renderTreeFolder('dir-d-unrecovered', 'UNRECOVERED_FILES', 'secret', 1)}
            </div>

            {/* RECYCLE BIN */}
            <div
              className={`px-1 py-0.5 cursor-pointer flex items-center gap-1.5 mt-2 border-t pt-1 ${
                isRecycleBin ? 'bg-[#000080] text-white font-bold' : 'hover:bg-gray-100 text-black'
              }`}
              onClick={() => {
                sound.playClick();
                setCurrentFolderId('recycle-bin');
                setSelectedNodeId(null);
              }}
            >
              <Win98Icon name={recycleBinIds.length > 0 ? 'recycle-full' : 'recycle-empty'} size={16} />
              <span>Recycle Bin ({recycleBinIds.length})</span>
            </div>
          </div>
        </div>

        {/* Right Contents Pane */}
        <div className="flex-1 flex flex-col bg-white win-inset m-1 overflow-hidden">
          <div className="flex-1 p-2 overflow-auto">
            {children.length === 0 ? (
              <div className="text-gray-400 italic text-center pt-8">
                {searchFilter ? 'No files match your filter.' : 'This folder is empty.'}
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 content-start">
                {children.map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  const iconName =
                    node.icon ||
                    (node.isDirectory
                      ? 'folder'
                      : node.fileType === 'image'
                      ? 'file-image'
                      : node.fileType === 'pdf'
                      ? 'file-pdf'
                      : node.isPasswordProtected
                      ? 'warning'
                      : 'file-text');

                  return (
                    <div
                      key={node.id}
                      className={`flex flex-col items-center justify-start p-1.5 cursor-pointer text-center rounded-[2px] transition-colors ${
                        isSelected ? 'bg-[#000080] text-white' : 'text-black hover:bg-blue-50'
                      }`}
                      onClick={() => {
                        sound.playClick();
                        setSelectedNodeId(node.id);
                      }}
                      onDoubleClick={() => handleItemDoubleClick(node)}
                    >
                      <div className="w-8 h-8 flex items-center justify-center mb-1 relative">
                        <Win98Icon name={iconName} size={30} />
                        {node.isPasswordProtected && (
                          <span className="absolute -top-1 -right-1 text-[10px]">🔒</span>
                        )}
                      </div>

                      <span
                        className={`text-[11px] leading-tight break-words max-w-[85px] select-none ${
                          isSelected ? 'outline-dotted outline-1 outline-white font-semibold' : ''
                        }`}
                      >
                        {node.name}
                      </span>

                      {/* Mini Category Badge */}
                      {node.metadata?.category && (
                        <div className="mt-1">
                          {getCategoryBadge(node.metadata.category)}
                        </div>
                      )}

                      {/* Restore button if in recycle bin */}
                      {isRecycleBin && (
                        <button
                          className="win-btn mt-1 text-[9px]"
                          style={{ minWidth: 40, minHeight: 16, padding: '1px 3px' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            restoreNode(node.id);
                          }}
                        >
                          Restore
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Historical Record Metadata Preview Drawer */}
          {selectedNode?.metadata && (
            <div className="bg-[#f0f0f0] border-t border-[#a0a0a0] p-2 text-[10px] text-gray-800 flex flex-col gap-1 select-text">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-900 text-[11px]">
                  {selectedNode.metadata.documentTitle || selectedNode.name}
                </span>
                {getCategoryBadge(selectedNode.metadata.category)}
              </div>
              <div className="text-gray-600">
                <b>Date:</b> {selectedNode.metadata.historicalDate || selectedNode.modified} | <b>Source:</b> {selectedNode.metadata.sourceOrPublication || 'General Administration Dept'}
              </div>
              {selectedNode.metadata.summary && (
                <div className="text-gray-700 bg-white p-1 border border-gray-300">
                  {selectedNode.metadata.summary}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-[20px] bg-[#c0c0c0] border-t border-[#808080] flex items-center px-2 text-[10px] justify-between">
        <div>
          {children.length} object(s) {selectedNode ? `| Selected: ${selectedNode.name}` : ''}
        </div>
        <div className="win-inset px-2 py-0.5">
          Archived: 2001–2016 | Free Space: 412 MB
        </div>
      </div>

      {/* Password Prompt Dialog Modal */}
      {passwordPromptNode && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="win-outset p-2 w-84 bg-[#c0c0c0] shadow-xl">
            <div className="win-titlebar mb-2">
              <span>Security Manager — Enter Archive Password</span>
              <button
                className="win-ctrl-btn"
                onClick={() => setPasswordPromptNode(null)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-3 p-1">
              <div className="flex items-start gap-2">
                <Win98Icon name="warning" size={32} />
                <div className="text-xs">
                  The document <b>{passwordPromptNode.name}</b> is encrypted under Secretariat archival security protocols.
                  <div className="text-[10px] text-gray-700 mt-1.5 p-1.5 bg-yellow-50 border border-yellow-300 font-mono">
                    Hint: Name of the Gandhinagar administrative headquarters complex (or check the cipher key / Mahatma Mandir photo watermark).
                  </div>
                </div>
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Enter Password (e.g. SACHIVALAYA)..."
                  className="win-inset w-full px-2 py-1 text-xs bg-white outline-none font-mono"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError(false);
                  }}
                  autoFocus
                />
                {passwordError && (
                  <div className="text-red-700 font-bold text-[10px] mt-1">
                    Password incorrect. Access denied.
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <button type="submit" className="win-btn font-bold">
                  OK
                </button>
                <button
                  type="button"
                  className="win-btn"
                  onClick={() => setPasswordPromptNode(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
