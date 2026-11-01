import React, { useState, useEffect, useRef } from 'react';
import { useFileSystemStore } from '../../store/useFileSystemStore';
import { useDesktopStore } from '../../store/useDesktopStore';
import { sound } from '../../sound/soundEngine';
import { Win98Icon } from '../../components/common/Win98Icon';

interface ImageViewerAppProps {
  windowId: string;
  fileId?: string;
}

export const ImageViewerApp: React.FC<ImageViewerAppProps> = ({ windowId, fileId }) => {
  const { nodes, createFile } = useFileSystemStore();
  const { closeWindow, updateWindowTitle } = useDesktopStore();

  // Find all images across the system as fallback, or within the active folder
  const allImages = Object.values(nodes).filter((n) => n.fileType === 'image');
  const initialImageId = fileId || (allImages.length > 0 ? allImages[0].id : null);

  const [currentFileId, setCurrentFileId] = useState<string | null>(initialImageId);
  const [zoom, setZoom] = useState<number>(1);
  const [fitMode, setFitMode] = useState<'fit' | 'actual' | 'custom'>('fit');
  const [rotation, setRotation] = useState<number>(0);
  const [imageError, setImageError] = useState<boolean>(false);
  const [uvMode, setUvMode] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentFile = currentFileId ? nodes[currentFileId] : null;

  // Sibling images within the same folder
  const folderImages = currentFile?.parentId
    ? Object.values(nodes).filter(
        (n) => n.parentId === currentFile.parentId && n.fileType === 'image'
      )
    : allImages;

  const currentIdx = folderImages.findIndex((n) => n.id === currentFileId);

  // Synchronize window title when current file changes
  useEffect(() => {
    if (currentFile) {
      updateWindowTitle(windowId, `${currentFile.name} - Imaging for Windows 98`);
    } else {
      updateWindowTitle(windowId, 'Imaging for Windows 98');
    }
  }, [currentFileId, currentFile, windowId, updateWindowTitle]);

  // Navigation handlers
  const handlePrev = () => {
    if (folderImages.length <= 1) return;
    sound.playClick();
    const prevIdx = currentIdx <= 0 ? folderImages.length - 1 : currentIdx - 1;
    setCurrentFileId(folderImages[prevIdx].id);
    setImageError(false);
  };

  const handleNext = () => {
    if (folderImages.length <= 1) return;
    sound.playClick();
    const nextIdx = currentIdx >= folderImages.length - 1 ? 0 : currentIdx + 1;
    setCurrentFileId(folderImages[nextIdx].id);
    setImageError(false);
  };

  const handleZoomIn = () => {
    sound.playClick();
    setFitMode('custom');
    setZoom((z) => Math.min(4, Math.round((z + 0.25) * 100) / 100));
  };

  const handleZoomOut = () => {
    sound.playClick();
    setFitMode('custom');
    setZoom((z) => Math.max(0.25, Math.round((z - 0.25) * 100) / 100));
  };

  const handleFitToWindow = () => {
    sound.playClick();
    setFitMode('fit');
    setZoom(1);
    setRotation(0);
  };

  const handleActualSize = () => {
    sound.playClick();
    setFitMode('actual');
    setZoom(1);
    setRotation(0);
  };

  const handleRotate = () => {
    sound.playClick();
    setRotation((r) => (r + 90) % 360);
  };

  const toggleUv = () => {
    sound.playAsterisk();
    setUvMode(!uvMode);
  };

  // Allow uploading/adding actual images without modifying source code
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const targetFolderId = currentFile?.parentId || 'dir-memes-political';
      const newFileId = createFile(targetFolderId, file.name, dataUrl, 'image');
      sound.playAsterisk();
      setCurrentFileId(newFileId);
    };
    reader.readAsDataURL(file);
    // Reset file input
    e.target.value = '';
  };

  const getImageSrc = () => {
    if (!currentFile?.content) return '';
    return currentFile.content;
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#c0c0c0] select-none text-[11px]">
      {/* Hidden File Picker to add images dynamically */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />

      {/* Menu Bar */}
      <div className="win-menubar">
        <div className="win-menu-item" onClick={() => fileInputRef.current?.click()}>
          <u>F</u>ile
        </div>
        <div className="win-menu-item" onClick={handlePrev}>
          <u>P</u>revious
        </div>
        <div className="win-menu-item" onClick={handleNext}>
          <u>N</u>ext
        </div>
        <div className="win-menu-item" onClick={handleFitToWindow}>
          <u>V</u>iew
        </div>
        <div className="win-menu-item" onClick={handleZoomIn}>
          <u>Z</u>oom
        </div>
        <div
          className="win-menu-item ml-auto text-red-700 font-bold"
          onClick={() => {
            sound.playClick();
            closeWindow(windowId);
          }}
        >
          Close [✕]
        </div>
      </div>

      {/* Primary Toolbar */}
      <div className="bg-[#c0c0c0] p-1 flex items-center justify-between border-b border-[#808080] flex-wrap gap-1">
        {/* Navigation Group */}
        <div className="flex items-center gap-1">
          <button
            className="win-btn font-bold"
            style={{ minWidth: 64, minHeight: 22 }}
            onClick={handlePrev}
            title="Previous image in this folder"
          >
            ◀ Prev
          </button>
          <button
            className="win-btn font-bold"
            style={{ minWidth: 64, minHeight: 22 }}
            onClick={handleNext}
            title="Next image in this folder"
          >
            Next ▶
          </button>
          <span className="text-[10px] text-gray-700 px-1 font-mono">
            {folderImages.length > 0 ? `${currentIdx + 1} of ${folderImages.length}` : '0 of 0'}
          </span>
        </div>

        {/* Zoom & View Controls */}
        <div className="flex items-center gap-1">
          <button
            className="win-btn"
            style={{ minWidth: 54, minHeight: 22 }}
            onClick={handleZoomIn}
            title="Zoom In"
          >
            🔍+ In
          </button>
          <button
            className="win-btn"
            style={{ minWidth: 54, minHeight: 22 }}
            onClick={handleZoomOut}
            title="Zoom Out"
          >
            🔍- Out
          </button>
          <button
            className={`win-btn ${fitMode === 'fit' ? 'depressed font-bold' : ''}`}
            style={{ minWidth: 62, minHeight: 22 }}
            onClick={handleFitToWindow}
            title="Fit to Window"
          >
            [ ] Fit
          </button>
          <button
            className={`win-btn ${fitMode === 'actual' ? 'depressed font-bold' : ''}`}
            style={{ minWidth: 70, minHeight: 22 }}
            onClick={handleActualSize}
            title="Actual Size (100%)"
          >
            100% Size
          </button>
          <button
            className="win-btn"
            style={{ minWidth: 54, minHeight: 22 }}
            onClick={handleRotate}
            title="Rotate 90° Clockwise"
          >
            ⟳ Rotate
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1">
          <button
            className="win-btn bg-emerald-100 text-emerald-900 font-bold"
            style={{ minWidth: 90, minHeight: 22 }}
            onClick={() => fileInputRef.current?.click()}
            title="Add your own JPG, PNG, GIF or WEBP image to this folder"
          >
            ➕ Add Photo...
          </button>
          <button
            className={`win-btn ${uvMode ? 'depressed bg-purple-900 text-yellow-300 font-bold' : 'text-purple-900 font-semibold'}`}
            style={{ minWidth: 70, minHeight: 22 }}
            onClick={toggleUv}
            title="Archival UV Scanner (Secret Clue Tool)"
          >
            🔦 UV Scan
          </button>
          <button
            className="win-btn text-red-600 font-bold"
            style={{ minWidth: 32, minHeight: 22 }}
            onClick={() => {
              sound.playClick();
              closeWindow(windowId);
            }}
            title="Close Image Viewer"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Image Canvas Container */}
      <div className="flex-1 bg-[#808080] win-inset m-1 p-2 overflow-auto flex items-center justify-center relative">
        {imageError || !currentFile ? (
          <div className="bg-[#c0c0c0] win-outset p-4 max-w-md shadow-2xl flex flex-col gap-3 text-black">
            <div className="flex items-center gap-3">
              <Win98Icon name="warning" size={32} />
              <div>
                <div className="font-bold text-xs text-red-800">Cannot Open Image</div>
                <div className="text-[11px] mt-1 text-gray-800">
                  Imaging for Windows 98 cannot read{' '}
                  <span className="font-mono font-bold">{currentFile?.name || 'the requested file'}</span>.
                </div>
                <div className="text-[10px] text-gray-600 mt-0.5">
                  The file may be damaged, missing, or in an unreadable format.
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-[#808080]">
              <button
                className="win-btn font-bold"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Valid Photo...
              </button>
              <button
                className="win-btn"
                onClick={() => {
                  setImageError(false);
                  handleNext();
                }}
              >
                Next Photo
              </button>
            </div>
          </div>
        ) : (
          <div
            className="relative flex items-center justify-center transition-transform duration-100"
            style={{
              transform: `rotate(${rotation}deg)`,
              maxWidth: fitMode === 'fit' ? '100%' : 'none',
              maxHeight: fitMode === 'fit' ? '100%' : 'none',
              width: fitMode === 'fit' ? '100%' : 'auto',
              height: fitMode === 'fit' ? '100%' : 'auto',
            }}
          >
            <img
              src={getImageSrc()}
              alt={currentFile.name}
              onError={() => setImageError(true)}
              className="select-none pointer-events-auto"
              style={{
                objectFit: 'contain',
                maxWidth: fitMode === 'fit' ? '100%' : 'none',
                maxHeight: fitMode === 'fit' ? '100%' : 'none',
                width: fitMode === 'actual' ? 'auto' : fitMode === 'custom' ? `${zoom * 100}%` : 'auto',
                height: fitMode === 'actual' ? 'auto' : fitMode === 'custom' ? 'auto' : 'auto',
                transform: fitMode === 'custom' ? `scale(${zoom})` : 'none',
                transformOrigin: 'center center',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6)',
                filter: uvMode ? 'invert(1) hue-rotate(180deg) contrast(1.4)' : 'none',
              }}
            />
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-[#c0c0c0] px-2 py-0.5 border-t border-[#808080] flex items-center justify-between text-[10px] text-gray-700">
        <div className="truncate max-w-[280px]">
          {currentFile ? (
            <span>
              <b className="text-black">{currentFile.name}</b> ({Math.round((currentFile.size || 25000) / 1024)} KB)
            </span>
          ) : (
            'No image selected'
          )}
        </div>
        <div className="flex items-center gap-3">
          {currentFile?.metadata?.category && (
            <span className="font-semibold text-purple-900">
              {currentFile.metadata.category.toUpperCase().replace('_', ' ')}
            </span>
          )}
          <span>Zoom: {fitMode === 'fit' ? 'Fit to Window' : `${Math.round(zoom * 100)}%`}</span>
          <span>Rotation: {rotation}°</span>
        </div>
      </div>
    </div>
  );
};
