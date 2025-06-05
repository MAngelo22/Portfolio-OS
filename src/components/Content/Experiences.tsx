import { Calendar, MapPin, Briefcase } from 'lucide-react';

interface ExperiencesProps {
  language: 'es' | 'en';
}

interface Experience {
  id: number;
  role: string;
  company: string;
  location?: string; // Making location optional as it's not in source data
  period: string;
  description: string;
  achievements: string[]; // Using achievements for technologies
}

interface Translations {
  title: string;
  keyAchievements: string;
  experiences: Experience[];
}

const Experiences = ({ language }: ExperiencesProps) => {
  const translations: Record<'es' | 'en', Translations> = {
    es: {
      title: "Experiencia Profesional",
      keyAchievements: "Tecnologías Utilizadas", // Changed label to reflect content
      experiences: [
        {
          id: 1,
          role: "Desarrollador Web",
          company: "Doers DF",
          period: "Sep 2024 - Nov 2024",
          description: "Posición de Desarrollador Junior de Páginas Web.",
          achievements: [
            "React",
            "Node.js",
            "Wordpress",
            "Python",
            "Typescript",
            "Blender",
          ],
        },
        {
          id: 2,
          role: "Vigilante de Seguridad",
          company: "Prosegur & Eulen",
          period: "May 2021 - Sep 2024",
          description:
            "Vigilante de seguridad en centro de control de alarmas Prosegur y para el ayuntamiento de Madrid.",
          achievements: ["Windows 10", "Android", "Office 365"],
        },
        {
          id: 3,
          role: "Soporte SalesForce",
          company: "Telefónica Global Technlogy",
          period: "Oct 2020 - Feb 2021",
          description:
            "Administrador y Desarrollador de Salesforce en prácticas, Alta y Baja de usuarios, cambios de permisos a usuarios, modificación de clientes. Reuniones con clientes para modificaciones en aplicaciones de versiones Lightning de Salesforce. Aprendizaje de cómo se visualiza y carga el código a través de los diferentes niveles de escalabilidad del código.",
          achievements: ["Salesforce", "Windows 10", "Teams"],
        },
        {
          id: 4,
          role: "Técnico de Soporte",
          company: "Sage",
          period: "Ene 2017 - Jun 2017",
          description:
            "Clonación de sistemas, testing de hardware y software, solución de problemas de Office, helpdesk.",
          achievements: ["Cloning", "Office 365", "helpdesk", "Testing"],
        },
      ],
    },
    en: {
      title: "Professional Experience",
      keyAchievements: "Technologies Used", // Changed label to reflect content
      experiences: [
        {
          id: 1,
          role: "Web Developer",
          company: "Doers DF",
          period: "Sep 2024 - Nov 2024",
          description: "Junior Web Page Developer Position.",
          achievements: [
            "React",
            "Node.js",
            "Wordpress",
            "Python",
            "Typescript",
            "Blender",
          ],
        },
        {
          id: 2,
          role: "Security Guard",
          company: "Prosegur & Eulen",
          period: "May 2021 - Sep 2024",
          description:
            "Security guard in prosegur alarm control center and for the Madrid city council.",
          achievements: ["Windows 10", "Android", "Office 365"],
        },
        {
          id: 3,
          role: "SalesForce Support",
          company: "Telefónica Global Technlogy",
          period: "Oct 2020 - Feb 2021",
          description:
            "Salesforce Administrator and Developer position in practice, Uploading and Unsubscribing of users, changes to user permissions, modification of clients. Meetings with clients for modifications in applications of Salesforce Lightning versions. Learning how code is displayed and loaded through the different levels of code scaling.",
          achievements: ["Salesforce", "Windows 10", "Teams"],
        },
        {
          id: 4,
          role: "Support Technician",
          company: "Sage",
          period: "Jan 2017 - Jun 2017",
          description:
            "System cloning, hardware and software testing, Office problem solving, helpdesk.",
          achievements: ["Cloning", "Office 365", "helpdesk", "Testing"],
        },
      ],
    },
  };

  const t = translations[language];

  return (
    <div className="h-full flex flex-col">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h2 className="text-2xl font-bold">{t.title}</h2>
      </div>
      
      <div className="p-4 space-y-6 overflow-y-auto">
        {t.experiences.map((exp, index) => (
          <div key={index} className="bg-white/5 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-2">{exp.role}</h3>
            <p className="text-blue-300 font-medium mb-2">{exp.company}</p>
            <p className="text-gray-200 mb-2">{exp.period}</p>
            <p className="text-gray-200">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experiences;