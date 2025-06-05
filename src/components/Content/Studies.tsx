import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';

interface StudiesProps {
  language: 'es' | 'en';
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  description: string;
  courses?: string[]; // Make courses optional if not always present
}

interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  expires: string;
  credentialId: string;
}

interface Translations {
  title: string;
  formalEducation: string;
  professionalCertifications: string;
  continuingEducation: string;
  continuingEducationDescription: string;
  issued: string;
  expires: string;
  credentialId: string;
  keyCourses: string;
  gpa: string;
  educations: Education[];
  certifications: Certification[];
  recentAreas: string[];
}

const Studies = ({ language }: StudiesProps) => {
  const translations: Record<'es' | 'en', Translations> = {
    es: {
      title: "Educación y Certificaciones",
      formalEducation: "Educación Formal",
      professionalCertifications: "Certificaciones Profesionales",
      continuingEducation: "Educación Continua",
      continuingEducationDescription: "Estoy comprometido con el aprendizaje continuo y regularmente tomo cursos para mantenerme al día con las últimas tecnologías y mejores prácticas de la industria. Áreas recientes de estudio incluyen:",
      issued: "Emitido:",
      expires: "Expira:",
      credentialId: "ID de Credencial:",
      keyCourses: "Cursos Principales:",
      gpa: "Promedio:",
      educations: [
        {
          id: 1,
          degree: "Desarrollo de Aplicaciones Web (DAW)",
          institution: "UNIR",
          period: "2023 - 2025",
          description: "Formación Profesional de Grado Superior enfocada en el desarrollo de páginas web.",
        },
        {
          id: 2,
          degree: "Desarrollo de Aplicaciones Multiplataforma (DAM)",
          institution: "ITT",
          period: "2018 - 2021",
          description: "Formación Profesional de Grado Superior enfocada en el desarrollo de aplicaciones de escritorio o móviles.",
        },
        {
          id: 3,
          degree: "Técnico en Sistemas Microinformáticos y Redes (TSMR)",
          institution: "Fundación Tomillo",
          period: "2015 - 2017",
          description: "Formación Profesional de Grado Medio enfocada en trabajar como técnico de sistemas.",
        },
      ],
      certifications: [
        {
          id: 1,
          name: "AWS Certified Solutions Architect",
          issuer: "Amazon Web Services",
          date: "Mayo 2022",
          expires: "Mayo 2025",
          credentialId: "AWS-12345"
        },
        {
          id: 2,
          name: "Google Professional Cloud Developer",
          issuer: "Google Cloud",
          date: "Noviembre 2021",
          expires: "Noviembre 2024",
          credentialId: "GCP-67890"
        },
        {
          id: 3,
          name: "Microsoft Certified: Azure Developer Associate",
          issuer: "Microsoft",
          date: "Agosto 2021",
          expires: "Agosto 2024",
          credentialId: "MS-AZURE-54321"
        },
        {
          id: 4,
          name: "Certified Kubernetes Administrator (CKA)",
          issuer: "Cloud Native Computing Foundation",
          date: "Marzo 2022",
          expires: "Marzo 2025",
          credentialId: "CKA-13579"
        }
      ],
      recentAreas: [
        "Desarrollo Blockchain",
        "Ingeniería IA/ML",
        "DevOps & CI/CD",
        "Arquitectura Cloud"
      ]
    },
    en: {
      title: "Education & Certifications",
      formalEducation: "Formal Education",
      professionalCertifications: "Professional Certifications",
      continuingEducation: "Continuing Education",
      continuingEducationDescription: "I'm committed to lifelong learning and regularly take courses to stay current with the latest technologies and industry best practices. Recent areas of study include:",
      issued: "Issued:",
      expires: "Expires:",
      credentialId: "Credential ID:",
      keyCourses: "Key Courses:",
      gpa: "GPA:",
      educations: [
        {
          id: 1,
          degree: "Web Application Development (DAW)",
          institution: "UNIR",
          period: "2023 - 2025",
          description: "Higher Vocational Training focused on web page development.",
        },
        {
          id: 2,
          degree: "Multiplatform Application Development (DAM)",
          institution: "ITT",
          period: "2018 - 2021",
          description: "Higher Vocational Training focused on the development of desktop or mobile applications.",
        },
        {
          id: 3,
          degree: "Microcomputer Systems and Networks Technician (TSMR)",
          institution: "Fundación Tomillo",
          period: "2015 - 2017",
          description: "Intermediate Vocational Training focused on working as a systems technician.",
        },
      ],
      certifications: [
        {
          id: 1,
          name: "AWS Certified Solutions Architect",
          issuer: "Amazon Web Services",
          date: "May 2022",
          expires: "May 2025",
          credentialId: "AWS-12345"
        },
        {
          id: 2,
          name: "Google Professional Cloud Developer",
          issuer: "Google Cloud",
          date: "November 2021",
          expires: "November 2024",
          credentialId: "GCP-67890"
        },
        {
          id: 3,
          name: "Microsoft Certified: Azure Developer Associate",
          issuer: "Microsoft",
          date: "August 2021",
          expires: "August 2024",
          credentialId: "MS-AZURE-54321"
        },
        {
          id: 4,
          name: "Certified Kubernetes Administrator (CKA)",
          issuer: "Cloud Native Computing Foundation",
          date: "March 2022",
          expires: "March 2025",
          credentialId: "CKA-13579"
        }
      ],
      recentAreas: [
        "Blockchain Development",
        "AI/ML Engineering",
        "DevOps & CI/CD",
        "Cloud Architecture"
      ]
    }
  };

  const t = translations[language];

  return (
    <div className="h-full flex flex-col">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h2 className="text-2xl font-bold">{t.title}</h2>
      </div>
      
      <div className="p-4 space-y-6 overflow-y-auto">
        {t.educations.map((study, index) => (
          <div key={index} className="bg-white/5 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-2">{study.degree}</h3>
            <p className="text-blue-300 font-medium mb-2">{study.institution}</p>
            <p className="text-gray-200 mb-2">{study.period}</p>
            <p className="text-gray-200">{study.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Studies;