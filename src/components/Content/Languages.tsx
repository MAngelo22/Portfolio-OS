import { Globe } from 'lucide-react';
import { useState } from 'react';

interface LanguagesProps {
  language: 'es' | 'en';
}

interface Language {
  id: number;
  name: string;
  proficiency: string;
  level: number;
  flag: string;
  details: {
    speaking: number;
    writing: number;
    reading: number;
    listening: number;
  };
}

interface ProgrammingLanguage {
  name: string;
  proficiency: string;
  level: number;
  icon: string;
  years: number;
  projects: number;
}

interface Translations {
  title: string;
  speakingLanguages: string;
  programmingLanguagesTitle: string;
  description: string;
  programmingDescription: string;
  speaking: string;
  writing: string;
  reading: string;
  listening: string;
  years: string;
  projects: string;
  languages: Language[];
  programmingLanguages: ProgrammingLanguage[];
}

const Languages = ({ language }: LanguagesProps) => {
  const [activeTab, setActiveTab] = useState('languages');
  
  const translations: Record<'es' | 'en', Translations> = {
    es: {
      title: "Idiomas",
      speakingLanguages: "Idiomas Hablados",
      programmingLanguagesTitle: "Lenguajes de Programación",
      description: "Soy políglota con experiencia en múltiples idiomas. Aquí está mi nivel de competencia en diferentes idiomas:",
      programmingDescription: "Mi experiencia en lenguajes de programación incluye:",
      speaking: "Habla",
      writing: "Escritura",
      reading: "Lectura",
      listening: "Comprensión",
      years: "años",
      projects: "proyectos",
      languages: [
        {
          id: 1,
          name: "Español",
          proficiency: "Nativo",
          level: 100,
          flag: "🇪🇸",
          details: {
            speaking: 100,
            writing: 100,
            reading: 100,
            listening: 100
          }
        },
        {
          id: 2,
          name: "Inglés",
          proficiency: "Profesional - B1",
          level: 70,
          flag: "🇬🇧", // Using UK flag as common for B1 proficiency representation
          details: {
            speaking: 65,
            writing: 70,
            reading: 75,
            listening: 70
          }
        },
        {
          id: 3,
          name: "Portugués",
          proficiency: "Básico - A1",
          level: 15,
          flag: "🇵🇹", // Using Portugal flag
          details: {
            speaking: 10,
            writing: 5,
            reading: 15,
            listening: 20
          }
        }
      ],
      programmingLanguages: [
        {
          name: "JavaScript",
          proficiency: "Experto",
          level: 95,
          icon: "📜",
          years: 6,
          projects: 32
        },
        {
          name: "Python",
          proficiency: "Avanzado",
          level: 85,
          icon: "🐍",
          years: 4,
          projects: 18
        },
        {
          name: "TypeScript",
          proficiency: "Avanzado",
          level: 80,
          icon: "📘",
          years: 3,
          projects: 15
        },
        {
          name: "Java",
          proficiency: "Intermedio",
          level: 65,
          icon: "☕",
          years: 2,
          projects: 5
        },
        {
          name: "C#",
          proficiency: "Intermedio",
          level: 60,
          icon: "🎯",
          years: 2,
          projects: 3
        },
        {
          name: "PHP",
          proficiency: "Básico",
          level: 40,
          icon: "🐘",
          years: 1,
          projects: 2
        }
      ]
    },
    en: {
      title: "Languages",
      speakingLanguages: "Speaking Languages",
      programmingLanguagesTitle: "Programming Languages",
      description: "I'm a polyglot with experience in multiple languages. Here's my proficiency in different languages:",
      programmingDescription: "My expertise in programming languages includes:",
      speaking: "Speaking",
      writing: "Writing",
      reading: "Reading",
      listening: "Listening",
      years: "years",
      projects: "projects",
      languages: [
        {
          id: 1,
          name: "Spanish",
          proficiency: "Native",
          level: 100,
          flag: "🇪🇸",
          details: {
            speaking: 100,
            writing: 100,
            reading: 100,
            listening: 100
          }
        },
        {
          id: 2,
          name: "English",
          proficiency: "Professional - B1",
          level: 70,
          flag: "🇬🇧", // Using UK flag as common for B1 proficiency representation
          details: {
            speaking: 65,
            writing: 70,
            reading: 75,
            listening: 70
          }
        },
        {
          id: 3,
          name: "Portuguese",
          proficiency: "Basic - A1",
          level: 15,
          flag: "🇵🇹", // Using Portugal flag
          details: {
            speaking: 10,
            writing: 5,
            reading: 15,
            listening: 20
          }
        }
      ],
      programmingLanguages: [
        {
          name: "JavaScript",
          proficiency: "Expert",
          level: 95,
          icon: "📜",
          years: 6,
          projects: 32
        },
        {
          name: "Python",
          proficiency: "Advanced",
          level: 85,
          icon: "🐍",
          years: 4,
          projects: 18
        },
        {
          name: "TypeScript",
          proficiency: "Advanced",
          level: 80,
          icon: "📘",
          years: 3,
          projects: 15
        },
        {
          name: "Java",
          proficiency: "Intermediate",
          level: 65,
          icon: "☕",
          years: 2,
          projects: 5
        },
        {
          name: "C#",
          proficiency: "Intermediate",
          level: 60,
          icon: "🎯",
          years: 2,
          projects: 3
        },
        {
          name: "PHP",
          proficiency: "Basic",
          level: 40,
          icon: "🐘",
          years: 1,
          projects: 2
        }
      ]
    }
  };

  const t = translations[language];

  return (
    <div className="h-full flex flex-col">
      <div className="bg-blue-500 text-white p-4 rounded-t-lg">
        <h2 className="text-2xl font-bold flex items-center">
          <Globe className="mr-2 w-6 h-6" />
          {t.title}
        </h2>
      </div>
      
      <div className="p-4 overflow-y-auto flex flex-col">
        {/* Language Tabs */}
        <div className="flex mb-4">
          <button
            className={`px-4 py-2 ${activeTab === 'languages' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} rounded-tl-md rounded-bl-md transition-colors`}
            onClick={() => setActiveTab('languages')}
          >
            {t.speakingLanguages}
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'programming' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} rounded-tr-md rounded-br-md transition-colors`}
            onClick={() => setActiveTab('programming')}
          >
            {t.programmingLanguagesTitle}
          </button>
        </div>

        {/* Language Content */}
        <div className="flex-grow">
          {activeTab === 'languages' && (
            <div className="flex flex-col h-full">
              <p className="text-gray-600 mb-6">{t.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
                {t.languages.map((lang, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center">
                    <span className="text-4xl mr-4">{lang.flag}</span>
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{lang.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{lang.proficiency}</p>
                      
                      {/* Progress Bars (using estimated values) */}
                      <div className="space-y-1">
                        <div className="text-sm text-gray-600 flex justify-between">
                          <span>{t.speaking}</span>
                          <span>{lang.details.speaking}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${lang.details.speaking}%` }}></div>
                        </div>
                        <div className="text-sm text-gray-600 flex justify-between">
                          <span>{t.writing}</span>
                          <span>{lang.details.writing}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${lang.details.writing}%` }}></div>
                        </div>
                        <div className="text-sm text-gray-600 flex justify-between">
                          <span>{t.reading}</span>
                          <span>{lang.details.reading}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${lang.details.reading}%` }}></div>
                        </div>
                        <div className="text-sm text-gray-600 flex justify-between">
                          <span>{t.listening}</span>
                          <span>{lang.details.listening}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${lang.details.listening}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'programming' && (
            <div className="flex flex-col h-full">
              <p className="text-gray-600 mb-6">{t.programmingDescription}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
                {t.programmingLanguages.map((lang, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center">
                    {/* Using simple text icon for now */}
                    <span className="text-4xl mr-4">{lang.icon}</span> 
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{lang.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{lang.proficiency}</p>
                      
                      {/* Programming Language Details */}
                      <div className="text-sm text-gray-600">
                        <p>{lang.years} {t.years} - {lang.projects} {t.projects}</p>
                      </div>

                       {/* Progress Bar */}
                      <div className="space-y-1 mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${lang.level}%` }}></div>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Languages;