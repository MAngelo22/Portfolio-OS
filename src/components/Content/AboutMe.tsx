import React, { ElementType } from 'react';
import { Mail, MapPin, Calendar, PhoneCall, GlobeIcon, Plus } from 'lucide-react';
import * as Icons from 'lucide-react';
import perfilImage from './perfil.webp';

interface AboutMeProps {
  language: 'es' | 'en';
}

interface AdditionalDataItem {
  id: number;
  icon: string;
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
      title: 'Sobre Mi',
      role: 'Desarrollador Full Stack',
      biography: 'Biografia',
      biographyText1:
        'Soy un desarrollador Full Stack enfocado en crear aplicaciones web claras, rapidas y mantenibles. Trabajo principalmente con JavaScript, TypeScript, React, Node.js y WordPress.',
      biographyText2:
        'Me gusta resolver problemas complejos con soluciones simples, mejorar la experiencia de usuario y mantener una evolucion constante de producto.',
      skills: 'Habilidades',
      interests: 'Intereses',
      interestsList: ['Desarrollo Web', 'Diseno UI/UX', 'IA aplicada', 'Open Source', 'Fotografia', 'Senderismo'],
      additionalDataTitle: 'Datos Adicionales',
      additionalDataDescription: 'Experiencia y habilidades complementarias',
      additionalDataList: [
        {
          id: 1,
          icon: 'Award',
          title: 'Intento examen Bombero (Madrid)',
          year: '2018',
          description: 'Preparacion y participacion en proceso de acceso.',
        },
        {
          id: 2,
          icon: 'Cross',
          title: 'Socorrista',
          year: '2020',
          description: 'Certificacion en socorrismo y rescate acuatico.',
        },
        {
          id: 3,
          icon: 'Cross',
          title: 'Primeros Auxilios',
          year: '2020',
          description: 'Asistencia y protocolos de emergencia.',
        },
        {
          id: 4,
          icon: 'Award',
          title: 'Formacion en seguridad privada',
          year: '2018',
          description: 'Base operativa como vigilante y escolta.',
        },
        {
          id: 5,
          icon: 'Car',
          title: 'Carnet de conducir (B)',
          year: '2017',
          description: 'Permiso vigente y vehiculo propio.',
        },
      ],
    },
    en: {
      title: 'About Me',
      role: 'Full Stack Developer',
      biography: 'Biography',
      biographyText1:
        'I am a Full Stack developer focused on building clear, fast, and maintainable web applications. I mainly work with JavaScript, TypeScript, React, Node.js, and WordPress.',
      biographyText2:
        'I enjoy solving complex problems with simple solutions, improving UX, and driving continuous product improvement.',
      skills: 'Skills',
      interests: 'Interests',
      interestsList: ['Web Development', 'UI/UX Design', 'Applied AI', 'Open Source', 'Photography', 'Hiking'],
      additionalDataTitle: 'Additional Information',
      additionalDataDescription: 'Complementary experience and skills',
      additionalDataList: [
        {
          id: 1,
          icon: 'Award',
          title: 'Firefighter exam attempt (Madrid)',
          year: '2018',
          description: 'Preparation and participation in access process.',
        },
        {
          id: 2,
          icon: 'Cross',
          title: 'Lifeguard',
          year: '2020',
          description: 'Water rescue and lifeguarding certification.',
        },
        {
          id: 3,
          icon: 'Cross',
          title: 'First Aid',
          year: '2020',
          description: 'Emergency assistance and procedures.',
        },
        {
          id: 4,
          icon: 'Award',
          title: 'Private security training',
          year: '2018',
          description: 'Operational foundation as guard/bodyguard.',
        },
        {
          id: 5,
          icon: 'Car',
          title: "Driver's license (B)",
          year: '2017',
          description: 'Valid license and own vehicle.',
        },
      ],
    },
  };

  const t = translations[language];

  const IconComponent = (iconName: string) => {
    const LucideIcon = Icons[iconName as keyof typeof Icons] as ElementType;
    return LucideIcon ? <LucideIcon size={18} className="w-4 h-4 text-blue-300" /> : null;
  };

  return (
    <div className="h-full min-h-0 flex flex-col">
      <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg">
        <h2 className="text-xl md:text-2xl font-bold">{t.title}</h2>
      </div>

      <div className="flex-1 min-h-0 p-3 md:p-4 overflow-y-auto">
        <div className="grid grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)] gap-4 h-full">
          <section className="bg-slate-800/90 rounded-lg border border-slate-700 p-4">
            <div className="flex xl:flex-col items-center xl:items-start gap-4">
              <div className="w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-full border-2 border-blue-400 shrink-0">
                <img src={perfilImage} alt="Miguel Angel" className="w-full h-full object-cover" />
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold text-white">Miguel Angel</h3>
                <p className="text-blue-300 text-sm md:text-base">{t.role}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2.5 text-sm text-slate-200">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-blue-300" />
                <span className="break-all">miguelangel.developer@gmail.com</span>
              </div>
              <div className="flex items-start gap-2">
                <PhoneCall className="w-4 h-4 mt-0.5 text-blue-300" />
                <span>+34 XXX XXX XXX</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-blue-300" />
                <span>Espana</span>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 mt-0.5 text-blue-300" />
                <span>1996</span>
              </div>
              <div className="flex items-start gap-2">
                <GlobeIcon className="w-4 h-4 mt-0.5 text-blue-300" />
                <span className="break-all">manl3d.netlify.app</span>
              </div>
            </div>
          </section>

          <section className="bg-slate-800/90 rounded-lg border border-slate-700 p-4 overflow-hidden">
            <div className="space-y-5">
              <div>
                <h4 className="text-lg font-semibold text-white border-b border-blue-300/40 pb-1.5 mb-2">{t.biography}</h4>
                <p className="text-sm text-slate-200 leading-relaxed">{t.biographyText1}</p>
                <p className="text-sm text-slate-200 leading-relaxed mt-2">{t.biographyText2}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white border-b border-blue-300/40 pb-1.5 mb-3">{t.skills}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <SkillBar name="JavaScript" percentage={90} />
                  <SkillBar name="React" percentage={85} />
                  <SkillBar name="Node.js" percentage={80} />
                  <SkillBar name="TypeScript" percentage={75} />
                  <SkillBar name="HTML/CSS" percentage={95} />
                  <SkillBar name="SQL" percentage={78} />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white border-b border-blue-300/40 pb-1.5 mb-3">{t.interests}</h4>
                <div className="flex flex-wrap gap-2">
                  {t.interestsList.map((interest) => (
                    <span key={interest} className="px-2.5 py-1 bg-blue-500/20 text-blue-200 rounded-full text-xs sm:text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Plus className="w-4 h-4 text-blue-300" />
                  <h4 className="text-lg font-semibold text-white">{t.additionalDataTitle}</h4>
                </div>
                <p className="text-sm text-slate-300 mb-3">{t.additionalDataDescription}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {t.additionalDataList.map((item) => (
                    <article key={item.id} className="bg-slate-700/70 border border-slate-600 rounded-md p-2.5">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5">{IconComponent(item.icon)}</div>
                        <div>
                          <h5 className="text-sm font-semibold text-white">{item.title}</h5>
                          <p className="text-xs text-slate-200">{item.description}</p>
                          <div className="text-xs text-slate-400 mt-1">{item.year}</div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
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
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs sm:text-sm text-slate-200">{name}</span>
        <span className="text-xs sm:text-sm text-slate-300">{percentage}%</span>
      </div>
      <div className="w-full bg-slate-600 rounded-full h-2">
        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

export default AboutMe;
