import { useState } from 'react';
import { useWindowManager } from '../../context/WindowManagerContext';
import DesktopIcon from './DesktopIcon';
import Window from '../Window/Window';
import Taskbar from '../Taskbar/Taskbar';
import AboutMe from '../Content/AboutMe';
import Projects from '../Content/Projects';
import Experiences from '../Content/Experiences';
import Languages from '../Content/Languages';
import Studies from '../Content/Studies';
import Games from '../Content/Games';
import Contact from '../Content/Contact';
import JarvisBackground from '../Background/JarvisBackground';

interface DesktopProps {
  language: 'es' | 'en';
  onLanguageChange: (lang: 'es' | 'en') => void;
}

const Desktop = ({ language, onLanguageChange }: DesktopProps) => {
  const { windows, openWindow } = useWindowManager();
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  const translations = {
    es: {
      aboutMe: 'Sobre Mí',
      projects: 'Proyectos',
      experiences: 'Experiencias',
      languages: 'Idiomas',
      studies: 'Estudios',
      games: 'Juegos',
      contact: 'Contacto',
      refresh: 'Actualizar',
      newFolder: 'Nueva Carpeta',
      displaySettings: 'Configuración de Pantalla'
    },
    en: {
      aboutMe: 'About Me',
      projects: 'Projects',
      experiences: 'Experiences',
      languages: 'Languages',
      studies: 'Studies',
      games: 'Games',
      contact: 'Contact',
      refresh: 'Refresh',
      newFolder: 'New Folder',
      displaySettings: 'Display Settings'
    }
  } as const;

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  const handleClick = () => {
    if (showContextMenu) {
      setShowContextMenu(false);
    }
  };

  // Get component based on content type
  const getWindowContent = (contentType: string) => {
    switch (contentType) {
      case 'aboutMe':
        return <AboutMe language={language} />;
      case 'projects':
        return <Projects language={language} />;
      case 'experiences':
        return <Experiences language={language} />;
      case 'languages':
        return <Languages language={language} />;
      case 'studies':
        return <Studies language={language} />;
      case 'games':
        return <Games language={language} />;
      case 'contact':
        return <Contact language={language} />;
      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <div 
      className="relative w-full h-screen"
      onContextMenu={handleContextMenu}
      onClick={handleClick}
    >
      {/* Animated Background */}
      <JarvisBackground />

      {/* Desktop Content (Icons, Windows, Taskbar) */}
      <div className="absolute inset-0 z-10">
        <div className="p-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
          <div className="flex flex-col space-y-6 mt-4">
            <DesktopIcon
              id="aboutMe"
              icon="User"
              label={translations[language].aboutMe}
              onClick={() => openWindow('aboutMe')}
            />
            <DesktopIcon
              id="projects"
              icon="FolderKanban"
              label={translations[language].projects}
              onClick={() => openWindow('projects')}
            />
            <DesktopIcon
              id="experiences"
              icon="Briefcase"
              label={translations[language].experiences}
              onClick={() => openWindow('experiences')}
            />
            <DesktopIcon
              id="languages"
              icon="Languages"
              label={translations[language].languages}
              onClick={() => openWindow('languages')}
            />
            <DesktopIcon
              id="studies"
              icon="GraduationCap"
              label={translations[language].studies}
              onClick={() => openWindow('studies')}
            />
            <DesktopIcon
              id="games"
              icon="Gamepad2"
              label={translations[language].games}
              onClick={() => openWindow('games')}
            />
            <DesktopIcon
              id="contact"
              icon="Mail"
              label={translations[language].contact}
              onClick={() => openWindow('contact')}
            />
          </div>
        </div>

        {/* Render all windows */}
        {Object.values(windows).map((window) => 
          window.isOpen && (
            <Window
              key={window.id}
              id={window.id}
              title={translations[language][window.id as keyof typeof translations[typeof language]]}
              isMinimized={window.isMinimized}
              isMaximized={window.isMaximized}
              zIndex={window.zIndex}
              position={window.position}
              size={window.size}
            >
              {getWindowContent(window.content)}
            </Window>
          )
        )}

        {/* Context Menu */}
        {showContextMenu && (
          <div 
            className="absolute bg-white shadow-lg rounded-md overflow-hidden z-50"
            style={{ 
              left: `${contextMenuPosition.x}px`, 
              top: `${contextMenuPosition.y}px` 
            }}
          >
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{translations[language].refresh}</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{translations[language].newFolder}</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{translations[language].displaySettings}</li>
            </ul>
          </div>
        )}

        <Taskbar language={language} onLanguageChange={onLanguageChange} />
      </div>
    </div>
  );
};

export default Desktop;