import React from 'react';

interface Win98IconProps {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Win98Icon: React.FC<Win98IconProps> = ({
  name,
  size = 32,
  className = '',
  style = {},
}) => {
  const iconSize = `${size}px`;

  // Pixel-crafted SVGs faithfully representing original Windows 98 icons
  const renderIcon = () => {
    switch (name.toLowerCase()) {
      case 'computer':
      case 'my computer':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            {/* Monitor */}
            <rect x="4" y="2" width="24" height="18" fill="#d4d0c8" stroke="#000" strokeWidth="1" />
            <rect x="6" y="4" width="20" height="14" fill="#000" />
            <rect x="7" y="5" width="18" height="12" fill="#008080" />
            <rect x="8" y="6" width="16" height="1" fill="#20b2aa" />
            {/* Monitor base */}
            <path d="M12 20 L20 20 L22 23 L10 23 Z" fill="#b0aba2" stroke="#000" strokeWidth="1" />
            {/* Tower underneath / side */}
            <rect x="2" y="24" width="28" height="6" fill="#d4d0c8" stroke="#000" strokeWidth="1" />
            <rect x="5" y="26" width="6" height="2" fill="#808080" />
            <circle cx="25" cy="27" r="1" fill="#00ff00" />
            <circle cx="22" cy="27" r="1" fill="#ff0000" />
          </svg>
        );

      case 'documents':
      case 'my documents':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            {/* Manila Folder */}
            <path d="M2 7 L12 7 L14 10 L28 10 L28 27 L2 27 Z" fill="#d8b248" stroke="#000" strokeWidth="1" />
            <path d="M4 11 L26 11 L26 25 L4 25 Z" fill="#f8e078" />
            {/* Document sheet sticking out */}
            <path d="M12 4 L22 4 L26 8 L26 18 L12 18 Z" fill="#ffffff" stroke="#000" strokeWidth="1" />
            <path d="M22 4 L22 8 L26 8 Z" fill="#dfdfdf" stroke="#000" strokeWidth="1" />
            <line x1="14" y1="8" x2="20" y2="8" stroke="#000" strokeWidth="1" />
            <line x1="14" y1="11" x2="24" y2="11" stroke="#000" strokeWidth="1" />
            <line x1="14" y1="14" x2="22" y2="14" stroke="#000" strokeWidth="1" />
          </svg>
        );

      case 'pictures':
      case 'my pictures':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            {/* Folder */}
            <path d="M2 7 L12 7 L14 10 L28 10 L28 27 L2 27 Z" fill="#d8b248" stroke="#000" strokeWidth="1" />
            <path d="M4 12 L26 12 L26 25 L4 25 Z" fill="#f8e078" />
            {/* Picture postcard */}
            <rect x="10" y="5" width="18" height="14" fill="#ffffff" stroke="#000" strokeWidth="1" />
            <rect x="12" y="7" width="14" height="10" fill="#0080ff" />
            {/* Sun & mountain */}
            <circle cx="15" cy="10" r="2" fill="#ffff00" />
            <polygon points="12,17 17,12 21,17" fill="#008000" />
            <polygon points="18,17 22,13 26,17" fill="#228b22" />
          </svg>
        );

