import { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  tech: string;
  image: string;
  demoUrl: string;
  codeUrl: string;
}

interface ProjectsProps {
  language: 'es' | 'en';
}

const Projects = ({ language }: ProjectsProps) => {
  const [currentProject, setCurrentProject] = useState(0);

  const projects: Project[] = [
    {
      name: '3D Portfolio',
      description: 'Portfolio interactivo 3D mostrando proyectos en una galería virtual usando Three.js y React Three Fiber',
      tech: 'React, Three.js, TypeScript, Blender',
      image: 'https://static.wixstatic.com/media/c6eee4_68edbd0187ae496da8a16ce561bcb1ca~mv2.webp',
      demoUrl: 'https://manl3d.netlify.app',
      codeUrl: ''
    },
    {
      name: 'HandGame',
      description: 'Sitio web diseñado para que puedas jugar interactivamente juegos clásicos contra la máquina',
      tech: 'HTML, JS, CSS',
      image: 'https://static.wixstatic.com/media/c6eee4_e12c4b309eef48a093129e3328ef6e9f~mv2.webp',
      demoUrl: 'https://handgamev2.netlify.app/home',
      codeUrl: 'https://github.com/MAngelo22/HANDgame.git'
    },
    {
      name: 'Motenimiento',
      description: 'Sitio web diseñado para generar datos de mantenimiento de motocicletas según el modelo',
      tech: 'HTML, JS, CSS',
      image: 'https://static.wixstatic.com/media/c6eee4_97da5bfb6c3c43bd9936b427b4eb1211~mv2.png',
      demoUrl: 'https://www.youtube.com/shorts/6ughobPjAeI',
      codeUrl: 'https://github.com/MAngelo22/Motenimiento.git'
    },
    {
      name: 'Redel',
      description: 'Sitio web diseñado para reservar pistas de pádel en una urbanización',
      tech: 'HTML, JS, CSS',
      image: 'https://static.wixstatic.com/media/c6eee4_852cc341de164daf8dfd9f7eabaac264~mv2.webp',
      demoUrl: 'https://www.youtube.com/watch?v=BuNRfIk7z44',
      codeUrl: 'https://github.com/MAngelo22/Redel.git'
    },
    {
      name: 'QRescato',
      description: 'Aplicación en Android, a través de la cual tu dispositivo se geolocalizaba para encontrar el protector',
      tech: 'Android, Java, API Google Maps, Android Studio',
      image: 'https://static.wixstatic.com/media/c6eee4_f2e8d28d94084b39b27261e2dad1f293~mv2.webp',
      demoUrl: 'https://www.youtube.com/watch?v=6B9bn7RxE7k',
      codeUrl: 'https://github.com/MAngelo22/QRastreo-TFG.git'
    },
    {
      name: 'Juego 3D',
      description: 'Juego recreando el ITT donde estudié, en primera persona',
      tech: 'Unity, Java, C#, PhotoShop',
      image: 'https://static.wixstatic.com/media/c6eee4_d9e84b3abbf344faa343a7d7d897d419~mv2.png',
      demoUrl: 'https://www.youtube.com/watch?v=E7xc8kuUAeQ&t=34s',
      codeUrl: ''
    },
    {
      name: 'Juego 2D',
      description: "Juego basado en 'The Avengers', rigging de personajes desde assets estáticos",
      tech: 'Unity, Java, C#, PhotoShop',
      image: 'https://static.wixstatic.com/media/c6eee4_0328f5b5909f435fbedeeb28ecdd952a~mv2.png',
      demoUrl: 'https://www.youtube.com/watch?v=r-VIGDOk2UU&t=2s',
      codeUrl: ''
    },
    {
      name: 'Cronómetro Tabata',
      description: 'Sitio web para entrenar calistenia con un cronómetro tabata gratuito',
      tech: 'HTML, JS, CSS',
      image: 'https://static.wixstatic.com/media/c6eee4_e41584d954fb4aff93e9ecf1c5f17b18~mv2.jpg',
      demoUrl: 'https://proyectotamer.netlify.app/',
      codeUrl: 'https://github.com/MAngelo22/Proyecto-Tamers.git'
    }
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h2 className="text-2xl font-bold">{language === 'es' ? 'Proyectos' : 'Projects'}</h2>
      </div>
      
      <div className="flex-grow p-4 md:p-6 overflow-hidden">
        <div className="relative h-full flex flex-col">
          {/* Project Image */}
          <div className="relative h-48 md:h-64 mb-4 rounded-lg overflow-hidden">
            <img 
              src={projects[currentProject].image} 
              alt={projects[currentProject].name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Project Info */}
          <div className="space-y-3 md:space-y-4 flex-grow">
            <h3 className="text-xl md:text-2xl font-bold text-white">{projects[currentProject].name}</h3>
            <p className="text-gray-200 text-sm md:text-base">{projects[currentProject].description}</p>
            <p className="text-blue-300 font-medium text-sm md:text-base">{projects[currentProject].tech}</p>
            
            {/* Project Links */}
            <div className="flex flex-wrap gap-3 md:gap-4 mt-4">
              {projects[currentProject].demoUrl && (
                <a 
                  href={projects[currentProject].demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors text-sm md:text-base"
                >
                  <ExternalLink size={18} className="md:w-5 md:h-5" />
                  {language === 'es' ? 'Demo' : 'Demo'}
                </a>
              )}
              {projects[currentProject].codeUrl && (
                <a 
                  href={projects[currentProject].codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors text-sm md:text-base"
                >
                  <Github size={18} className="md:w-5 md:h-5" />
                  {language === 'es' ? 'Código' : 'Code'}
                </a>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-4 md:mt-6">
            <button
              onClick={prevProject}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-400 transition-colors"
              aria-label={language === 'es' ? 'Proyecto anterior' : 'Previous project'}
            >
              <ChevronLeft size={20} className="md:w-6 md:h-6" />
            </button>
            <span className="text-gray-200 font-medium text-sm md:text-base">
              {currentProject + 1} / {projects.length}
            </span>
            <button
              onClick={nextProject}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-400 transition-colors"
              aria-label={language === 'es' ? 'Siguiente proyecto' : 'Next project'}
            >
              <ChevronRight size={20} className="md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;