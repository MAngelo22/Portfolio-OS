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
import Videos from '../Content/Videos';
import JarvisBackground from '../Background/JarvisBackground';
import icoHalcon from '../icons/ico-halcon.png';
import ico3d from '../icons/ico-3d.png';
import icoHandgame from '../icons/ico-handgame.png';
import icoRedpill from '../icons/ico-redpill.png';

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
      aboutMe: 'Sobre Mi',
      projects: 'Proyectos',
      experiences: 'Experiencias',
      languages: 'Idiomas',
      studies: 'Estudios',
      games: 'Juegos',
      contact: 'Contacto',
      videos: 'Videos',
      refresh: 'Actualizar',
      newFolder: 'Nueva Carpeta',
      displaySettings: 'Configuracion de Pantalla',
    },
    en: {
      aboutMe: 'About Me',
      projects: 'Projects',
      experiences: 'Experiences',
      languages: 'Languages',
      studies: 'Studies',
      games: 'Games',
      contact: 'Contact',
      videos: 'Videos',
      refresh: 'Refresh',
      newFolder: 'New Folder',
      displaySettings: 'Display Settings',
    },
  } as const;

  const handleContextMenu = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) {
      return;
    }

    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  const handleClick = () => {
    if (showContextMenu) {
      setShowContextMenu(false);
    }
  };

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
      case 'videos':
        return <Videos language={language} />;
      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <div
      className="relative w-full min-h-screen pb-16 md:pb-14"
      onContextMenu={handleContextMenu}
      onClick={handleClick}
    >
      <JarvisBackground />

      <div className="absolute inset-0 z-10 overflow-hidden">
        <div className="h-full overflow-y-auto p-3 sm:p-4 md:p-5">
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-3 md:gap-4 content-start pb-24">
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
            <DesktopIcon
              id="videos"
              icon="Clapperboard"
              label={translations[language].videos}
              onClick={() => openWindow('videos')}
            />
            <DesktopIcon
              id="spaceExe"
              imageSrc={icoHalcon}
              label="Space.exe"
              onClick={() => window.open('https://manl-space.netlify.app/', '_blank', 'noopener,noreferrer')}
            />
            <DesktopIcon
              id="3dExe"
              imageSrc={ico3d}
              label="3D.exe"
              onClick={() => window.open('https://manl3d.netlify.app/', '_blank', 'noopener,noreferrer')}
            />
            <DesktopIcon
              id="handGameExe"
              imageSrc={icoHandgame}
              label="HandGame.exe"
              onClick={() => window.open('https://handgamev2.netlify.app/', '_blank', 'noopener,noreferrer')}
            />
            <DesktopIcon
              id="redPillExe"
              imageSrc={icoRedpill}
              label="RedPill.exe"
              onClick={() => window.open('https://mantrix.netlify.app/', '_blank', 'noopener,noreferrer')}
            />
          </div>
        </div>

        {Object.values(windows).map(
          (windowData) =>
            windowData.isOpen && (
              <Window
                key={windowData.id}
                id={windowData.id}
                title={translations[language][windowData.id as keyof typeof translations[typeof language]]}
                isMinimized={windowData.isMinimized}
                isMaximized={windowData.isMaximized}
                zIndex={windowData.zIndex}
                position={windowData.position}
                size={windowData.size}
              >
                {getWindowContent(windowData.content)}
              </Window>
            )
        )}

        {showContextMenu && (
          <div
            className="absolute bg-white shadow-lg rounded-md overflow-hidden z-50"
            style={{ left: `${contextMenuPosition.x}px`, top: `${contextMenuPosition.y}px` }}
          >
            <ul className="py-2 text-sm">
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
