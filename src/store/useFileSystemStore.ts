import { create } from 'zustand';
import type { FileNode } from '../types';
import { sound } from '../sound/soundEngine';
import { INITIAL_POLITICAL_NODES, INITIAL_RECYCLE_BIN_IDS } from '../data/politicalArchiveData';

interface FileSystemState {
  nodes: Record<string, FileNode>;
  recycleBinIds: string[];
  currentPath: string;
  createFolder: (parentId: string, name: string) => string;
  createFile: (parentId: string, name: string, content?: string, fileType?: FileNode['fileType']) => string;
  deleteNode: (id: string) => void;
  restoreNode: (id: string) => void;
  emptyRecycleBin: () => void;
  renameNode: (id: string, newName: string) => void;
  updateFileContent: (id: string, newContent: string) => void;
  unlockFile: (id: string, passwordAttempt: string) => boolean;
  recoverCorruptedSector: () => boolean;
  getNode: (id: string) => FileNode | undefined;
  getChildren: (parentId: string | null) => FileNode[];
  getNodeByPath: (path: string) => FileNode | undefined;
  resetFileSystem: () => void;
}

const STORAGE_KEY = 'abandoned_pc_political_archive_v4';

export const useFileSystemStore = create<FileSystemState>((set, get) => {
  // Load saved state or use default political archive
  let initialNodes = { ...INITIAL_POLITICAL_NODES };
  let recycleBin = [...INITIAL_RECYCLE_BIN_IDS];

  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.nodes && parsed.recycleBinIds) {
          initialNodes = { ...INITIAL_POLITICAL_NODES, ...parsed.nodes };
          recycleBin = parsed.recycleBinIds;
        }
      }
    } catch {}
  }

  const persist = (nodes: Record<string, FileNode>, recycleBinIds: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes, recycleBinIds }));
    } catch {}
  };

  return {
    nodes: initialNodes,
    recycleBinIds: recycleBin,
    currentPath: 'C:\\MY DOCUMENTS',

    createFolder: (parentId: string, name: string) => {
      sound.playClick();
      const parent = get().nodes[parentId];
      const parentPath = parent ? parent.path : 'C:';
      const id = `folder-${Date.now()}`;
      const newFolder: FileNode = {
        id,
        name: name || 'New Folder',
        isDirectory: true,
        parentId,
        path: `${parentPath}\\${name || 'New Folder'}`,
        modified: '2016-11-12 02:45',
        fileType: 'folder',
        icon: 'folder',
      };

      set((state) => {
        const nextNodes = { ...state.nodes, [id]: newFolder };
        persist(nextNodes, state.recycleBinIds);
        return { nodes: nextNodes };
      });
      return id;
    },

    createFile: (parentId: string, name: string, content = '', fileType: FileNode['fileType'] = 'text') => {
      sound.playClick();
      const parent = get().nodes[parentId];
      const parentPath = parent ? parent.path : 'C:';
      const id = `file-${Date.now()}`;
      const newFile: FileNode = {
        id,
        name: name || 'New Document.txt',
        isDirectory: false,
        parentId,
        path: `${parentPath}\\${name || 'New Document.txt'}`,
        modified: '2016-11-12 02:45',
        fileType,
        icon: fileType === 'image' ? 'file-image' : 'file-text',
        size: content.length,
        content,
      };

      set((state) => {
        const nextNodes = { ...state.nodes, [id]: newFile };
        persist(nextNodes, state.recycleBinIds);
        return { nodes: nextNodes };
      });
      return id;
    },

    deleteNode: (id: string) => {
      const node = get().nodes[id];
      if (!node) return;
      sound.playRecycle();

      set((state) => {
        const updatedNode = { ...node, parentId: null };
        const nextNodes = { ...state.nodes, [id]: updatedNode };
        const nextRecycle = state.recycleBinIds.includes(id)
          ? state.recycleBinIds
          : [...state.recycleBinIds, id];
        persist(nextNodes, nextRecycle);
        return { nodes: nextNodes, recycleBinIds: nextRecycle };
      });
    },

    restoreNode: (id: string) => {
      sound.playClick();
      set((state) => {
        const node = state.nodes[id];
        if (!node) return state;

        // Restore back to My Documents by default if original parent lost
        const restoredNode: FileNode = {
          ...node,
          parentId: 'dir-my-docs',
          path: `C:\\MY DOCUMENTS\\${node.name}`,
        };
        const nextNodes = { ...state.nodes, [id]: restoredNode };
        const nextRecycle = state.recycleBinIds.filter((item) => item !== id);
        persist(nextNodes, nextRecycle);
        return { nodes: nextNodes, recycleBinIds: nextRecycle };
      });
    },

    emptyRecycleBin: () => {
      sound.playRecycle();
      set((state) => {
        const nextNodes = { ...state.nodes };
        state.recycleBinIds.forEach((id) => {
          delete nextNodes[id];
        });
        persist(nextNodes, []);
        return { nodes: nextNodes, recycleBinIds: [] };
      });
    },

    renameNode: (id: string, newName: string) => {
      sound.playClick();
      set((state) => {
        const node = state.nodes[id];
        if (!node) return state;
        const parent = node.parentId ? state.nodes[node.parentId] : null;
        const basePath = parent ? parent.path : 'C:';
        const updatedNode: FileNode = {
          ...node,
          name: newName,
          path: `${basePath}\\${newName}`,
          modified: '2016-11-12 02:45',
        };
        const nextNodes = { ...state.nodes, [id]: updatedNode };
        persist(nextNodes, state.recycleBinIds);
        return { nodes: nextNodes };
      });
    },

    updateFileContent: (id: string, newContent: string) => {
      set((state) => {
        const node = state.nodes[id];
        if (!node) return state;
        const updatedNode: FileNode = {
          ...node,
          content: newContent,
          size: newContent.length,
          modified: '2016-11-12 02:45',
        };
        const nextNodes = { ...state.nodes, [id]: updatedNode };
        persist(nextNodes, state.recycleBinIds);
        return { nodes: nextNodes };
      });
    },

    unlockFile: (id: string, passwordAttempt: string) => {
      const node = get().nodes[id];
      if (!node || !node.isPasswordProtected) return true;
      if (
        node.password &&
        node.password.toUpperCase() === passwordAttempt.trim().toUpperCase()
      ) {
        sound.playAsterisk();
        set((state) => {
          const unlockedNode: FileNode = {
            ...node,
            isPasswordProtected: false,
          };
          const nextNodes = { ...state.nodes, [id]: unlockedNode };
          persist(nextNodes, state.recycleBinIds);
          return { nodes: nextNodes };
        });
        return true;
      }
      sound.playError();
      return false;
    },

    recoverCorruptedSector: () => {
      sound.playAsterisk();
      const id = 'file-recovered-confession';
      const recoveredNode: FileNode = {
        id,
        name: 'recovered_archivist_confession.txt',
        isDirectory: false,
        parentId: 'dir-d-unrecovered',
        path: 'D:\\UNRECOVERED_FILES\\recovered_archivist_confession.txt',
        fileType: 'text',
        icon: 'file-text',
        size: 2150,
        modified: '2016-11-12 02:40',
        metadata: {
          documentTitle: 'Recovered Confession of Desk Officer R.K. Dave',
          historicalDate: '12 November 2016',
          sourceOrPublication: 'Forensically Restored Sector 0x8F91',
          category: 'fictional_story',
          summary: 'Forensically recovered document detailing the archivist\'s final minutes at the Gandhinagar terminal before power cutoff.',
          isFictional: true,
        },
        content: `[ARCHIVIST FICTIONAL RECORD - STORYTELLING ELEMENT]
=== FORENSICALLY RECOVERED SECTOR CLUSTER 0x8F91 ===
RESTORATION TIMESTAMP: NOVEMBER 2026

"02:35 AM IST — 12 November 2016.
The lights in the outer corridor have just been turned off by the night chowkidar.
I have finished copying all the files:
The Godhra reports, the Supreme Court SIT clean-chit proceedings, the Vibrant Gujarat investment registers, the 2014 election seat breakdowns, the Make in India and Swachh Bharat notifications, Dadri and JNU controversies, and the final 8 PM demonetisation speech from four days ago.

Everything that happened between October 2001 and November 2016 is here on these two drives.
The password for confidential_transfer_order.doc is SACHIVALAYA.

I hear footsteps on the stairs. Central Stores moving crew is coming to pack the desks into crates.
I am uncoupling the power cord now.
To whoever finds this computer years from now: look at the records, not the propaganda.
— R.K. Dave, Desk Officer, Gandhinagar"`,
      };

      set((state) => {
        const nextNodes = { ...state.nodes, [id]: recoveredNode };
        persist(nextNodes, state.recycleBinIds);
        return { nodes: nextNodes };
      });
      return true;
    },

    getNode: (id: string) => {
      return get().nodes[id];
    },

    getChildren: (parentId: string | null) => {
      const state = get();
      if (parentId === 'recycle-bin') {
        return state.recycleBinIds
          .map((id) => state.nodes[id])
          .filter(Boolean) as FileNode[];
      }
      return Object.values(state.nodes).filter(
        (node) => node.parentId === parentId && !state.recycleBinIds.includes(node.id)
      );
    },

    getNodeByPath: (path: string) => {
      return Object.values(get().nodes).find(
        (node) => node.path?.toLowerCase() === path.toLowerCase()
      );
    },

    resetFileSystem: () => {
      const initial = { ...INITIAL_POLITICAL_NODES };
      persist(initial, INITIAL_RECYCLE_BIN_IDS);
      set({ nodes: initial, recycleBinIds: [...INITIAL_RECYCLE_BIN_IDS] });
    },
  };
});
