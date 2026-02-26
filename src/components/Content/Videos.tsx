import { useMemo, useState } from 'react';
import { Clapperboard, ExternalLink, PlayCircle } from 'lucide-react';

interface VideosProps {
  language: 'es' | 'en';
}

interface ProjectVideo {
  id: string;
  name: string;
  summaryEs: string;
  summaryEn: string;
  url: string;
}

const PROJECT_VIDEOS: ProjectVideo[] = [
  {
    id: 'motenimiento',
    name: 'Motenimiento',
    summaryEs: 'Generador de mantenimiento para motocicletas segun modelo.',
    summaryEn: 'Motorcycle maintenance generator by model.',
    url: 'https://www.youtube.com/shorts/6ughobPjAeI',
  },
  {
    id: 'redel',
    name: 'Redel',
    summaryEs: 'Reserva de pistas de padel para urbanizacion.',
    summaryEn: 'Padel court booking app for a residential complex.',
    url: 'https://www.youtube.com/watch?v=BuNRfIk7z44',
  },
  {
    id: 'qrescato',
    name: 'QRescato',
    summaryEs: 'App Android con geolocalizacion para rescate/proteccion.',
    summaryEn: 'Android app with geolocation for rescue/protection.',
    url: 'https://www.youtube.com/watch?v=6B9bn7RxE7k',
  },
  {
    id: 'juego3d',
    name: 'Juego 3D',
    summaryEs: 'Video gameplay del proyecto 3D en primera persona.',
    summaryEn: 'Gameplay video for the first-person 3D project.',
    url: 'https://www.youtube.com/watch?v=E7xc8kuUAeQ&t=34s',
  },
  {
    id: 'juego2d',
    name: 'Juego 2D',
    summaryEs: 'Video gameplay del juego 2D inspirado en Avengers.',
    summaryEn: 'Gameplay video of the 2D Avengers-inspired game.',
    url: 'https://www.youtube.com/watch?v=r-VIGDOk2UU&t=2s',
  },
];

const getYouTubeEmbedUrl = (url: string) => {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.replace('/', '').trim();
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname.startsWith('/watch')) {
        const id = parsed.searchParams.get('v');
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }

      if (parsed.pathname.startsWith('/shorts/')) {
        const id = parsed.pathname.split('/shorts/')[1]?.split('/')[0];
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }

      if (parsed.pathname.startsWith('/embed/')) {
        return url;
      }
    }

    return null;
  } catch {
    return null;
  }
};

const Videos = ({ language }: VideosProps) => {
  const [activeId, setActiveId] = useState(PROJECT_VIDEOS[0].id);

  const t = useMemo(
    () =>
      language === 'es'
        ? {
            title: 'Videos',
            subtitle: 'Listado de proyectos con demo en video.',
            listTitle: 'Proyectos con video',
            open: 'Abrir en YouTube',
            noEmbed: 'Este enlace no permite embeberse. Abre en YouTube.',
          }
        : {
            title: 'Videos',
            subtitle: 'Project list with video demos.',
            listTitle: 'Projects with video',
            open: 'Open on YouTube',
            noEmbed: 'This link cannot be embedded. Open it on YouTube.',
          },
    [language]
  );

  const activeVideo = PROJECT_VIDEOS.find((video) => video.id === activeId) ?? PROJECT_VIDEOS[0];
  const embedUrl = getYouTubeEmbedUrl(activeVideo.url);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Clapperboard className="w-6 h-6" />
          {t.title}
        </h2>
        <p className="text-blue-100 text-sm mt-1">{t.subtitle}</p>
      </div>

      <div className="flex-1 min-h-0 p-3 md:p-4 overflow-hidden">
        <div className="h-full grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-3 md:gap-4">
          <aside className="bg-white/5 border border-white/10 rounded-lg p-3 overflow-y-auto">
            <h3 className="text-white font-semibold mb-3">{t.listTitle}</h3>
            <div className="space-y-2">
              {PROJECT_VIDEOS.map((video) => (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => setActiveId(video.id)}
                  className={`w-full text-left rounded-md p-2.5 border transition-colors ${
                    activeId === video.id
                      ? 'bg-blue-500/20 border-blue-400/60 text-white'
                      : 'bg-slate-800/60 border-slate-600 text-slate-200 hover:bg-slate-700/70'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <PlayCircle className="w-4 h-4" />
                    <span className="font-medium text-sm">{video.name}</span>
                  </div>
                  <p className="text-xs opacity-90">{language === 'es' ? video.summaryEs : video.summaryEn}</p>
                </button>
              ))}
            </div>
          </aside>

          <section className="bg-white/5 border border-white/10 rounded-lg p-3 md:p-4 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold truncate pr-2">{activeVideo.name}</h3>
              <a
                href={activeVideo.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                {t.open}
              </a>
            </div>

            <div className="flex-1 min-h-0 rounded-md overflow-hidden border border-slate-600 bg-black relative">
              <div className="absolute left-0 right-0 top-0 h-8 bg-slate-900/80 border-b border-slate-700 flex items-center px-3 gap-1.5 z-10">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="text-xs text-slate-300 ml-2">Player - {activeVideo.name}</span>
              </div>

              {embedUrl ? (
                <iframe
                  title={`video-${activeVideo.id}`}
                  src={embedUrl}
                  className="w-full h-full pt-8"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <div className="h-full pt-8 flex items-center justify-center text-slate-200 text-sm p-4 text-center">
                  {t.noEmbed}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Videos;
