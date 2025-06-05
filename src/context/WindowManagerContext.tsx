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
    position: { x: 50, y: 50 },
    size: { width: 600, height: 400 },
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
    position: { x: 100, y: 100 },
    size: { width: 700, height: 500 },
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
    position: { x: 150, y: 150 },
    size: { width: 650, height: 450 },
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
    position: { x: 200, y: 200 },
    size: { width: 500, height: 400 },
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
    position: { x: 250, y: 250 },
    size: { width: 600, height: 450 },
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
    position: { x: 300, y: 300 },
    size: { width: 800, height: 600 },
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
    position: { x: 350, y: 150 },
    size: { width: 500, height: 400 },
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
      
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: true,
          isMinimized: false,
          zIndex: newZIndex,
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
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        position,
      },
    }));
  };

  const updateWindowSize = (id: string, size: { width: number; height: number }) => {
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