export type WindowId = string;

export type AppType =
  | 'explorer'
  | 'notepad'
  | 'paint'
  | 'calculator'
  | 'minesweeper'
  | 'mediaplayer'
  | 'ie'
  | 'mail'
  | 'terminal'
  | 'controlpanel'
  | 'astrogame'
  | 'imageviewer'
  | 'help'
  | 'run'
  | 'properties'
  | 'find';

export interface WindowInstance {
  id: WindowId;
  title: string;
  icon: string;
  appType: AppType;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
  data?: any;
}

export type FileType = 'text' | 'image' | 'audio' | 'exe' | 'folder' | 'system' | 'doc' | 'pdf' | 'csv' | 'log';

export type HistoricalCategory =
  | 'verified_fact'
  | 'official_statement'
  | 'opposition_allegation'
  | 'journalistic_investigation'
  | 'judicial_finding'
  | 'public_criticism'
  | 'fictional_story';

export interface FileMetadata {
  documentTitle?: string;
  historicalDate?: string;
  sourceOrPublication?: string;
  category?: HistoricalCategory;
  summary?: string;
  publicSourceUrl?: string;
  isFictional?: boolean;
}

export interface FileNode {
  id: string;
  name: string;
  isDirectory: boolean;
  parentId: string | null;
  content?: string;
  size?: number;
  modified: string;
  icon?: string;
  isHidden?: boolean;
  isReadOnly?: boolean;
  isPasswordProtected?: boolean;
  password?: string;
  fileType: FileType;
  path?: string;
  systemApp?: AppType;
  appArgs?: any;
  metadata?: FileMetadata;
}

export interface DesktopIconItem {
  id: string;
  title: string;
  icon: string;
  x: number;
  y: number;
  targetApp?: AppType;
  targetPath?: string;
  isSystem?: boolean;
}

export interface EmailMessage {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  date: string;
  body: string;
  isRead: boolean;
  isStarred?: boolean;
  attachment?: {
    name: string;
    type: string;
    content: string;
  };
}

export interface StoryState {
  hasDiscoveredSecretFolder: boolean;
  hasDiscoveredBackupDrive: boolean;
  hasUnlockedConfidentialMemo: boolean;
  hasReadArchivistDiary: boolean;
  hasInspectedSecretPhoto: boolean;
  hasRecoveredCorruptedCluster: boolean;
  hasTriggeredAccountabilityError: boolean;
  hasTriggeredBsod: boolean;
  cluesFound: string[];
}

