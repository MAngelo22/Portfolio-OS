import { useState } from 'react';
import { Mail, Send, Linkedin, Github, Twitter, Globe, PhoneCall, Codesandbox, Pi } from 'lucide-react';
import * as Icons from 'lucide-react'; // Import Icons object
import { ElementType } from 'react';

interface ContactProps {
  language: 'es' | 'en';
}

interface Translations {
  title: string;
  getIntouch: string;
  description: string;
  emailLabel: string;
  phoneLabel: string;
  websiteLabel: string;
  socialProfiles: string;
  sendMessageTitle: string;
  formNameLabel: string;
  formNamePlaceholder: string;
  formEmailLabel: string;
  formEmailPlaceholder: string;
  formSubjectLabel: string;
  formSubjectPlaceholder: string;
  formMessageLabel: string;
  formMessagePlaceholder: string;
  submitButton: string;
  sendingButton: string;
  successMessage: string;
  successSubMessage: string;
  contactInfo: {
    email: string;
    phone: string; // Placeholder
    website: string; // Placeholder
  };
  socialLinks: {
    id: number;
    icon: string; // Using string to represent icon name from LucideReact
    href: string;
    label: string;
    color: string; // Tailwind color class suffix
  }[];
}

const Contact = ({ language }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const translations: Record<'es' | 'en', Translations> = {
    es: {
      title: "Contacto",
      getIntouch: "Ponte en Contacto",
      description: "¡No dudes en contactarme si tienes alguna pregunta, ideas de proyectos, o simplemente quieres conectar! Estoy siempre abierto a discutir nuevos proyectos y oportunidades.",
      emailLabel: "Email",
      phoneLabel: "Teléfono",
      websiteLabel: "Sitio Web",
      socialProfiles: "Perfiles Sociales",
      sendMessageTitle: "Envíame un Mensaje",
      formNameLabel: "Tu Nombre",
      formNamePlaceholder: "Tu Nombre",
      formEmailLabel: "Correo Electrónico",
      formEmailPlaceholder: "tu.email@ejemplo.com",
      formSubjectLabel: "Asunto",
      formSubjectPlaceholder: "Consulta sobre Proyecto",
      formMessageLabel: "Mensaje",
      formMessagePlaceholder: "Hola, me gustaría discutir un proyecto...",
      submitButton: "Enviar Mensaje",
      sendingButton: "Enviando...",
      successMessage: "¡Mensaje enviado con éxito!",
      successSubMessage: "Gracias por contactarme. Te responderé tan pronto como sea posible.",
      contactInfo: {
        email: "miguelangel.developer@gmail.com",
        phone: "+X (XXX) XXX-XXXX", // Placeholder
        website: "www.yourwebsite.com", // Placeholder
      },
      socialLinks: [
        {
          id: 1,
          icon: "Codesandbox",
          href: 'https://manl3d.netlify.app/',
          label: 'Web 3D',
          color: 'hover:bg-violet-300'
        },
        {
          id: 2,
          icon: "Pi",
          href: 'https://mantrix.netlify.app/',
          label: 'Web 3D',
          color: 'hover:bg-lime-500'
        },
        {
          id: 3,
          icon: "Mail",
          href: 'mailto:miguelangel.developer@gmail.com',
          label: 'Email',
          color: 'hover:bg-red-500'
        },
        {
          id: 4,
          icon: "Linkedin",
          href: 'https://www.linkedin.com/in/miguelangelnunezlopez/',
          label: 'LinkedIn',
          color: 'hover:bg-blue-600'
        },
        {
          id: 5,
          icon: "Github",
          href: 'https://github.com/MAngelo22',
          label: 'GitHub',
          color: 'hover:bg-gray-600'
        }
      ],
    },
    en: {
      title: "Contact",
      getIntouch: "Get in Touch",
      description: "Feel free to reach out if you have any questions, project ideas, or just want to connect! I'm always open to discussing new projects and opportunities.",
      emailLabel: "Email",
      phoneLabel: "Phone",
      websiteLabel: "Website",
      socialProfiles: "Social Profiles",
      sendMessageTitle: "Send Me a Message",
      formNameLabel: "Your Name",
      formNamePlaceholder: "John Doe",
      formEmailLabel: "Email Address",
      formEmailPlaceholder: "john@example.com",
      formSubjectLabel: "Subject",
      formSubjectPlaceholder: "Project Inquiry",
      formMessageLabel: "Message",
      formMessagePlaceholder: "Hello, I'd like to discuss a project...",
      submitButton: "Send Message",
      sendingButton: "Sending...",
      successMessage: "Message sent successfully!",
      successSubMessage: "Thank you for reaching out. I'll get back to you as soon as possible.",
      contactInfo: {
        email: "miguelangel.developer@gmail.com",
        phone: "+X (XXX) XXX-XXXX", // Placeholder
        website: "www.yourwebsite.com", // Placeholder
      },
      socialLinks: [
         {
          id: 1,
          icon: "Codesandbox",
          href: 'https://manl3d.netlify.app/',
          label: '3D Web',
          color: 'hover:bg-violet-300'
        },
        {
          id: 2,
          icon: "Pi",
          href: 'https://mantrix.netlify.app/',
          label: '3D Web',
          color: 'hover:bg-lime-500'
        },
        {
          id: 3,
          icon: "Mail",
          href: 'mailto:miguelangel.developer@gmail.com',
          label: 'Email',
          color: 'hover:bg-red-500'
        },
        {
          id: 4,
          icon: "Linkedin",
          href: 'https://www.linkedin.com/in/miguelangelnunezlopez/',
          label: 'LinkedIn',
          color: 'hover:bg-blue-600'
        },
        {
          id: 5,
          icon: "Github",
          href: 'https://github.com/MAngelo22',
          label: 'GitHub',
          color: 'hover:bg-gray-600'
        }
      ],
    },
  };

  const t = translations[language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const IconComponent = (iconName: string) => {
    const LucideIcon = Icons[iconName as keyof typeof Icons] as ElementType;
    return LucideIcon ? <LucideIcon size={24} className="w-6 h-6 text-white" /> : null;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h2 className="text-2xl font-bold">{t.title}</h2>
      </div>
      
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center h-full p-4 text-center">
          <Send className="w-16 h-16 text-green-500 mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">{t.successMessage}</h3>
          <p className="text-gray-200">{t.successSubMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 md:p-6 overflow-y-auto">
          <div className="space-y-6">
            <div className="bg-white/5 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">{t.getIntouch}</h3>
              <p className="text-gray-200 mb-6">{t.description}</p>

              <div className="space-y-4">
                <div className="flex items-center text-gray-200">
                  <Mail className="w-5 h-5 mr-3 text-blue-300" />
                  <div>
                    <p className="font-semibold text-white">{t.emailLabel}</p>
                    <a href={`mailto:${t.contactInfo.email}`} className="text-blue-300 hover:underline">{t.contactInfo.email}</a>
                  </div>
                </div>
                {/* Phone and Website placeholders - keep original colors or adjust minimally if they become real data */}
                {/* <div className="flex items-center text-gray-200">\n                  <PhoneCall className="w-5 h-5 mr-3 text-blue-300" />\n                  <div>\n                    <p className="font-semibold text-white">{t.phoneLabel}</p>\n                    <span className="text-gray-200">{t.contactInfo.phone}</span>\n                  </div>\n                </div>\n                <div className="flex items-center text-gray-200">\n                  <Globe className="w-5 h-5 mr-3 text-blue-300" />\n                  <div>\n                    <p className="font-semibold text-white">{t.websiteLabel}</p>\n                    <a href={t.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">{t.contactInfo.website}</a>\n                  </div>\n                </div> */}
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">{t.socialProfiles}</h3>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {t.socialLinks.map((link) => {
                  const Icon = Icons[link.icon as keyof typeof Icons] as ElementType;
                  if (!Icon) return null; // Handle cases where icon name doesn't match
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center px-4 py-2 rounded-full bg-gray-700 text-white text-sm font-medium transition-colors duration-200 ${link.color}`}
                      aria-label={link.label}
                    >
                      <Icon className="w-5 h-5 mr-2" />
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">{t.sendMessageTitle}</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-200">{t.formNameLabel}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.formNamePlaceholder}
                  className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200">{t.formEmailLabel}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.formEmailPlaceholder}
                  className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-200">{t.formSubjectLabel}</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t.formSubjectPlaceholder}
                  className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-200">{t.formMessageLabel}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.formMessagePlaceholder}
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
                >
                  {isSubmitting ? t.sendingButton : t.submitButton}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;