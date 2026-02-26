import { useWindowManager } from '../../context/WindowManagerContext';
import * as Icons from 'lucide-react';
import { Clock, Languages, LucideIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TaskbarProps {
  language: 'es' | 'en';
  onLanguageChange: (lang: 'es' | 'en') => void;
}

const Taskbar = ({ language, onLanguageChange }: TaskbarProps) => {
  const { windows, openWindow, activeWindowId } = useWindowManager();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const openWindows = Object.values(windows).filter((windowData) => windowData.isOpen);

  return (
    <div className="fixed bottom-0 left-0 w-full h-14 bg-slate-950/75 backdrop-blur-md border-t border-cyan-300/20 z-50 flex items-center justify-between px-2 sm:px-3 gap-2">
      <div className="flex items-center gap-2 min-w-0">
        <button
          type="button"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-cyan-500/80 flex items-center justify-center hover:bg-cyan-500 transition-colors"
        >
          <Icons.LayoutGrid className="w-5 h-5 text-white" />
        </button>

        <div className="h-8 w-px bg-slate-600" />

        <div className="flex items-center gap-1 overflow-x-auto max-w-[48vw] sm:max-w-[60vw] pb-1">
          {openWindows.map((windowData) => {
            const IconComponent = Icons[windowData.icon as keyof typeof Icons] as LucideIcon;
            const isActive = windowData.id === activeWindowId;

            return (
              <button
                key={windowData.id}
                className={`h-9 px-2 sm:px-3 rounded-md flex items-center gap-2 whitespace-nowrap transition-colors ${
                  isActive ? 'bg-slate-700/90' : 'hover:bg-slate-800/80'
                }`}
                onClick={() => openWindow(windowData.id)}
              >
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-100" />
                <span className="text-white text-xs sm:text-sm hidden md:inline">{windowData.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 text-white shrink-0">
        <button
          type="button"
          onClick={() => onLanguageChange(language === 'es' ? 'en' : 'es')}
          className="p-2 hover:bg-slate-700/50 rounded-md transition-colors"
          title={language === 'es' ? 'Cambiar a Ingles' : 'Switch to Spanish'}
        >
          <Languages size={18} />
        </button>

        <div className="flex items-center gap-1 text-xs sm:text-sm px-2 py-1 rounded bg-black/20 border border-white/10">
          <Clock className="w-3.5 h-3.5" />
          <span>{formatTime(currentTime)}</span>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
