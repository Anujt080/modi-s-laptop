import React from 'react';
import { useDesktopStore } from '../../store/useDesktopStore';
import { useFileSystemStore } from '../../store/useFileSystemStore';
import { sound } from '../../sound/soundEngine';

export const ContextMenu: React.FC = () => {
  const { contextMenu, closeContextMenu, openWindow } = useDesktopStore();
  const { createFolder, createFile } = useFileSystemStore();

  if (!contextMenu || !contextMenu.isOpen) return null;

  return (
    <div
      className="win-context-menu"
      style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="win-context-row"
        onClick={() => {
          sound.playClick();
          closeContextMenu();
        }}
      >
        Arrange Icons
      </div>
      <div
        className="win-context-row"
        onClick={() => {
          sound.playClick();
          closeContextMenu();
        }}
      >
        Line Up Icons
      </div>
      <div
        className="win-context-row"
        onClick={() => {
          sound.playClick();
          closeContextMenu();
        }}
      >
        Refresh
      </div>
      <div className="win-context-separator" />
      <div
        className="win-context-row"
        onClick={() => {
          sound.playClick();
          createFolder('dir-my-docs', 'New Folder');
          closeContextMenu();
        }}
      >
        New Folder
      </div>
      <div
        className="win-context-row"
        onClick={() => {
          sound.playClick();
          createFile('dir-my-docs', 'New Document.txt', '', 'text');
          closeContextMenu();
        }}
      >
        New Text Document
      </div>
      <div className="win-context-separator" />
      <div
        className="win-context-row font-bold"
        onClick={() => {
          sound.playClick();
          openWindow('controlpanel', 'Control Panel - Display Properties', 'controlpanel');
          closeContextMenu();
        }}
      >
        Properties
      </div>
    </div>
  );
};
