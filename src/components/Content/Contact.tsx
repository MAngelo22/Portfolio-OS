import { useState } from 'react';
import { Mail, Send, Linkedin, Github, Globe, PhoneCall, Codesandbox, Pi, AlertCircle, CheckCircle2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import { ElementType } from 'react';

interface ContactProps {
  language: 'es' | 'en';
}

interface SocialLink {
  id: number;
  icon: string;
  href: string;
  label: string;
  color: string;
}

interface Translations {
  title: string;
  getInTouch: string;
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
  configError: string;
  genericError: string;
  fallbackHint: string;
  contactInfo: {
    email: string;
    phone: string;
    website: string;
  };
  socialLinks: SocialLink[];
}

const Contact = ({ language }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const translations: Record<'es' | 'en', Translations> = {
    es: {
      title: 'Contacto',
      getInTouch: 'Ponte en contacto',
      description:
        'Si tienes una propuesta, colaboracion o una vacante, escribeme. Respondo rapido y puedo adaptarme al proyecto.',
      emailLabel: 'Email',
      phoneLabel: 'Telefono',
      websiteLabel: 'Sitio web',
      socialProfiles: 'Perfiles',
      sendMessageTitle: 'Enviame un mensaje',
      formNameLabel: 'Tu nombre',
      formNamePlaceholder: 'Tu nombre',
      formEmailLabel: 'Tu email',
      formEmailPlaceholder: 'tu.email@ejemplo.com',
      formSubjectLabel: 'Asunto',
      formSubjectPlaceholder: 'Consulta de proyecto',
      formMessageLabel: 'Mensaje',
      formMessagePlaceholder: 'Hola, me gustaria hablar sobre...',
      submitButton: 'Enviar mensaje',
      sendingButton: 'Enviando...',
      successMessage: 'Mensaje enviado correctamente',
      successSubMessage: 'Gracias por contactar. Te respondere lo antes posible.',
      configError: 'Falta configurar VITE_FORMSPREE_ENDPOINT en el entorno.',
      genericError: 'No se pudo enviar el mensaje. Intentalo de nuevo.',
      fallbackHint: 'Si falla el envio web, puedes escribirme directo a:',
      contactInfo: {
        email: 'miguelangel.developer@gmail.com',
        phone: '+34 XXX XXX XXX',
        website: 'https://manl3d.netlify.app/',
      },
      socialLinks: [
        { id: 1, icon: 'Codesandbox', href: 'https://manl3d.netlify.app/', label: 'Web 3D', color: 'hover:bg-violet-500' },
        { id: 2, icon: 'Pi', href: 'https://mantrix.netlify.app/', label: 'Web IA', color: 'hover:bg-lime-500' },
        { id: 3, icon: 'Mail', href: 'mailto:miguelangel.developer@gmail.com', label: 'Email', color: 'hover:bg-red-500' },
        { id: 4, icon: 'Linkedin', href: 'https://www.linkedin.com/in/miguelangelnunezlopez/', label: 'LinkedIn', color: 'hover:bg-blue-600' },
        { id: 5, icon: 'Github', href: 'https://github.com/MAngelo22', label: 'GitHub', color: 'hover:bg-gray-600' },
      ],
    },
    en: {
      title: 'Contact',
      getInTouch: 'Get in touch',
      description:
        'If you have a proposal, collaboration idea, or open role, message me. I reply fast and adapt to project needs.',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      websiteLabel: 'Website',
      socialProfiles: 'Profiles',
      sendMessageTitle: 'Send me a message',
      formNameLabel: 'Your name',
      formNamePlaceholder: 'Your name',
      formEmailLabel: 'Your email',
      formEmailPlaceholder: 'your.email@example.com',
      formSubjectLabel: 'Subject',
      formSubjectPlaceholder: 'Project inquiry',
      formMessageLabel: 'Message',
      formMessagePlaceholder: 'Hi, I would like to discuss...',
      submitButton: 'Send message',
      sendingButton: 'Sending...',
      successMessage: 'Message sent successfully',
      successSubMessage: 'Thanks for reaching out. I will reply as soon as possible.',
      configError: 'Missing VITE_FORMSPREE_ENDPOINT in environment config.',
      genericError: 'Could not send the message. Please try again.',
      fallbackHint: 'If web sending fails, contact me directly at:',
      contactInfo: {
        email: 'miguelangel.developer@gmail.com',
        phone: '+34 XXX XXX XXX',
        website: 'https://manl3d.netlify.app/',
      },
      socialLinks: [
        { id: 1, icon: 'Codesandbox', href: 'https://manl3d.netlify.app/', label: '3D Web', color: 'hover:bg-violet-500' },
        { id: 2, icon: 'Pi', href: 'https://mantrix.netlify.app/', label: 'AI Web', color: 'hover:bg-lime-500' },
        { id: 3, icon: 'Mail', href: 'mailto:miguelangel.developer@gmail.com', label: 'Email', color: 'hover:bg-red-500' },
        { id: 4, icon: 'Linkedin', href: 'https://www.linkedin.com/in/miguelangelnunezlopez/', label: 'LinkedIn', color: 'hover:bg-blue-600' },
        { id: 5, icon: 'Github', href: 'https://github.com/MAngelo22', label: 'GitHub', color: 'hover:bg-gray-600' },
      ],
    },
  };

  const t = translations[language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

    if (!endpoint) {
      setSubmitError(t.configError);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      window.setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      setSubmitError(t.genericError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full min-h-0 flex flex-col">
      <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg">
        <h2 className="text-xl md:text-2xl font-bold">{t.title}</h2>
      </div>

      <div className="flex-1 min-h-0 p-3 md:p-4 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            <section className="bg-slate-800/90 border border-slate-700 rounded-lg p-4">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{t.getInTouch}</h3>
              <p className="text-slate-200 text-sm md:text-base mb-4">{t.description}</p>

              <div className="space-y-3 text-sm md:text-base">
                <div className="flex items-start gap-2 text-slate-100">
                  <Mail className="w-4 h-4 text-blue-300 mt-1" />
                  <div>
                    <p className="text-white font-medium">{t.emailLabel}</p>
                    <a href={`mailto:${t.contactInfo.email}`} className="text-blue-300 hover:underline break-all">
                      {t.contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-slate-100">
                  <PhoneCall className="w-4 h-4 text-blue-300 mt-1" />
                  <div>
                    <p className="text-white font-medium">{t.phoneLabel}</p>
                    <span>{t.contactInfo.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-slate-100">
                  <Globe className="w-4 h-4 text-blue-300 mt-1" />
                  <div>
                    <p className="text-white font-medium">{t.websiteLabel}</p>
                    <a href={t.contactInfo.website} target="_blank" rel="noreferrer" className="text-blue-300 hover:underline break-all">
                      {t.contactInfo.website}
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-slate-800/90 border border-slate-700 rounded-lg p-4">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-3">{t.socialProfiles}</h3>
              <div className="flex flex-wrap gap-2">
                {t.socialLinks.map((link) => {
                  const Icon = Icons[link.icon as keyof typeof Icons] as ElementType;
                  if (!Icon) return null;

                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-full bg-slate-700 text-white text-sm transition-colors ${link.color}`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </section>
          </div>

          <section className="bg-slate-800/90 border border-slate-700 rounded-lg p-4">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-3">{t.sendMessageTitle}</h3>

            {isSubmitted && (
              <div className="rounded-md border border-emerald-500/40 bg-emerald-500/10 p-3 mb-4">
                <div className="flex items-center gap-2 text-emerald-300 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  {t.successMessage}
                </div>
                <p className="text-sm text-emerald-100 mt-1">{t.successSubMessage}</p>
              </div>
            )}

            {submitError && (
              <div className="rounded-md border border-red-500/40 bg-red-500/10 p-3 mb-4">
                <div className="flex items-center gap-2 text-red-300 font-medium">
                  <AlertCircle className="w-4 h-4" />
                  {submitError}
                </div>
                <p className="text-xs text-red-100 mt-1">
                  {t.fallbackHint} <a href={`mailto:${t.contactInfo.email}`} className="underline">{t.contactInfo.email}</a>
                </p>
              </div>
            )}

            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm text-slate-200 mb-1">
                  {t.formNameLabel}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.formNamePlaceholder}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-slate-200 mb-1">
                  {t.formEmailLabel}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.formEmailPlaceholder}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm text-slate-200 mb-1">
                  {t.formSubjectLabel}
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t.formSubjectPlaceholder}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-slate-200 mb-1">
                  {t.formMessageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.formMessagePlaceholder}
                  rows={5}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full inline-flex justify-center items-center gap-2 px-4 py-2 rounded-md text-white text-sm font-medium transition-colors ${
                  isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? t.sendingButton : t.submitButton}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Contact;
