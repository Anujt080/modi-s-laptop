import { create } from 'zustand';
import type { AppType, WindowId, WindowInstance, DesktopIconItem } from '../types';
import { sound } from '../sound/soundEngine';
import { SATIRICAL_ERRORS } from '../data/satireData';

export type WallpaperStyle = 'vintage_portrait' | 'teal' | 'clouds' | 'setup98' | 'bliss' | 'matrix' | 'mystery';

export interface WinErrorDialog {
  id: string;
  title: string;
  message: string;
  type: 'error' | 'warning' | 'info';
}

interface DesktopState {
  // Boot sequence & Shutdown
  bootPhase: 'off' | 'bios' | 'splash' | 'welcome' | 'desktop' | 'shutdown';
  setBootPhase: (phase: DesktopState['bootPhase']) => void;
  isShutdownDialogOpen: boolean;
  openShutdownDialog: () => void;
  closeShutdownDialog: () => void;

  // Window management
  windows: Record<WindowId, WindowInstance>;
  activeWindowId: WindowId | null;
  maxZIndex: number;
  openWindow: (
    appType: AppType,
    title?: string,
    icon?: string,
    data?: any,
    initialSize?: { width: number; height: number }
  ) => WindowId;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  maximizeWindow: (id: WindowId) => void;
  restoreWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  updateWindowPosition: (id: WindowId, x: number, y: number) => void;
  updateWindowSize: (id: WindowId, width: number, height: number) => void;
  updateWindowTitle: (id: WindowId, title: string) => void;

  // Desktop Icons
  desktopIcons: DesktopIconItem[];
  selectedIconIds: string[];
  selectIcon: (id: string, isMulti?: boolean) => void;
  clearSelectedIcons: () => void;
  updateIconPosition: (id: string, x: number, y: number) => void;

  // Start Menu
  isStartMenuOpen: boolean;
  toggleStartMenu: (open?: boolean) => void;

  // Context Menu
  contextMenu: {
    isOpen: boolean;
    x: number;
    y: number;
    targetType: 'desktop' | 'icon' | 'window';
    targetId?: string;
  } | null;
  openContextMenu: (
    x: number,
    y: number,
    targetType: 'desktop' | 'icon' | 'window',
    targetId?: string
  ) => void;
  closeContextMenu: () => void;

  // Desktop Appearance & Settings
  wallpaper: WallpaperStyle;
  setWallpaper: (wallpaper: WallpaperStyle) => void;
  crtEnabled: boolean;
  toggleCrt: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;

  // Easter Eggs & Errors
  bsodActive: boolean;
  triggerBsod: () => void;
  dismissBsod: () => void;
  errors: WinErrorDialog[];
  showError: (title: string, message: string, type?: 'error' | 'warning' | 'info') => void;
  triggerRandomSatiricalError: () => void;
  dismissError: (id: string) => void;
}

const defaultDesktopIcons: DesktopIconItem[] = [
  { id: 'icon-computer', title: 'My Computer', icon: 'computer', x: 20, y: 15, targetApp: 'explorer', targetPath: 'my-computer', isSystem: true },
  { id: 'icon-documents', title: 'My Documents', icon: 'documents', x: 20, y: 95, targetApp: 'explorer', targetPath: 'dir-my-docs', isSystem: true },
  { id: 'icon-backup', title: 'Backup Drive (D:)', icon: 'drive-d', x: 20, y: 175, targetApp: 'explorer', targetPath: 'root-d', isSystem: true },
  { id: 'icon-pictures', title: 'My Pictures', icon: 'pictures', x: 20, y: 255, targetApp: 'explorer', targetPath: 'dir-my-pics', isSystem: true },
  { id: 'icon-ie', title: 'Internet Explorer', icon: 'ie', x: 20, y: 335, targetApp: 'ie', isSystem: true },
  { id: 'icon-recycle', title: 'Recycle Bin', icon: 'recycle-full', x: 20, y: 415, targetApp: 'explorer', targetPath: 'recycle-bin', isSystem: true },

  { id: 'icon-mail', title: 'Outlook Express', icon: 'mail', x: 110, y: 15, targetApp: 'mail' },
  { id: 'icon-notepad', title: 'Notepad', icon: 'notepad', x: 110, y: 95, targetApp: 'notepad' },
  { id: 'icon-paint', title: 'Paint', icon: 'paint', x: 110, y: 175, targetApp: 'paint' },
  { id: 'icon-calc', title: 'Calculator', icon: 'calculator', x: 110, y: 255, targetApp: 'calculator' },
  { id: 'icon-minesweeper', title: 'Minesweeper', icon: 'minesweeper', x: 110, y: 335, targetApp: 'minesweeper' },
  { id: 'icon-mediaplayer', title: 'Windows Media Player', icon: 'mediaplayer', x: 110, y: 415, targetApp: 'mediaplayer' },

  { id: 'icon-dos', title: 'MS-DOS Prompt', icon: 'terminal', x: 200, y: 15, targetApp: 'terminal' },
  { id: 'icon-imaging', title: 'Imaging (Photos)', icon: 'pictures', x: 200, y: 95, targetApp: 'imageviewer' },
  { id: 'icon-control', title: 'Control Panel', icon: 'controlpanel', x: 200, y: 175, targetApp: 'controlpanel' },
  { id: 'icon-secret', title: 'Secret Archive', icon: 'secret', x: 200, y: 255, targetApp: 'explorer', targetPath: 'dir-secret' },
];


