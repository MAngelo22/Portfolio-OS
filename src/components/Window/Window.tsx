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

type ResizeDirection = 'nw' | 'ne' | 'sw' | 'se';

const MIN_WIDTH = 420;
const MIN_HEIGHT = 300;
const TASKBAR_HEIGHT = 56;

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
    updateWindowSize,
    activeWindowId,
  } = useWindowManager();

  const windowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeState, setResizeState] = useState<{
    active: boolean;
    direction: ResizeDirection;
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    startLeft: number;
    startTop: number;
  } | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized && !resizeState?.active) {
        const maxX = Math.max(0, window.innerWidth - size.width);
        const maxY = Math.max(0, window.innerHeight - TASKBAR_HEIGHT - size.height);
        const newX = Math.min(maxX, Math.max(0, e.clientX - dragOffset.x));
        const newY = Math.min(maxY, Math.max(0, e.clientY - dragOffset.y));
        updateWindowPosition(id, { x: newX, y: newY });
      }

      if (resizeState?.active && !isMaximized && window.innerWidth > 768) {
        const dx = e.clientX - resizeState.startX;
        const dy = e.clientY - resizeState.startY;

        let nextWidth = resizeState.startWidth;
        let nextHeight = resizeState.startHeight;
        let nextLeft = resizeState.startLeft;
        let nextTop = resizeState.startTop;

        if (resizeState.direction.includes('e')) {
          nextWidth = Math.max(MIN_WIDTH, resizeState.startWidth + dx);
        }
        if (resizeState.direction.includes('s')) {
          nextHeight = Math.max(MIN_HEIGHT, resizeState.startHeight + dy);
        }
        if (resizeState.direction.includes('w')) {
          nextWidth = Math.max(MIN_WIDTH, resizeState.startWidth - dx);
          nextLeft = resizeState.startLeft + (resizeState.startWidth - nextWidth);
        }
        if (resizeState.direction.includes('n')) {
          nextHeight = Math.max(MIN_HEIGHT, resizeState.startHeight - dy);
          nextTop = resizeState.startTop + (resizeState.startHeight - nextHeight);
        }

        const maxWidth = window.innerWidth - nextLeft;
        const maxHeight = window.innerHeight - TASKBAR_HEIGHT - nextTop;

        nextWidth = Math.min(maxWidth, nextWidth);
        nextHeight = Math.min(maxHeight, nextHeight);
        nextLeft = Math.max(0, nextLeft);
        nextTop = Math.max(0, nextTop);

        updateWindowPosition(id, { x: nextLeft, y: nextTop });
        updateWindowSize(id, { width: nextWidth, height: nextHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (resizeState?.active) {
        setResizeState(null);
      }
    };

    if (isDragging || resizeState?.active) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [
    dragOffset,
    id,
    isDragging,
    isMaximized,
    resizeState,
    size.height,
    size.width,
    updateWindowPosition,
    updateWindowSize,
  ]);

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

  const startResize = (direction: ResizeDirection, event: React.MouseEvent) => {
    if (isMaximized || window.innerWidth <= 768) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    setActiveWindow(id);
    setIsDragging(false);
    setResizeState({
      active: true,
      direction,
      startX: event.clientX,
      startY: event.clientY,
      startWidth: size.width,
      startHeight: size.height,
      startLeft: position.x,
      startTop: position.y,
    });
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

  return (
    <div
      ref={windowRef}
      className={`window fixed md:absolute bg-blue-900/35 rounded-lg overflow-hidden border border-blue-600 shadow-lg backdrop-blur-md ${isActive ? 'shadow-cyan-400/40' : ''}`}
      style={{
        left: isMaximized ? 0 : `${position.x}px`,
        top: isMaximized ? 0 : `${position.y}px`,
        width: isMaximized ? '100%' : `${size.width}px`,
        height: isMaximized ? `calc(100% - ${TASKBAR_HEIGHT}px)` : `${size.height}px`,
        zIndex,
        maxWidth: '100vw',
        maxHeight: `calc(100vh - ${TASKBAR_HEIGHT}px)`,
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        ref={headerRef}
        className="window-header flex items-center justify-between px-2 md:px-4 py-1.5 md:py-2 bg-blue-800/60 text-white border-b border-blue-600 cursor-grab"
        onDoubleClick={handleDoubleClick}
      >
        <h3 className="text-xs md:text-sm font-medium truncate text-blue-100">{title}</h3>
        <div className="flex space-x-1 md:space-x-2">
          <button className="p-0.5 md:p-1 hover:bg-blue-700/50 rounded-full transition-colors" onClick={() => minimizeWindow(id)}>
            <Minus className="w-3 h-3 md:w-4 md:h-4 text-blue-100" />
          </button>
          <button
            className="p-0.5 md:p-1 hover:bg-blue-700/50 rounded-full transition-colors"
            onClick={() => (isMaximized ? restoreWindow(id) : maximizeWindow(id))}
          >
            {isMaximized ? (
              <Minimize className="w-3 h-3 md:w-4 md:h-4 text-blue-100" />
            ) : (
              <Maximize className="w-3 h-3 md:w-4 md:h-4 text-blue-100" />
            )}
          </button>
          <button className="p-0.5 md:p-1 hover:bg-red-600/50 rounded-full transition-colors" onClick={() => closeWindow(id)}>
            <X className="w-3 h-3 md:w-4 md:h-4 text-blue-100" />
          </button>
        </div>
      </div>

      <div className="window-content p-2 md:p-3 h-[calc(100%-32px)] md:h-[calc(100%-40px)] overflow-auto bg-slate-900/25 text-gray-100">
        <div className="h-full min-h-0">{children}</div>
      </div>

      {!isMaximized && window.innerWidth > 768 && (
        <>
          <button
            type="button"
            aria-label="Resize top left"
            className="absolute top-0 left-0 w-3 h-3 cursor-nwse-resize"
            onMouseDown={(e) => startResize('nw', e)}
          />
          <button
            type="button"
            aria-label="Resize top right"
            className="absolute top-0 right-0 w-3 h-3 cursor-nesw-resize"
            onMouseDown={(e) => startResize('ne', e)}
          />
          <button
            type="button"
            aria-label="Resize bottom left"
            className="absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize"
            onMouseDown={(e) => startResize('sw', e)}
          />
          <button
            type="button"
            aria-label="Resize bottom right"
            className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize"
            onMouseDown={(e) => startResize('se', e)}
          />
        </>
      )}
    </div>
  );
};

export default Window;
