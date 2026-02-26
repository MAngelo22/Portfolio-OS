import { Briefcase, Calendar, MapPin } from 'lucide-react';

interface ExperiencesProps {
  language: 'es' | 'en';
}

interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
}

interface Translations {
  title: string;
  keyAchievements: string;
  experiences: Experience[];
}

const translations: Record<'es' | 'en', Translations> = {
  es: {
    title: 'Experiencia Profesional',
    keyAchievements: 'Competencias y tecnologías',
    experiences: [
      {
        id: 1,
        role: 'IT Specialist',
        company: 'Mindway',
        location: 'Híbrido',
        period: 'Oct 2025 - Actualidad',
        description:
          'Desarrollo y mantenimiento web en WordPress (PHP, SQL, HTML, CSS, JavaScript), maquetación UX/UI, integración de formularios con CRM, soporte técnico interno en entorno Apple, asistencia en eventos y apoyo en infraestructura IT y transformación digital.',
        achievements: ['PHP', 'SQL', 'WordPress', 'UX/UI', 'Soporte técnico', 'CRM'],
      },
      {
        id: 2,
        role: 'IT Specialist',
        company: 'Elle Education',
        location: 'Madrid, Comunidad de Madrid, España · Híbrido',
        period: 'Oct 2025 - Actualidad',
        description:
          'Desarrollo y mantenimiento web en WordPress (PHP, SQL, HTML, CSS, JavaScript), maquetación UX/UI, integración de formularios con CRM, soporte técnico interno en entorno Apple, asistencia en eventos y apoyo en infraestructura IT y transformación digital.',
        achievements: ['PHP', 'SQL', 'WordPress', 'UX/UI', 'Soporte técnico', 'CRM'],
      },
      {
        id: 3,
        role: 'Técnico de soporte de TI',
        company: 'Ayesa',
        location: 'Madrid, Comunidad de Madrid, España · Híbrido',
        period: 'Feb 2025 - Oct 2025',
        description:
          'Soporte a sedes del sector público y sanitario, gestión de solicitudes, análisis y resolución/escalado de incidencias (FARO/correo), elaboración de informes de servicio y análisis de datos para la resolución de problemas tras despliegues y mantenimientos.',
        achievements: ['Soporte técnico', 'Servicios de TI', 'Gestión de incidencias', 'FARO', 'Reporting'],
      },
      {
        id: 4,
        role: 'ZSIS en CGE Ancert',
        company: 'Zelenza',
        location: 'Madrid, Comunidad de Madrid, España · Híbrido',
        period: 'Dic 2024 - Feb 2025',
        description:
          'Gestión de infraestructura de red, mantenimiento e implementación de soluciones, ticketing y escalado, configuración de VPN e IP, documentación técnica y creación de un hub unificado en HTML, CSS y JavaScript para manuales y credenciales.',
        achievements: ['Cisco', 'VPN', 'IP', 'Ticketing', 'Telnet', 'HTML/CSS/JS'],
      },
      {
        id: 5,
        role: 'Desarrollador web',
        company: 'Doers DF',
        location: 'Madrid, Comunidad de Madrid, España · Híbrido',
        period: 'Sep 2024 - Nov 2024',
        description:
          'Creación de webs en WordPress desde cero, desarrollo de plugins personalizados (ThreeJS/PHP), mantenimiento SQL, integración de APIs, optimización UX/UI, SEO, soporte WooCommerce, plugins para Elementor y creación de entornos 3D interactivos.',
        achievements: ['WordPress', 'ThreeJS', 'PHP', 'SQL', 'APIs', 'WooCommerce', 'Elementor', 'SEO'],
      },
    ],
  },
  en: {
    title: 'Professional Experience',
    keyAchievements: 'Skills and technologies',
    experiences: [
      {
        id: 1,
        role: 'IT Specialist',
        company: 'Mindway',
        location: 'Hybrid',
        period: 'Oct 2025 - Present',
        description:
          'Web development and maintenance in WordPress (PHP, SQL, HTML, CSS, JavaScript), UX/UI layout work, CRM form integrations, internal Apple-focused support, event support, and daily IT infrastructure and digital transformation tasks.',
        achievements: ['PHP', 'SQL', 'WordPress', 'UX/UI', 'Technical Support', 'CRM'],
      },
      {
        id: 2,
        role: 'IT Specialist',
        company: 'Elle Education',
        location: 'Madrid, Spain · Hybrid',
        period: 'Oct 2025 - Present',
        description:
          'Web development and maintenance in WordPress (PHP, SQL, HTML, CSS, JavaScript), UX/UI layout work, CRM form integrations, internal Apple-focused support, event support, and daily IT infrastructure and digital transformation tasks.',
        achievements: ['PHP', 'SQL', 'WordPress', 'UX/UI', 'Technical Support', 'CRM'],
      },
      {
        id: 3,
        role: 'IT Support Technician',
        company: 'Ayesa',
        location: 'Madrid, Spain · Hybrid',
        period: 'Feb 2025 - Oct 2025',
        description:
          'Support for public administration and healthcare sites, request handling, incident triage and escalation (FARO/email), service reporting, and data analysis to troubleshoot post-deployment and maintenance issues.',
        achievements: ['Technical Support', 'IT Services', 'Incident Management', 'FARO', 'Reporting'],
      },
      {
        id: 4,
        role: 'ZSIS at CGE Ancert',
        company: 'Zelenza',
        location: 'Madrid, Spain · Hybrid',
        period: 'Dec 2024 - Feb 2025',
        description:
          'Network infrastructure operations, maintenance and deployment of network solutions, ticketing and escalation, VPN/IP configuration, technical documentation, and development of a unified HTML/CSS/JS hub for manuals and credentials.',
        achievements: ['Cisco', 'VPN', 'IP', 'Ticketing', 'Telnet', 'HTML/CSS/JS'],
      },
      {
        id: 5,
        role: 'Web Developer',
        company: 'Doers DF',
        location: 'Madrid, Spain · Hybrid',
        period: 'Sep 2024 - Nov 2024',
        description:
          'Built WordPress websites from scratch, developed custom plugins (ThreeJS/PHP), handled SQL maintenance, API integrations, UX/UI improvements, SEO, WooCommerce setup, Elementor plugin work, and interactive 3D environments.',
        achievements: ['WordPress', 'ThreeJS', 'PHP', 'SQL', 'APIs', 'WooCommerce', 'Elementor', 'SEO'],
      },
    ],
  },
};

const Experiences = ({ language }: ExperiencesProps) => {
  const t = translations[language];

  return (
    <div className="h-full flex flex-col">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Briefcase className="w-6 h-6" />
          {t.title}
        </h2>
      </div>

      <div className="p-4 space-y-6 overflow-y-auto">
        {t.experiences.map((exp) => (
          <div key={exp.id} className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
            <p className="text-blue-300 font-medium mb-2">{exp.company}</p>

            <div className="flex flex-wrap gap-4 mb-2 text-gray-300 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {exp.period}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {exp.location}
              </span>
            </div>

            <p className="text-gray-200 mb-3">{exp.description}</p>

            <p className="text-blue-200 text-sm mb-2">{t.keyAchievements}</p>
            <div className="flex flex-wrap gap-2">
              {exp.achievements.map((item) => (
                <span
                  key={`${exp.id}-${item}`}
                  className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-100 text-xs border border-blue-400/20"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experiences;