let windowCounter = 0;

export const useDesktopStore = create<DesktopState>((set, get) => {
  return {
    bootPhase: 'bios',
    setBootPhase: (phase) => set({ bootPhase: phase }),
    isShutdownDialogOpen: false,
    openShutdownDialog: () => {
      sound.playClick();
      set({ isShutdownDialogOpen: true, isStartMenuOpen: false });
    },
    closeShutdownDialog: () => {
      sound.playClick();
      set({ isShutdownDialogOpen: false });
    },

    windows: {},
    activeWindowId: null,
    maxZIndex: 100,

    openWindow: (appType, title, icon, data, initialSize) => {
      sound.playClick();
      const state = get();

      // If already open and singleton app, bring to front
      const existingEntry = Object.values(state.windows).find((w) => {
        if (appType === 'explorer') {
          const match = w.appType === 'explorer' && w.data?.path === data?.path;
          return match;
        }
        if (appType === 'notepad') {
          return w.appType === 'notepad' && Boolean(data?.fileId) && w.data?.fileId === data?.fileId;
        }
        if (appType === 'imageviewer') {
          return w.appType === 'imageviewer' && Boolean(data?.fileId) && w.data?.fileId === data?.fileId;
        }
        return w.appType === appType;
      });

      if (existingEntry) {
        state.focusWindow(existingEntry.id);
        if (existingEntry.isMinimized) {
          state.restoreWindow(existingEntry.id);
        }
        return existingEntry.id;
      }

      // Default titles and sizes per app
      const defaultConfigs: Record<
        AppType,
        { title: string; icon: string; width: number; height: number; minWidth: number; minHeight: number }
      > = {
        explorer: {
          title: data?.path === 'my-computer' ? 'My Computer' : 'Exploring - C:',
          icon: data?.path === 'my-computer' ? 'computer' : 'folder',
          width: 580,
          height: 420,
          minWidth: 380,
          minHeight: 280,
        },
        notepad: { title: 'Untitled - Notepad', icon: 'notepad', width: 480, height: 350, minWidth: 300, minHeight: 200 },
        paint: { title: 'untitled - Paint', icon: 'paint', width: 620, height: 440, minWidth: 420, minHeight: 320 },
        calculator: { title: 'Calculator', icon: 'calculator', width: 240, height: 260, minWidth: 240, minHeight: 260 },
        minesweeper: { title: 'Minesweeper', icon: 'minesweeper', width: 236, height: 320, minWidth: 236, minHeight: 320 },
        mediaplayer: { title: 'Windows Media Player', icon: 'mediaplayer', width: 440, height: 340, minWidth: 360, minHeight: 260 },
        ie: { title: 'Microsoft Internet Explorer', icon: 'ie', width: 680, height: 480, minWidth: 480, minHeight: 350 },
        mail: { title: 'Outlook Express', icon: 'mail', width: 640, height: 440, minWidth: 460, minHeight: 320 },
        terminal: { title: 'MS-DOS Prompt', icon: 'terminal', width: 560, height: 360, minWidth: 400, minHeight: 240 },
        controlpanel: { title: 'Control Panel', icon: 'controlpanel', width: 480, height: 360, minWidth: 360, minHeight: 260 },
        astrogame: { title: 'ASTRO-98 - Space Defender', icon: 'astrogame', width: 480, height: 480, minWidth: 480, minHeight: 480 },
        imageviewer: { title: 'Imaging for Windows 98', icon: 'pictures', width: 520, height: 400, minWidth: 380, minHeight: 280 },
        help: { title: 'Windows 98 Help', icon: 'help', width: 460, height: 360, minWidth: 320, minHeight: 240 },
        run: { title: 'Run', icon: 'run', width: 340, height: 160, minWidth: 340, minHeight: 160 },
        properties: { title: 'System Properties', icon: 'controlpanel', width: 400, height: 380, minWidth: 400, minHeight: 380 },
        find: { title: 'Find: All Files', icon: 'find', width: 450, height: 320, minWidth: 380, minHeight: 240 },
      };

      const cfg = defaultConfigs[appType] || {
        title: 'Application',
        icon: 'folder',
        width: 480,
        height: 360,
        minWidth: 300,
        minHeight: 200,
      };

      const id = `${appType}-${Date.now()}-${++windowCounter}`;
      const nextZ = state.maxZIndex + 1;
      const count = Object.keys(state.windows).length;
      // Stagger window locations
      const offsetX = 50 + (count % 8) * 26;
      const offsetY = 40 + (count % 8) * 26;

      const newWindow: WindowInstance = {
        id,
        title: title || cfg.title,
        icon: icon || cfg.icon,
        appType,
        isMinimized: false,
        isMaximized: false,
        zIndex: nextZ,
        x: offsetX,
        y: offsetY,
        width: initialSize?.width || cfg.width,
        height: initialSize?.height || cfg.height,
        minWidth: cfg.minWidth,
        minHeight: cfg.minHeight,
        data,
      };

      set((s) => ({
        windows: { ...s.windows, [id]: newWindow },
        activeWindowId: id,
        maxZIndex: nextZ,
        isStartMenuOpen: false,
      }));

      return id;
    },

    closeWindow: (id) => {
      sound.playClick();
      set((state) => {
        const nextWindows = { ...state.windows };
        delete nextWindows[id];

        // Pick next highest zIndex window to activate
        let nextActive: WindowId | null = null;
        let highestZ = -1;
        Object.values(nextWindows).forEach((w) => {
          if (!w.isMinimized && w.zIndex > highestZ) {
            highestZ = w.zIndex;
            nextActive = w.id;
          }
        });

        return {
          windows: nextWindows,
          activeWindowId: nextActive,
        };
      });
    },

    minimizeWindow: (id) => {
      sound.playClick();
      set((state) => {
        const win = state.windows[id];
        if (!win) return state;

        const updatedWin = { ...win, isMinimized: true };
        const nextWindows = { ...state.windows, [id]: updatedWin };

        // Activate next visible window
        let nextActive: WindowId | null = null;
        let highestZ = -1;
        Object.values(nextWindows).forEach((w) => {
          if (!w.isMinimized && w.id !== id && w.zIndex > highestZ) {
            highestZ = w.zIndex;
            nextActive = w.id;
          }
        });

        return {
          windows: nextWindows,
          activeWindowId: nextActive,
        };
      });
    },

    maximizeWindow: (id) => {
      sound.playClick();
      set((state) => {
        const win = state.windows[id];
        if (!win) return state;
        return {
          windows: {
            ...state.windows,
            [id]: { ...win, isMaximized: true, isMinimized: false },
          },
          activeWindowId: id,
        };
      });
    },

    restoreWindow: (id) => {
      sound.playClick();
      set((state) => {
        const win = state.windows[id];
        if (!win) return state;
        const nextZ = state.maxZIndex + 1;
        return {
          windows: {
            ...state.windows,
            [id]: { ...win, isMaximized: false, isMinimized: false, zIndex: nextZ },
          },
          activeWindowId: id,
          maxZIndex: nextZ,
        };
      });
    },

    focusWindow: (id) => {
      set((state) => {
        const win = state.windows[id];
        if (!win) return state;
        if (state.activeWindowId === id && !win.isMinimized) return state;

        const nextZ = state.maxZIndex + 1;
        return {
          windows: {
            ...state.windows,
            [id]: { ...win, isMinimized: false, zIndex: nextZ },
          },
          activeWindowId: id,
          maxZIndex: nextZ,
          isStartMenuOpen: false,
        };
      });
    },

    updateWindowPosition: (id, x, y) => {
      set((state) => {
        const win = state.windows[id];
        if (!win) return state;
        return {
          windows: {
            ...state.windows,
            [id]: { ...win, x: Math.max(0, x), y: Math.max(0, y) },
          },
        };
      });
    },

    updateWindowSize: (id, width, height) => {
      set((state) => {
        const win = state.windows[id];
        if (!win) return state;
        return {
          windows: {
            ...state.windows,
            [id]: {
              ...win,
              width: Math.max(win.minWidth || 200, width),
              height: Math.max(win.minHeight || 150, height),
            },
          },
        };
      });
    },

    updateWindowTitle: (id, title) => {
      set((state) => {
        const win = state.windows[id];
        if (!win || win.title === title) return state;
        return {
          windows: {
            ...state.windows,
            [id]: { ...win, title },
          },
        };
      });
    },

    // Desktop icons
    desktopIcons: defaultDesktopIcons,
    selectedIconIds: [],

    selectIcon: (id, isMulti = false) => {
      sound.playClick();
      set((state) => ({
        selectedIconIds: isMulti
          ? state.selectedIconIds.includes(id)
            ? state.selectedIconIds.filter((i) => i !== id)
            : [...state.selectedIconIds, id]
          : [id],
        isStartMenuOpen: false,
      }));
    },

    clearSelectedIcons: () => {
      set({ selectedIconIds: [], isStartMenuOpen: false });
    },

    updateIconPosition: (id, x, y) => {
      set((state) => ({
        desktopIcons: state.desktopIcons.map((icon) =>
          icon.id === id ? { ...icon, x: Math.max(10, x), y: Math.max(10, y) } : icon
        ),
      }));
    },

    // Start Menu
    isStartMenuOpen: false,
    toggleStartMenu: (open) => {
      sound.playClick();
      set((state) => ({
        isStartMenuOpen: open !== undefined ? open : !state.isStartMenuOpen,
        contextMenu: null,
      }));
    },

    // Context Menu
    contextMenu: null,
    openContextMenu: (x, y, targetType, targetId) => {
      set({
        contextMenu: { isOpen: true, x, y, targetType, targetId },
        isStartMenuOpen: false,
      });
    },
    closeContextMenu: () => set({ contextMenu: null }),

    // Appearance & Settings
    wallpaper: (() => {
      if (typeof window !== 'undefined') {
        try {
          const saved = localStorage.getItem('win98_selected_wallpaper_v2') as WallpaperStyle | null;
          if (saved) return saved;
        } catch {}
      }
      return 'vintage_portrait';
    })(),
    setWallpaper: (wallpaper) => {
      try {
        localStorage.setItem('win98_selected_wallpaper_v2', wallpaper);
      } catch {}
      set({ wallpaper });
    },
    crtEnabled: true,
    toggleCrt: () => set((state) => ({ crtEnabled: !state.crtEnabled })),
    soundEnabled: true,
    toggleSound: () => {
      const next = !get().soundEnabled;
      sound.enabled = next;
      set({ soundEnabled: next });
    },

    // Easter Eggs & Errors
    bsodActive: false,
    triggerBsod: () => {
      sound.playBeep();
      set({ bsodActive: true, isStartMenuOpen: false });
    },
    dismissBsod: () => {
      sound.playStartup();
      set({ bsodActive: false });
    },

    errors: [],
    showError: (title, message, type = 'error') => {
      sound.playError();
      const id = `err-${Date.now()}`;
      set((state) => ({
        errors: [...state.errors, { id, title, message, type }],
      }));
    },
    triggerRandomSatiricalError: () => {
      sound.playError();
      const randomItem = SATIRICAL_ERRORS[Math.floor(Math.random() * SATIRICAL_ERRORS.length)];
      const id = `err-${Date.now()}`;
      set((state) => ({
        errors: [...state.errors, { id, ...randomItem }],
      }));
    },
    dismissError: (id) => {
      sound.playClick();
      set((state) => ({
        errors: state.errors.filter((e) => e.id !== id),
      }));
    },
  };
});
