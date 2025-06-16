import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface WindowData {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  content: string;
  icon: string;
}

interface WindowManagerContextType {
  windows: Record<string, WindowData>;
  activeWindowId: string | null;
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  setActiveWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
}

const WindowManagerContext = createContext<WindowManagerContextType | undefined>(undefined);

const initialWindows: Record<string, WindowData> = {
  aboutMe: {
    id: 'aboutMe',
    title: 'About Me',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 20, y: 20 },
    size: { width: window.innerWidth > 768 ? 600 : window.innerWidth - 40, height: window.innerWidth > 768 ? 400 : window.innerHeight - 100 },
    content: 'aboutMe',
    icon: 'User',
  },
  projects: {
    id: 'projects',
    title: 'Projects',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 40, y: 40 },
    size: { width: window.innerWidth > 768 ? 700 : window.innerWidth - 40, height: window.innerWidth > 768 ? 500 : window.innerHeight - 100 },
    content: 'projects',
    icon: 'FolderKanban',
  },
  experiences: {
    id: 'experiences',
    title: 'Experiences',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 60, y: 60 },
    size: { width: window.innerWidth > 768 ? 650 : window.innerWidth - 40, height: window.innerWidth > 768 ? 450 : window.innerHeight - 100 },
    content: 'experiences',
    icon: 'Briefcase',
  },
  languages: {
    id: 'languages',
    title: 'Languages',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 80, y: 80 },
    size: { width: window.innerWidth > 768 ? 500 : window.innerWidth - 40, height: window.innerWidth > 768 ? 400 : window.innerHeight - 100 },
    content: 'languages',
    icon: 'Languages',
  },
  studies: {
    id: 'studies',
    title: 'Studies',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 100, y: 100 },
    size: { width: window.innerWidth > 768 ? 600 : window.innerWidth - 40, height: window.innerWidth > 768 ? 450 : window.innerHeight - 100 },
    content: 'studies',
    icon: 'GraduationCap',
  },
  games: {
    id: 'games',
    title: 'Games',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 120, y: 120 },
    size: { width: window.innerWidth > 768 ? 800 : window.innerWidth - 40, height: window.innerWidth > 768 ? 600 : window.innerHeight - 100 },
    content: 'games',
    icon: 'Gamepad2',
  },
  contact: {
    id: 'contact',
    title: 'Contact',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 140, y: 140 },
    size: { width: window.innerWidth > 768 ? 500 : window.innerWidth - 40, height: window.innerWidth > 768 ? 400 : window.innerHeight - 100 },
    content: 'contact',
    icon: 'Mail',
  },
};

export const WindowManagerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<Record<string, WindowData>>(initialWindows);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [highestZIndex, setHighestZIndex] = useState(10);

  const openWindow = (id: string) => {
    setWindows((prev) => {
      const newZIndex = highestZIndex + 1;
      setHighestZIndex(newZIndex);
      
      // Ajustar el tamaño y posición para móvil
      const isMobile = window.innerWidth <= 768;
      const position = isMobile ? { x: 20, y: 20 } : prev[id].position;
      const size = isMobile 
        ? { width: window.innerWidth - 40, height: window.innerHeight - 100 }
        : prev[id].size;
      
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: true,
          isMinimized: false,
          isMaximized: isMobile, // Maximizar automáticamente en móvil
          zIndex: newZIndex,
          position,
          size,
        },
      };
    });
    setActiveWindowId(id);
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
      },
    }));

    if (activeWindowId === id) {
      // Find the highest z-index window that's still open
      const openWindows = Object.values(windows).filter(w => w.isOpen && w.id !== id);
      if (openWindows.length > 0) {
        const highestWindow = openWindows.reduce((prev, current) => 
          prev.zIndex > current.zIndex ? prev : current
        );
        setActiveWindowId(highestWindow.id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const minimizeWindow = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true,
      },
    }));

    if (activeWindowId === id) {
      // Find the highest z-index window that's still open and not minimized
      const visibleWindows = Object.values(windows).filter(w => w.isOpen && !w.isMinimized && w.id !== id);
      if (visibleWindows.length > 0) {
        const highestWindow = visibleWindows.reduce((prev, current) => 
          prev.zIndex > current.zIndex ? prev : current
        );
        setActiveWindowId(highestWindow.id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const maximizeWindow = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: true,
        isMinimized: false,
      },
    }));
    setActiveWindow(id);
  };

  const restoreWindow = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: false,
        isMinimized: false,
      },
    }));
    setActiveWindow(id);
  };

  const setActiveWindow = (id: string) => {
    if (windows[id].isOpen && !windows[id].isMinimized) {
      setWindows((prev) => {
        const newZIndex = highestZIndex + 1;
        setHighestZIndex(newZIndex);
        
        return {
          ...prev,
          [id]: {
            ...prev[id],
            zIndex: newZIndex,
          },
        };
      });
      setActiveWindowId(id);
    }
  };

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return; // No permitir arrastrar en móvil

    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        position,
      },
    }));
  };

  const updateWindowSize = (id: string, size: { width: number; height: number }) => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return; // No permitir redimensionar en móvil

    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        size,
      },
    }));
  };

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        activeWindowId,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        restoreWindow,
        setActiveWindow,
        updateWindowPosition,
        updateWindowSize,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
};

export const useWindowManager = () => {
  const context = useContext(WindowManagerContext);
  if (context === undefined) {
    throw new Error('useWindowManager must be used within a WindowManagerProvider');
  }
  return context;
};