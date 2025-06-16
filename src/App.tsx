import { useState } from 'react';
import Desktop from './components/Desktop/Desktop';
import Taskbar from './components/Taskbar/Taskbar';
import { WindowManagerProvider } from './context/WindowManagerContext';
import './App.css';

type Language = 'es' | 'en';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState<Language>('es');

  // Simulate loading screen
  useState(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  });

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const translations = {
    es: {
      loading: 'Cargando SO...',
      changeLanguage: 'Cambiar a Inglés'
    },
    en: {
      loading: 'Loading OS...',
      changeLanguage: 'Switch to Spanish'
    }
  } as const;

  return (
    <div className="min-h-screen bg-slate-900 overflow-y-auto">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <h1 className="text-2xl font-medium">{translations[language].loading}</h1>
        </div>
      ) : (
        <WindowManagerProvider>
          <div className="relative min-h-screen">
            <Desktop language={language} onLanguageChange={toggleLanguage} />
            <div className="fixed bottom-0 left-0 right-0 z-50">
              <Taskbar language={language} onLanguageChange={toggleLanguage} />
            </div>
          </div>
        </WindowManagerProvider>
      )}
    </div>
  );
}

export default App;