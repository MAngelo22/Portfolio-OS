import { useEffect, useState } from 'react';
import Desktop from './components/Desktop/Desktop';
import { WindowManagerProvider } from './context/WindowManagerContext';
import './App.css';

type Language = 'es' | 'en';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  const translations = {
    es: {
      loading: 'Cargando SO...',
    },
    en: {
      loading: 'Loading OS...',
    },
  } as const;

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4" />
          <h1 className="text-2xl font-medium tracking-wide">{translations[language].loading}</h1>
        </div>
      ) : (
        <WindowManagerProvider>
          <Desktop language={language} onLanguageChange={toggleLanguage} />
        </WindowManagerProvider>
      )}
    </div>
  );
}

export default App;
