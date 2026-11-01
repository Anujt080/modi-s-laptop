import React, { useRef, useState, useEffect } from 'react';
import type { DesktopIconItem } from '../../types';
import { useDesktopStore } from '../../store/useDesktopStore';
import { Win98Icon } from '../common/Win98Icon';

interface DesktopIconProps {
  item: DesktopIconItem;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ item }) => {
  const {
    selectedIconIds,
    selectIcon,
    openWindow,
    updateIconPosition,
    openContextMenu,
  } = useDesktopStore();

  const isSelected = selectedIconIds.includes(item.id);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ mouseX: 0, mouseY: 0, iconX: item.x, iconY: item.y });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (e.button === 2) {
      // Right click
      selectIcon(item.id);
      openContextMenu(e.clientX, e.clientY, 'icon', item.id);
      return;
    }

    selectIcon(item.id, e.ctrlKey || e.metaKey);
    setIsDragging(true);
    dragStart.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      iconX: item.x,
      iconY: item.y,
    };
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.targetApp) {
      openWindow(
        item.targetApp,
        item.title,
        item.icon,
        item.targetPath ? { path: item.targetPath } : undefined
      );
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.current.mouseX;
      const dy = e.clientY - dragStart.current.mouseY;
      updateIconPosition(item.id, dragStart.current.iconX + dx, dragStart.current.iconY + dy);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, item.id, updateIconPosition]);

  return (
    <div
      className={`win-desktop-icon absolute select-none flex flex-col items-center cursor-pointer ${
        isSelected ? 'selected' : ''
      }`}
      style={{
        left: `${item.x}px`,
        top: `${item.y}px`,
        zIndex: isSelected ? 40 : 20,
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <div className="win-desktop-icon-img">
        <Win98Icon name={item.icon} size={32} />
      </div>
      <div
        className="win-desktop-icon-title text-[11px] text-center text-white leading-tight mt-1 max-w-[76px] break-words"
        style={{
          textShadow: '1px 1px 2px #000, -1px -1px 2px #000, 1px -1px 2px #000, -1px 1px 2px #000',
        }}
      >
        {item.title}
      </div>
    </div>
  );
};