      case 'music':
      case 'my music':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            {/* Folder */}
            <path d="M2 7 L12 7 L14 10 L28 10 L28 27 L2 27 Z" fill="#d8b248" stroke="#000" strokeWidth="1" />
            <path d="M4 12 L26 12 L26 25 L4 25 Z" fill="#f8e078" />
            {/* CD Disc */}
            <circle cx="21" cy="11" r="8" fill="#e0e0e0" stroke="#000" strokeWidth="1" />
            <circle cx="21" cy="11" r="3" fill="#ffffff" stroke="#808080" strokeWidth="1" />
            <circle cx="21" cy="11" r="1.5" fill="#f8e078" />
            {/* Musical note */}
            <circle cx="10" cy="22" r="2" fill="#000080" />
            <rect x="11" y="16" width="1.5" height="6" fill="#000080" />
          </svg>
        );

      case 'ie':
      case 'internet explorer':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            {/* Golden orbital swoop */}
            <ellipse cx="16" cy="16" rx="14" ry="7" fill="none" stroke="#d49b00" strokeWidth="2.5" transform="rotate(-30 16 16)" />
            {/* Blue 'e' */}
            <circle cx="15" cy="16" r="11" fill="#1e70bf" />
            <circle cx="15" cy="16" r="6" fill="#ffffff" />
            <rect x="9" y="14" width="12" height="3" fill="#1e70bf" />
            <rect x="15" y="17" width="10" height="5" fill="#ffffff" opacity="0.9" />
            {/* Overlap fix for 3D swoop */}
            <path d="M6 13 Q16 18 26 11" fill="none" stroke="#ffcc00" strokeWidth="2" />
          </svg>
        );

      case 'recycle-empty':
      case 'recycle bin':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            {/* Top rim */}
            <ellipse cx="16" cy="7" rx="10" ry="3" fill="#808080" stroke="#000" strokeWidth="1" />
            <ellipse cx="16" cy="7" rx="8" ry="2" fill="#c0c0c0" />
            {/* Wire mesh bin body */}
            <path d="M6 7 L9 26 L23 26 L26 7 Z" fill="#999999" stroke="#000" strokeWidth="1" opacity="0.8" />
            <ellipse cx="16" cy="26" rx="7" ry="2" fill="#666666" />
            {/* Mesh pattern lines */}
            <line x1="10" y1="9" x2="11" y2="25" stroke="#ffffff" strokeWidth="1" />
            <line x1="16" y1="9" x2="16" y2="25" stroke="#ffffff" strokeWidth="1" />
            <line x1="22" y1="9" x2="21" y2="25" stroke="#ffffff" strokeWidth="1" />
          </svg>
        );

      case 'recycle-full':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            {/* Paper protruding */}
            <path d="M10 8 L14 2 L20 4 L18 8 Z" fill="#ffffff" stroke="#000" strokeWidth="1" />
            <path d="M15 7 L21 3 L24 7 Z" fill="#ffffd0" stroke="#000" strokeWidth="1" />
            <ellipse cx="16" cy="8" rx="10" ry="3" fill="#808080" stroke="#000" strokeWidth="1" />
            {/* Bin body */}
            <path d="M6 8 L9 26 L23 26 L26 8 Z" fill="#999999" stroke="#000" strokeWidth="1" opacity="0.9" />
            <ellipse cx="16" cy="26" rx="7" ry="2" fill="#666666" />
          </svg>
        );

      case 'network':
      case 'network neighborhood':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            {/* PC 1 */}
            <rect x="2" y="4" width="14" height="11" fill="#d4d0c8" stroke="#000" strokeWidth="1" />
            <rect x="4" y="6" width="10" height="7" fill="#008080" />
            {/* PC 2 */}
            <rect x="16" y="10" width="14" height="11" fill="#d4d0c8" stroke="#000" strokeWidth="1" />
            <rect x="18" y="12" width="10" height="7" fill="#008080" />
            {/* Cable connection */}
            <path d="M9 15 L9 25 L23 25 L23 21" fill="none" stroke="#000" strokeWidth="2" />
            <circle cx="16" cy="25" r="2" fill="#ff0000" />
          </svg>
        );

      case 'notepad':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            {/* Pad */}
            <rect x="5" y="3" width="20" height="26" fill="#f8f8f8" stroke="#000" strokeWidth="1" />
            <rect x="5" y="3" width="5" height="26" fill="#316ac5" />
            {/* Spiral rings */}
            <line x1="7" y1="7" x2="11" y2="7" stroke="#ffffff" strokeWidth="1" />
            <line x1="7" y1="12" x2="11" y2="12" stroke="#ffffff" strokeWidth="1" />
            <line x1="7" y1="17" x2="11" y2="17" stroke="#ffffff" strokeWidth="1" />
            <line x1="7" y1="22" x2="11" y2="22" stroke="#ffffff" strokeWidth="1" />
            {/* Text lines */}
            <line x1="13" y1="8" x2="22" y2="8" stroke="#808080" strokeWidth="1" />
            <line x1="13" y1="12" x2="22" y2="12" stroke="#808080" strokeWidth="1" />
            <line x1="13" y1="16" x2="22" y2="16" stroke="#808080" strokeWidth="1" />
            {/* Pencil */}
            <polygon points="26,16 28,18 20,28 17,28 17,25" fill="#f0c040" stroke="#000" strokeWidth="1" />
            <polygon points="17,28 18,29 16,30" fill="#000" />
          </svg>
        );

      case 'paint':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            {/* Paint Palette */}
            <path
              d="M4 16 C4 8 12 4 19 4 C25 4 28 8 28 13 C28 17 25 18 23 18 C21 18 20 19 20 21 C20 23 21 24 21 26 C21 28 19 30 16 30 C9 30 4 24 4 16 Z"
              fill="#e6be8a"
              stroke="#000"
              strokeWidth="1"
            />
            {/* Color Swatches */}
            <circle cx="10" cy="11" r="2" fill="#ff0000" />
            <circle cx="16" cy="8" r="2" fill="#ffff00" />
            <circle cx="22" cy="11" r="2" fill="#00aa00" />
            <circle cx="11" cy="21" r="2" fill="#0000ff" />
            {/* Brush */}
            <line x1="22" y1="26" x2="30" y2="18" stroke="#7a461e" strokeWidth="2.5" />
            <polygon points="20,28 22,26 23,29" fill="#000" />
          </svg>
        );

      case 'calculator':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            <rect x="5" y="3" width="22" height="26" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
            {/* LCD Screen */}
            <rect x="8" y="6" width="16" height="5" fill="#9db380" stroke="#000" strokeWidth="1" />
            <text x="21" y="10" fontSize="4" fontFamily="monospace" textAnchor="end" fill="#000">1998</text>
            {/* Buttons */}
            <rect x="8" y="13" width="3" height="3" fill="#fff" stroke="#000" strokeWidth="0.5" />
            <rect x="12.5" y="13" width="3" height="3" fill="#fff" stroke="#000" strokeWidth="0.5" />
            <rect x="17" y="13" width="3" height="3" fill="#fff" stroke="#000" strokeWidth="0.5" />
            <rect x="21" y="13" width="3" height="3" fill="#ff8080" stroke="#000" strokeWidth="0.5" />

            <rect x="8" y="18" width="3" height="3" fill="#fff" stroke="#000" strokeWidth="0.5" />
            <rect x="12.5" y="18" width="3" height="3" fill="#fff" stroke="#000" strokeWidth="0.5" />
            <rect x="17" y="18" width="3" height="3" fill="#fff" stroke="#000" strokeWidth="0.5" />
            <rect x="21" y="18" width="3" height="3" fill="#8080ff" stroke="#000" strokeWidth="0.5" />

            <rect x="8" y="23" width="3" height="3" fill="#fff" stroke="#000" strokeWidth="0.5" />
            <rect x="12.5" y="23" width="3" height="3" fill="#fff" stroke="#000" strokeWidth="0.5" />
            <rect x="17" y="23" width="7" height="3" fill="#80ff80" stroke="#000" strokeWidth="0.5" />
          </svg>
        );

      case 'minesweeper':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            {/* Bomb body */}
            <circle cx="16" cy="18" r="9" fill="#000" />
            {/* Spikes */}
            <line x1="16" y1="6" x2="16" y2="9" stroke="#000" strokeWidth="2" />
            <line x1="7" y1="18" x2="4" y2="18" stroke="#000" strokeWidth="2" />
            <line x1="25" y1="18" x2="28" y2="18" stroke="#000" strokeWidth="2" />
            <line x1="16" y1="27" x2="16" y2="30" stroke="#000" strokeWidth="2" />
            <line x1="9" y1="11" x2="7" y2="9" stroke="#000" strokeWidth="2" />
            <line x1="23" y1="11" x2="25" y2="9" stroke="#000" strokeWidth="2" />
            {/* Shine */}
            <circle cx="13" cy="15" r="2.5" fill="#ffffff" />
            {/* Lit fuse */}
            <path d="M16 6 Q20 3 22 5" fill="none" stroke="#d49b00" strokeWidth="1.5" />
            <circle cx="22" cy="5" r="1.5" fill="#ff0000" />
          </svg>
        );

      case 'mediaplayer':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            <rect x="4" y="5" width="24" height="22" fill="#202020" stroke="#000" strokeWidth="1" />
            {/* Screen */}
            <rect x="6" y="7" width="20" height="13" fill="#000080" />
            {/* Play symbol */}
            <polygon points="14,10 14,17 20,13.5" fill="#ffcc00" />
            {/* Buttons */}
            <rect x="6" y="22" width="4" height="3" fill="#c0c0c0" stroke="#000" strokeWidth="0.5" />
            <rect x="11" y="22" width="4" height="3" fill="#c0c0c0" stroke="#000" strokeWidth="0.5" />
            <rect x="16" y="22" width="4" height="3" fill="#c0c0c0" stroke="#000" strokeWidth="0.5" />
            <rect x="21" y="22" width="5" height="3" fill="#c0c0c0" stroke="#000" strokeWidth="0.5" />
          </svg>
        );

      case 'mail':
      case 'outlook':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            {/* Envelope */}
            <rect x="3" y="8" width="26" height="17" fill="#f8f8f8" stroke="#000" strokeWidth="1" />
            <path d="M3 8 L16 18 L29 8" fill="none" stroke="#000" strokeWidth="1" />
            <line x1="3" y1="25" x2="12" y2="16" stroke="#808080" strokeWidth="1" />
            <line x1="29" y1="25" x2="20" y2="16" stroke="#808080" strokeWidth="1" />
            {/* Blue lightning / stamp */}
            <rect x="21" y="10" width="6" height="5" fill="#ff6666" stroke="#000" strokeWidth="0.5" />
            <polygon points="12,2 18,2 14,8 19,8 10,18 13,11 8,11" fill="#0080ff" stroke="#000080" strokeWidth="0.5" />
          </svg>
        );

      case 'terminal':
      case 'ms-dos':
      case 'dos':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            <rect x="3" y="4" width="26" height="24" fill="#000000" stroke="#c0c0c0" strokeWidth="1.5" />
            <rect x="4" y="5" width="24" height="3" fill="#c0c0c0" />
            <text x="6" y="15" fill="#00ff00" fontFamily="monospace" fontSize="7" fontWeight="bold">C:\&gt;_</text>
          </svg>
        );

      case 'controlpanel':
      case 'control panel':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            <path d="M3 7 L12 7 L14 10 L29 10 L29 27 L3 27 Z" fill="#d8b248" stroke="#000" strokeWidth="1" />
            <path d="M5 12 L27 12 L27 25 L5 25 Z" fill="#f8e078" />
            {/* Hammer and screwdriver */}
            <path d="M12 15 L22 25" stroke="#777" strokeWidth="3" />
            <rect x="9" y="13" width="7" height="4" fill="#444" stroke="#000" strokeWidth="0.5" />
            <path d="M22 15 L12 25" stroke="#d49b00" strokeWidth="2.5" />
          </svg>
        );

      case 'folder':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            <path d="M2 6 L12 6 L15 9 L29 9 L29 26 L2 26 Z" fill="#d8b248" stroke="#000" strokeWidth="1" />
            <path d="M4 11 L27 11 L27 24 L4 24 Z" fill="#f8e078" />
          </svg>
        );

      case 'folder-open':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            <path d="M2 6 L12 6 L15 9 L28 9 L28 24 L2 24 Z" fill="#d8b248" stroke="#000" strokeWidth="1" />
            {/* White sheet inside */}
            <rect x="6" y="8" width="18" height="10" fill="#fff" stroke="#000" strokeWidth="1" />
            {/* Open front flap */}
            <path d="M1 26 L6 13 L29 13 L25 26 Z" fill="#f8e078" stroke="#000" strokeWidth="1" />
          </svg>
        );

      case 'secret':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            <path d="M2 6 L12 6 L15 9 L29 9 L29 26 L2 26 Z" fill="#4a3b32" stroke="#000" strokeWidth="1" />
            <path d="M4 11 L27 11 L27 24 L4 24 Z" fill="#2d221c" />
            {/* Padlock */}
            <rect x="13" y="16" width="8" height="7" fill="#d4af37" stroke="#000" strokeWidth="1" />
            <path d="M14 16 L14 13 A3 3 0 0 1 20 13 L20 16" fill="none" stroke="#000" strokeWidth="1.5" />
            <circle cx="17" cy="19" r="1" fill="#000" />
          </svg>
        );

      case 'drive-c':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            <rect x="4" y="9" width="24" height="14" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
            <rect x="7" y="12" width="18" height="4" fill="#808080" stroke="#000" strokeWidth="0.5" />
            <circle cx="23" cy="19" r="1.5" fill="#00ff00" />
            <rect x="7" y="18" width="8" height="2" fill="#fff" />
          </svg>
        );

      case 'drive-d':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            <rect x="4" y="9" width="24" height="14" fill="#d4d0c8" stroke="#000" strokeWidth="1" />
            <rect x="7" y="12" width="18" height="3" fill="#404040" />
            <circle cx="16" cy="18" r="4" fill="#e0e0e0" stroke="#000" strokeWidth="0.5" />
            <circle cx="16" cy="18" r="1.5" fill="#fff" />
            <circle cx="24" cy="19" r="1" fill="#00aa00" />
          </svg>
        );

      case 'file-text':
      case 'text':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            <polygon points="6,2 20,2 26,8 26,29 6,29" fill="#ffffff" stroke="#000" strokeWidth="1" />
            <polygon points="20,2 20,8 26,8" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
            <line x1="9" y1="12" x2="23" y2="12" stroke="#000080" strokeWidth="1" />
            <line x1="9" y1="16" x2="23" y2="16" stroke="#000080" strokeWidth="1" />
            <line x1="9" y1="20" x2="23" y2="20" stroke="#000080" strokeWidth="1" />
            <line x1="9" y1="24" x2="17" y2="24" stroke="#000080" strokeWidth="1" />
          </svg>
        );

      case 'file-pdf':
      case 'pdf':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            <polygon points="6,2 20,2 26,8 26,29 6,29" fill="#ffffff" stroke="#000" strokeWidth="1" />
            <polygon points="20,2 20,8 26,8" fill="#ff4d4f" stroke="#000" strokeWidth="1" />
            <rect x="8" y="12" width="16" height="6" fill="#ff4d4f" />
            <text x="16" y="17" fontSize="5" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle" fill="#ffffff">
              PDF
            </text>
            <line x1="9" y1="21" x2="23" y2="21" stroke="#808080" strokeWidth="1" />
            <line x1="9" y1="25" x2="19" y2="25" stroke="#808080" strokeWidth="1" />
          </svg>
        );


      case 'file-image':
      case 'image':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            <rect x="4" y="4" width="24" height="24" fill="#ffffff" stroke="#000" strokeWidth="1" />
            <rect x="6" y="6" width="20" height="18" fill="#1e3f66" />
            <circle cx="10" cy="10" r="2" fill="#fff" />
            <polygon points="6,24 13,16 18,21 21,18 26,24" fill="#437c90" />
          </svg>
        );

      case 'file-audio':
      case 'audio':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            <rect x="4" y="7" width="24" height="18" rx="2" fill="#333333" stroke="#000" strokeWidth="1" />
            <rect x="8" y="10" width="16" height="10" fill="#f0c040" />
            <circle cx="12" cy="15" r="2.5" fill="#fff" stroke="#000" strokeWidth="1" />
            <circle cx="20" cy="15" r="2.5" fill="#fff" stroke="#000" strokeWidth="1" />
            <rect x="13" y="14" width="6" height="2" fill="#000" />
          </svg>
        );

      case 'file-exe':
      case 'exe':
      case 'astrogame':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            <rect x="4" y="4" width="24" height="24" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
            <rect x="5" y="5" width="22" height="4" fill="#000080" />
            {/* Gear or spaceship */}
            <polygon points="16,11 19,23 16,21 13,23" fill="#ff0000" stroke="#000" strokeWidth="1" />
            <circle cx="16" cy="17" r="1.5" fill="#ffff00" />
          </svg>
        );

      case 'speaker':
      case 'sound':
        return (
          <svg viewBox="0 0 16 16" width="16" height="16">
            <polygon points="2,5 5,5 9,2 9,14 5,11 2,11" fill="#000" />
            <path d="M11 5 A4 4 0 0 1 11 11" fill="none" stroke="#000" strokeWidth="1.5" />
            <path d="M13 3 A7 7 0 0 1 13 13" fill="none" stroke="#000" strokeWidth="1.5" />
          </svg>
        );

      case 'start-logo':
        return (
          <svg viewBox="0 0 16 16" width="16" height="16">
            <rect x="2" y="2" width="5" height="5" fill="#ff3333" />
            <rect x="9" y="2" width="5" height="5" fill="#33cc33" />
            <rect x="2" y="9" width="5" height="5" fill="#3366ff" />
            <rect x="9" y="9" width="5" height="5" fill="#ffcc00" />
          </svg>
        );

      case 'error':
      case 'stop':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            <circle cx="16" cy="16" r="14" fill="#ff0000" stroke="#000" strokeWidth="1" />
            <line x1="9" y1="9" x2="23" y2="23" stroke="#ffffff" strokeWidth="3.5" />
            <line x1="23" y1="9" x2="9" y2="23" stroke="#ffffff" strokeWidth="3.5" />
          </svg>
        );

      case 'warning':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            <polygon points="16,3 30,28 2,28" fill="#ffff00" stroke="#000" strokeWidth="1.5" />
            <rect x="14.5" y="11" width="3" height="9" fill="#000" />
            <circle cx="16" cy="24" r="1.5" fill="#000" />
          </svg>
        );

      case 'info':
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            <circle cx="16" cy="16" r="14" fill="#0000ff" stroke="#000" strokeWidth="1" />
            <circle cx="16" cy="9" r="2" fill="#fff" />
            <rect x="14.5" y="13" width="3" height="10" fill="#fff" />
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 32 32" width={iconSize} height={iconSize}>
            <rect x="5" y="4" width="22" height="24" fill="#fff" stroke="#000" strokeWidth="1" />
            <line x1="8" y1="9" x2="24" y2="9" stroke="#808080" strokeWidth="1" />
            <line x1="8" y1="14" x2="24" y2="14" stroke="#808080" strokeWidth="1" />
            <line x1="8" y1="19" x2="24" y2="19" stroke="#808080" strokeWidth="1" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`win98-icon-container inline-flex items-center justify-center ${className}`}
      style={{ width: iconSize, height: iconSize, ...style }}
    >
      {renderIcon()}
    </div>
  );
};
