import { useWindowManager } from '../../context/WindowManagerContext';
import * as Icons from 'lucide-react';
import { Clock, Calendar, Languages, LucideIcon } from 'lucide-react';
import { useState, useEffect, ElementType } from 'react';

interface TaskbarProps {
  language: 'es' | 'en';
  onLanguageChange: (lang: 'es' | 'en') => void;
}

const Taskbar = ({ language, onLanguageChange }: TaskbarProps) => {
  const { windows, openWindow, activeWindowId } = useWindowManager();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const openWindows = Object.values(windows).filter(window => window.isOpen);

  return (
    <div className="fixed bottom-0 left-0 w-full h-12 bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-lg z-50 flex items-center justify-between px-2">
      <div className="flex items-center space-x-1">
        <button className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors">
          <Icons.LayoutGrid className="w-5 h-5 text-white" />
        </button>

        <div className="h-10 w-px bg-gray-700 mx-2"></div>

        {/* Task buttons */}
        <div className="flex space-x-1">
          {openWindows.map(window => {
            const IconComponent = Icons[window.icon as keyof typeof Icons] as LucideIcon;
            const isActive = window.id === activeWindowId;
            
            return (
              <button
                key={window.id}
                className={`h-10 px-3 rounded flex items-center space-x-2 transition-colors ${
                  isActive ? 'bg-gray-700' : 'hover:bg-gray-800'
                }`}
                onClick={() => openWindow(window.id)}
              >
                <IconComponent className="w-5 h-5 text-white" />
                <span className="text-white text-sm hidden sm:inline">{window.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center space-x-4 text-white">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onLanguageChange(language === 'es' ? 'en' : 'es')}
            className="p-2 text-white hover:bg-slate-700/50 rounded-md transition-colors"
            title={language === 'es' ? 'Cambiar a Inglés' : 'Switch to Spanish'}
          >
            <Languages size={20} />
          </button>
          <button className="p-2 text-white hover:bg-slate-700/50 rounded-md transition-colors">
            <Calendar size={20} />
          </button>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{formatTime(currentTime)}</span>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;