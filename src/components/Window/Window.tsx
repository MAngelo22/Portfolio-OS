import { useRef, useState, useEffect } from 'react';
import { X, Minus, Maximize, Minimize } from 'lucide-react';
import { useWindowManager } from '../../context/WindowManagerContext';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

const Window: React.FC<WindowProps> = ({
  id,
  title,
  children,
  isMinimized,
  isMaximized,
  zIndex,
  position,
  size,
}) => {
  const { 
    closeWindow, 
    minimizeWindow, 
    maximizeWindow, 
    restoreWindow, 
    setActiveWindow,
    updateWindowPosition,
    activeWindowId,
  } = useWindowManager();

  const windowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        const newX = Math.max(0, e.clientX - dragOffset.x);
        const newY = Math.max(0, e.clientY - dragOffset.y);
        
        updateWindowPosition(id, { x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, id, isMaximized, updateWindowPosition]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (headerRef.current && headerRef.current.contains(e.target as Node) && !isMaximized) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
    setActiveWindow(id);
  };

  const handleDoubleClick = () => {
    if (isMaximized) {
      restoreWindow(id);
    } else {
      maximizeWindow(id);
    }
  };

  if (isMinimized) {
    return null;
  }

  const isActive = activeWindowId === id;
  // const windowClass = isActive ? 'active-window' : 'inactive-window'; // Keeping this commented for now

  return (
    <div
      ref={windowRef}
      className={`window absolute bg-blue-900 bg-opacity-30 rounded-lg overflow-hidden border border-blue-600 shadow-lg backdrop-blur-md ${isActive ? 'shadow-blue-500/50' : ''}`}
      style={{
        left: isMaximized ? 0 : `${position.x}px`,
        top: isMaximized ? 0 : `${position.y}px`,
        width: isMaximized ? '100%' : `${size.width}px`,
        height: isMaximized ? '100%' : `${size.height}px`,
        zIndex,
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        ref={headerRef}
        className="window-header flex items-center justify-between px-4 py-2 bg-blue-800 bg-opacity-50 text-white border-b border-blue-600 cursor-grab"
        onDoubleClick={handleDoubleClick}
      >
        <h3 className="text-sm font-medium truncate text-blue-200">{title}</h3>
        <div className="flex space-x-2">
          <button
            className="p-1 hover:bg-blue-700/50 rounded-full transition-colors"
            onClick={() => minimizeWindow(id)}
          >
            <Minus className="w-4 h-4 text-blue-200" />
          </button>
          <button
            className="p-1 hover:bg-blue-700/50 rounded-full transition-colors"
            onClick={() => isMaximized ? restoreWindow(id) : maximizeWindow(id)}
          >
            {isMaximized ? <Minimize className="w-4 h-4 text-blue-200" /> : <Maximize className="w-4 h-4 text-blue-200" />}
          </button>
          <button
            className="p-1 hover:bg-red-600/50 rounded-full transition-colors"
            onClick={() => closeWindow(id)}
          >
            <X className="w-4 h-4 text-blue-200" />
          </button>
        </div>
      </div>
      <div className="window-content p-4 h-[calc(100%-40px)] overflow-auto bg-gray-900 bg-opacity-20 text-gray-200">
        {children}
      </div>
    </div>
  );
};

export default Window;