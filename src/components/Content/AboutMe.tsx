import { User, Mail, MapPin, Calendar, PhoneCall, GlobeIcon, Award, Cross, Car, Plus } from 'lucide-react';
import React, { ElementType } from 'react';
import * as Icons from 'lucide-react'; // Import Icons object
import perfilImage from './perfil.webp';

interface AboutMeProps {
  language: 'es' | 'en';
}

interface AdditionalDataItem {
  id: number;
  icon: string; // Using string to represent icon name from LucideReact
  title: string;
  year: string;
  description: string;
}

interface Translations {
  title: string;
  role: string;
  biography: string;
  biographyText1: string;
  biographyText2: string;
  skills: string;
  interests: string;
  interestsList: string[];
  additionalDataTitle: string;
  additionalDataDescription: string;
  additionalDataList: AdditionalDataItem[];
}

const AboutMe = ({ language }: AboutMeProps) => {
  const translations: Record<'es' | 'en', Translations> = {
    es: {
      title: 'Sobre Mí',
      role: 'Desarrollador Full Stack',
      biography: 'Biografía',
      biographyText1: 'Soy un Desarrollador Full Stack apasionado con más de 5 años de experiencia construyendo aplicaciones web. Me especializo en JavaScript, React, Node.js y tecnologías web modernas. Disfruto resolviendo problemas complejos y creando experiencias de usuario intuitivas y dinámicas.',
      biographyText2: 'Cuando no estoy programando, me encontrarás haciendo senderismo, leyendo ciencia ficción o experimentando con nuevas recetas de cocina. Creo en el aprendizaje continuo y en expandir los límites de lo posible con el código.',
      skills: 'Habilidades',
      interests: 'Intereses',
      interestsList: [
        'Desarrollo Web',
        'Diseño UI/UX',
        'Inteligencia Artificial',
        'Código Abierto',
        'Fotografía',
        'Senderismo'
      ],
      additionalDataTitle: "Datos Adicionales",
      additionalDataDescription: "Experiencia y habilidades adicionales",
      additionalDataList: [
        {
          id: 1,
          icon: "Award",
          title: "Intento Examen Bombero, Madrid",
          year: "2018",
          description: "Intento de examen de bombero para la Comunidad de Madrid",
        },
        {
          id: 2,
          icon: "Cross",
          title: "Socorrista",
          year: "2020",
          description: "Certificado en socorrismo y rescate acuático",
        },
        {
          id: 3,
          icon: "Cross",
          title: "Primeros Auxilios",
          year: "2020",
          description: "Asistencia de primeros auxilios",
        },
        {
          id: 4,
          icon: "Award",
          title: "Formación en Seguridad Privada",
          year: "2018",
          description: "Formación como vigilante de seguridad y escolta privado",
        },
        {
          id: 5,
          icon: "Car",
          title: "Carnet de Conducir (B)",
          year: "2017",
          description: "Permiso de conducción válido y vehículo propio",
        },
      ],
    },
    en: {
      title: 'About Me',
      role: 'Full Stack Developer',
      biography: 'Biography',
      biographyText1: "I'm a passionate Full Stack Developer with over 5 years of experience building web applications. I specialize in JavaScript, React, Node.js, and modern web technologies. I enjoy solving complex problems and creating intuitive, dynamic user experiences.",
      biographyText2: "When I'm not coding, you'll find me hiking, reading science fiction, or experimenting with new cooking recipes. I believe in continuous learning and pushing the boundaries of what's possible with code.",
      skills: 'Skills',
      interests: 'Interests',
      interestsList: [
        'Web Development',
        'UI/UX Design',
        'Artificial Intelligence',
        'Open Source',
        'Photography',
        'Hiking'
      ],
       additionalDataTitle: "Additional Information",
       additionalDataDescription: "Additional experience and skills",
       additionalDataList: [
        {
          id: 1,
          icon: "Award",
          title: "Firefighter Exam Attempt, Madrid",
          year: "2018",
          description: "Attempted firefighter exam for the Community of Madrid",
        },
        {
          id: 2,
          icon: "Cross",
          title: "Lifeguard",
          year: "2020",
          description: "Certified in lifeguarding and water rescue",
        },
        {
          id: 3,
          icon: "Cross",
          title: "First Aid",
          year: "2020",
          description: "First aid assistance",
        },
        {
          id: 4,
          icon: "Award",
          title: "Private Security Training",
          year: "2018",
          description: "Training as a private security guard and bodyguard",
        },
        {
          id: 5,
          icon: "Car",
          title: "Driver's License (B)",
          year: "2017",
          description: "Valid driver's license and own vehicle",
        },
       ],
    }
  };

   const t = translations[language];

  const IconComponent = (iconName: string) => {
    const LucideIcon = Icons[iconName as keyof typeof Icons] as ElementType;
    return LucideIcon ? <LucideIcon size={24} className="w-6 h-6 text-blue-500" /> : null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <div className="bg-blue-500 text-white p-2 md:p-4 rounded-t-lg sticky top-0 z-10">
        <h2 className="text-xl md:text-2xl font-bold">{t.title}</h2>
      </div>
      
      <div className="flex flex-col md:flex-row gap-3 md:gap-6 p-2 md:p-4 flex-grow overflow-y-auto pb-16">
        {/* Left Column (Profile Info) */}
        <div className="flex flex-col items-center w-full md:w-1/3 lg:w-1/4 bg-gray-800 p-2 md:p-4 rounded-lg">
          <div className="w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-full border-2 md:border-4 border-blue-500 mb-2 md:mb-4">
            <img 
              src={perfilImage}
              alt="Miguel Ángel" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold text-white font-sans">Miguel Ángel</h3>
          <p className="text-blue-300 font-semibold text-base md:text-lg">{t.role}</p>
          
          <div className="mt-2 md:mt-4 w-full space-y-2 md:space-y-3 text-gray-200">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 md:w-5 md:h-5 text-blue-300 flex-shrink-0" />
              <span className="text-xs md:text-sm font-medium break-words">miguelangel.developer@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <PhoneCall className="w-4 h-4 md:w-5 md:h-5 text-blue-300 flex-shrink-0" />
              <span className="text-xs md:text-sm font-medium">+34 XXX XXX XXX</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-300 flex-shrink-0" />
              <span className="text-xs md:text-sm font-medium">España</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-blue-300 flex-shrink-0" />
              <span className="text-xs md:text-sm font-medium">1996</span>
            </div>
            <div className="flex items-center space-x-2">
              <GlobeIcon className="w-4 h-4 md:w-5 md:h-5 text-blue-300 flex-shrink-0" />
              <span className="text-xs md:text-sm font-medium">manl3d.netlify.app</span>
            </div>
          </div>
        </div>
        
        {/* Right Column (Biography, Skills, Interests, Additional Data) */}
        <div className="flex-grow md:w-2/3 lg:w-3/4 bg-gray-800 p-2 md:p-4 rounded-lg">
          {/* Biography Section */}
          <div className="mb-4 md:mb-6">
            <h4 className="text-lg md:text-xl font-bold text-white border-b-2 border-blue-300 pb-1 md:pb-2 mb-2 md:mb-3">
              {t.biography}
            </h4>
            <p className="text-gray-200 text-xs md:text-sm leading-relaxed">
              {t.biographyText1}
            </p>
            <p className="mt-2 md:mt-3 text-gray-200 text-xs md:text-sm leading-relaxed">
              {t.biographyText2}
            </p>
          </div>
          
          {/* Skills Section */}
          <div className="mb-4 md:mb-6">
            <h4 className="text-lg md:text-xl font-bold text-white border-b-2 border-blue-300 pb-1 md:pb-2 mb-2 md:mb-4">
              {t.skills}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
              <SkillBar name="JavaScript" percentage={90} />
              <SkillBar name="React" percentage={85} />
              <SkillBar name="Node.js" percentage={80} />
              <SkillBar name="TypeScript" percentage={75} />
              <SkillBar name="HTML/CSS" percentage={95} />
              <SkillBar name="MongoDB" percentage={70} />
            </div>
          </div>
          
          {/* Interests Section */}
          <div className="mb-4 md:mb-6">
            <h4 className="text-lg md:text-xl font-bold text-white border-b-2 border-blue-300 pb-1 md:pb-2 mb-2 md:mb-3">
              {t.interests}
            </h4>
            <div className="flex flex-wrap gap-1.5 md:gap-2 mt-2 md:mt-3">
              {t.interestsList.map((interest, index) => (
                <span key={index} className="px-2 py-1 md:px-3 md:py-1.5 bg-blue-500/20 text-blue-300 rounded-full text-xs md:text-sm font-medium">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Additional Data Section */}
          <div>
            <div className="flex items-center mb-2 md:mb-4">
              <Plus className="w-5 h-5 md:w-6 md:h-6 text-blue-500 mr-2 md:mr-3 flex-shrink-0" />
              <h4 className="text-base md:text-lg font-semibold text-white">
                {t.additionalDataTitle}
              </h4>
            </div>
            <p className="text-gray-300 mb-2 md:mb-4 text-xs md:text-sm">
              {t.additionalDataDescription}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
              {t.additionalDataList.map((item) => (
                <div key={item.id} className="bg-gray-700 p-2 md:p-4 rounded-lg shadow-sm border border-gray-600 flex items-start">
                  <div className="flex-shrink-0 mt-1">
                     {IconComponent(item.icon)}
                  </div>
                  
                  <div className="ml-2 md:ml-4">
                    <h5 className="text-xs md:text-sm font-bold text-white">{item.title}</h5>
                    <p className="text-gray-300 text-xs md:text-sm mb-1">{item.description}</p>
                     <div className="flex items-center text-gray-400 text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                       {item.year}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SkillBarProps {
  name: string;
  percentage: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, percentage }) => {
  return (
    <div className="mb-1 md:mb-2">
      <div className="flex justify-between mb-0.5 md:mb-1">
        <span className="text-xs md:text-sm font-medium text-gray-300">{name}</span>
        <span className="text-xs md:text-sm font-medium text-gray-300">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-600 rounded-full h-1.5 md:h-2">
        <div 
          className="bg-blue-600 h-1.5 md:h-2 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default AboutMe;