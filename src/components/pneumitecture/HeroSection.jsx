'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, CirclePlay, Mouse, Volume2, VolumeX } from 'lucide-react';
import { scrollToSection } from '@/lib/scrollToSection';
import { publicAssetPath } from '@/lib/publicAssetPath';

/**
 * Hero: full-viewport YouTube. Intro shows PNEUMITECTURE + Play → titles slide off → video.
 * Scroll down: volume ducks; past the hero: pause + mute. Scroll back to top: intro + Play return.
 * @see https://www.youtube.com/watch?v=xvInodQv6q0
 */
const DEFAULT_YOUTUBE_ID = 'xvInodQv6q0';
const HERO_POSTER = publicAssetPath('/images/pillow-bg.jpeg');
const YT_ORIGIN = 'https://www.youtube.com';

function parseYoutubeId(raw) {
  if (!raw || typeof raw !== 'string') return null;
  const t = raw.trim();
  if (/^[\w-]{11}$/.test(t)) return t;
  const m = t.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=))([\w-]{11})/);
  return m ? m[1] : null;
}

function resolveYoutubeId() {
  const url =
    typeof process.env.NEXT_PUBLIC_HERO_YOUTUBE_URL === 'string'
      ? process.env.NEXT_PUBLIC_HERO_YOUTUBE_URL.trim()
      : '';
  const id =
    typeof process.env.NEXT_PUBLIC_HERO_YOUTUBE_ID === 'string'
      ? process.env.NEXT_PUBLIC_HERO_YOUTUBE_ID.trim()
      : '';
  return parseYoutubeId(url || id) || DEFAULT_YOUTUBE_ID;
}

const YOUTUBE_ID = resolveYoutubeId();
const YOUTUBE_WATCH_URL = `https://www.youtube.com/watch?v=${YOUTUBE_ID}`;

function getScrollY() {
  if (typeof window === 'undefined') return 0;
  return (
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

function ytPostCommand(iframe, func, args = []) {
  if (!iframe?.contentWindow) return;
  try {
    iframe.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func, args }),
      YT_ORIGIN,
    );
  } catch {
    /* ignore */
  }
}

const SCROLL_TOP_THRESHOLD = 24;
const FADE_SCROLL_VH = 1.35;
const IFRAME_STALL_MS = 14000;
/** Past ~one viewport = user left hero for the next section */
const PAST_HERO_Y_RATIO = 0.92;
/** Back at top of document — show intro again */
const BACK_TO_TOP_Y = 140;
const MAX_AUDIBLE_VOLUME = 42;

export default function HeroSection() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const ytIframeRef = useRef(null);
  const heroPhaseRef = useRef('intro');
  const userAudibleRef = useRef(false);
  const ytShellOkRef = useRef(false);
  const wasPastHeroRef = useRef(false);

  const [scrollHintVisible, setScrollHintVisible] = useState(false);
  /** intro = title + Play; exit = title slides off; video = YouTube */
  const [heroPhase, setHeroPhase] = useState('intro');
  const [scrollFade, setScrollFade] = useState(0);
  const [ytUnavailable, setYtUnavailable] = useState(false);
  const [userAudible, setUserAudible] = useState(false);
  const [ytEmbedSrc, setYtEmbedSrc] = useState('');
  const [ytSuspended, setYtSuspended] = useState(false);
  const ytSuspendedRef = useRef(false);
  const [introAnimKey, setIntroAnimKey] = useState(0);
  const [ytInstanceKey, setYtInstanceKey] = useState(0);

  heroPhaseRef.current = heroPhase;

  useEffect(() => {
    userAudibleRef.current = userAudible;
  }, [userAudible]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const q = new URLSearchParams({
      autoplay: '1',
      mute: '1',
      playsinline: '1',
      controls: '0',
      modestbranding: '1',
      rel: '0',
      loop: '1',
      playlist: YOUTUBE_ID,
      enablejsapi: '1',
    });
    if (origin) q.set('origin', origin);
    setYtEmbedSrc(`https://www.youtube.com/embed/${YOUTUBE_ID}?${q.toString()}`);
  }, []);

  const resetHeroToIntro = useCallback(() => {
    const iframe = ytIframeRef.current;
    if (iframe) {
      ytPostCommand(iframe, 'pauseVideo');
      ytPostCommand(iframe, 'mute');
    }
    userAudibleRef.current = false;
    setUserAudible(false);
    ytSuspendedRef.current = false;
    setYtSuspended(false);
    setScrollFade(0);
    setIntroAnimKey((k) => k + 1);
    setYtInstanceKey((k) => k + 1);
    setHeroPhase('intro');
  }, []);

  const applyHeroScroll = useCallback(() => {
    const iframe = ytIframeRef.current;
    const phase = heroPhaseRef.current;
    const y = getScrollY();
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800;

    setScrollHintVisible(phase === 'video' && y < SCROLL_TOP_THRESHOLD);

    if (y > vh * PAST_HERO_Y_RATIO) {
      wasPastHeroRef.current = true;
    }

    if (phase === 'video' && wasPastHeroRef.current && y < BACK_TO_TOP_Y) {
      wasPastHeroRef.current = false;
      resetHeroToIntro();
      return;
    }

    if (phase !== 'video') {
      setScrollFade(0);
      ytSuspendedRef.current = false;
      setYtSuspended(false);
      return;
    }

    const fadeEnd = vh * FADE_SCROLL_VH;
    const p = fadeEnd > 0 ? Math.min(1, Math.max(0, y / fadeEnd)) : 0;
    setScrollFade(p);

    let nextSus = ytSuspendedRef.current;
    if (p > 0.84) nextSus = true;
    else if (p < 0.2) nextSus = false;
    if (nextSus !== ytSuspendedRef.current) {
      ytSuspendedRef.current = nextSus;
      setYtSuspended(nextSus);
    }

    if (!iframe || ytUnavailable || ytSuspended) return;

    const audible = userAudibleRef.current;
    if (audible) {
      const vol = Math.max(
        0,
        Math.min(MAX_AUDIBLE_VOLUME, Math.round((1 - p) * MAX_AUDIBLE_VOLUME)),
      );
      ytPostCommand(iframe, 'setVolume', [vol]);
      if (p > 0.93) ytPostCommand(iframe, 'mute');
      else ytPostCommand(iframe, 'unMute');
      if (p > 0.98) ytPostCommand(iframe, 'pauseVideo');
      else ytPostCommand(iframe, 'playVideo');
    } else {
      ytPostCommand(iframe, 'mute');
      ytPostCommand(iframe, 'setVolume', [0]);
      if (p > 0.98) ytPostCommand(iframe, 'pauseVideo');
      else ytPostCommand(iframe, 'playVideo');
    }
  }, [ytUnavailable, ytSuspended, resetHeroToIntro]);

  useEffect(() => {
    applyHeroScroll();
    window.addEventListener('scroll', applyHeroScroll, { passive: true });
    return () => window.removeEventListener('scroll', applyHeroScroll);
  }, [applyHeroScroll, heroPhase, ytUnavailable, ytSuspended]);

  const titleExitMs = reduceMotion ? 500 : 1200;

  useEffect(() => {
    if (heroPhase !== 'exit') return;
    const t = window.setTimeout(() => {
      wasPastHeroRef.current = false;
      setHeroPhase('video');
    }, titleExitMs);
    return () => window.clearTimeout(t);
  }, [heroPhase, titleExitMs]);

  useEffect(() => {
    if (!ytEmbedSrc) return;
    ytShellOkRef.current = false;
    const timer = window.setTimeout(() => {
      if (!ytShellOkRef.current) setYtUnavailable(true);
    }, IFRAME_STALL_MS);
    return () => window.clearTimeout(timer);
  }, [ytEmbedSrc]);

  const onYtIframeLoad = useCallback(() => {
    ytShellOkRef.current = true;
    setYtUnavailable(false);
    if (userAudibleRef.current) {
      const iframe = ytIframeRef.current;
      if (!iframe) return;
      const fadeEnd = window.innerHeight * FADE_SCROLL_VH;
      const p = fadeEnd > 0 ? Math.min(1, Math.max(0, getScrollY() / fadeEnd)) : 0;
      const vol = Math.max(
        0,
        Math.min(MAX_AUDIBLE_VOLUME, Math.round((1 - p) * MAX_AUDIBLE_VOLUME)),
      );
      ytPostCommand(iframe, 'unMute');
      ytPostCommand(iframe, 'setVolume', [vol]);
      ytPostCommand(iframe, 'playVideo');
    }
  }, []);

  const startPlaySequence = useCallback(() => {
    if (heroPhase !== 'intro') return;
    userAudibleRef.current = true;
    setUserAudible(true);
    setHeroPhase('exit');
  }, [heroPhase]);

  const enableSound = useCallback(() => {
    const iframe = ytIframeRef.current;
    if (!iframe || ytUnavailable) return;
    userAudibleRef.current = true;
    setUserAudible(true);
    const fadeEnd = window.innerHeight * FADE_SCROLL_VH;
    const p = fadeEnd > 0 ? Math.min(1, Math.max(0, getScrollY() / fadeEnd)) : 0;
    const vol = Math.max(
      0,
      Math.min(MAX_AUDIBLE_VOLUME, Math.round((1 - p) * MAX_AUDIBLE_VOLUME)),
    );
    ytPostCommand(iframe, 'unMute');
    ytPostCommand(iframe, 'setVolume', [vol]);
    ytPostCommand(iframe, 'playVideo');
  }, [ytUnavailable]);

  const disableSound = useCallback(() => {
    const iframe = ytIframeRef.current;
    userAudibleRef.current = false;
    setUserAudible(false);
    if (!iframe || ytUnavailable) return;
    ytPostCommand(iframe, 'setVolume', [0]);
    ytPostCommand(iframe, 'mute');
  }, [ytUnavailable]);

  const toggleSound = useCallback(() => {
    if (userAudibleRef.current) disableSound();
    else enableSound();
  }, [disableSound, enableSound]);

  const handoffOpacity = heroPhase === 'video' ? 0 : 0.45;
  const mediaOpacity = heroPhase === 'video' ? 1 : 0;
  const mediaDim = 1;

  const posterUnderYt =
    heroPhase === 'video' && !ytUnavailable && ytEmbedSrc && !ytSuspended;

  return (
    <section
      id="hero"
      className="relative h-dvh min-h-dvh w-full shrink-0 overflow-hidden bg-[#0a0a0a]"
    >
      <div className="absolute inset-0 z-0 min-h-dvh">
        <div
          aria-hidden
          className="absolute inset-0 min-h-dvh bg-cover bg-center transition-[opacity,filter] duration-300 ease-out"
          style={{
            backgroundImage: `url(${HERO_POSTER})`,
            opacity:
              heroPhase === 'video'
                ? ytUnavailable
                  ? 0.9
                  : 0
                : posterUnderYt
                  ? 0
                  : 0.85,
            filter: heroPhase === 'video' ? `brightness(${mediaDim})` : undefined,
          }}
        />

        {heroPhase === 'video' && ytEmbedSrc && !ytUnavailable && !ytSuspended && (
          <div
            className="absolute inset-0 min-h-dvh overflow-hidden transition-[opacity,filter] duration-300 ease-out"
            style={{
              opacity: mediaOpacity,
              filter: `brightness(${mediaDim})`,
            }}
          >
            <iframe
              key={ytInstanceKey}
              ref={ytIframeRef}
              title="Pneumitecture hero video"
              className="pointer-events-none absolute left-1/2 top-1/2 block h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
              src={ytEmbedSrc}
              onLoad={onYtIframeLoad}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        )}

        {heroPhase === 'video' && !ytEmbedSrc && !ytUnavailable && (
          <div className="pointer-events-none absolute inset-0 z-[5] flex min-h-dvh items-center justify-center bg-black/20">
            <p className="tech-label text-[9px] tracking-[0.2em] text-bone/50">Preparing player…</p>
          </div>
        )}

        {heroPhase === 'video' && ytUnavailable && (
          <div className="absolute inset-0 z-[18] flex min-h-dvh flex-col items-center justify-center gap-5 bg-black/60 px-6 text-center backdrop-blur-[2px]">
            <p className="max-w-md font-sans text-sm leading-relaxed text-bone/95">
              The YouTube player did not load in time (network, embed restrictions, or ad blockers).
              Open the video on YouTube, or try again.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={YOUTUBE_WATCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/35 bg-white/12 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-bone transition hover:bg-white/22"
              >
                Watch on YouTube
              </a>
              <button
                type="button"
                onClick={() => {
                  setYtUnavailable(false);
                  ytShellOkRef.current = false;
                  setYtEmbedSrc('');
                  window.requestAnimationFrame(() => {
                    const origin = window.location.origin;
                    const q = new URLSearchParams({
                      autoplay: '1',
                      mute: '1',
                      playsinline: '1',
                      controls: '0',
                      modestbranding: '1',
                      rel: '0',
                      loop: '1',
                      playlist: YOUTUBE_ID,
                      enablejsapi: '1',
                      origin,
                    });
                    setYtEmbedSrc(
                      `https://www.youtube.com/embed/${YOUTUBE_ID}?${q.toString()}`,
                    );
                  });
                }}
                className="rounded-full border border-white/30 bg-black/40 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-bone transition hover:bg-black/60"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {heroPhase !== 'video' && (
          <div
            className="pointer-events-none absolute inset-0 min-h-dvh bg-gradient-to-b from-black/50 via-black/25 to-black/60 transition-opacity duration-500 ease-out"
            style={{ opacity: 0.75 }}
          />
        )}
      </div>

      {heroPhase === 'intro' && (
        <>
          <div
            key={introAnimKey}
            className="hero-titles pointer-events-none absolute inset-0 z-20 flex min-h-dvh flex-col justify-between p-8 pb-28 md:p-16 md:pb-32 hero-titles--in"
          >
            <h1 className="hero-title-line hero-title-line--left display-heading text-bone text-[12vw] md:text-[8vw] leading-none drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]">
              PNEUMI
            </h1>
            <div className="flex flex-col items-end">
              <h1 className="hero-title-line hero-title-line--right display-heading text-bone text-[12vw] md:text-[8vw] leading-none drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]">
                TECTURE
              </h1>
            </div>
          </div>
          <button
            type="button"
            onClick={startPlaySequence}
            className="absolute left-1/2 top-[52%] z-[22] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-full border-0 bg-transparent p-3 text-bone transition hover:scale-[1.04] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
            aria-label="Play hero video"
          >
            <span className="flex size-[4.5rem] items-center justify-center rounded-full border border-white/25 bg-black/40 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm md:size-[5.25rem]">
              <CirclePlay className="size-12 opacity-95 md:size-14" strokeWidth={1} />
            </span>
            <span className="tech-label text-[9px] tracking-[0.24em] text-bone/70">Play</span>
          </button>
        </>
      )}

      {heroPhase === 'exit' && (
        <div className="hero-titles pointer-events-none absolute inset-0 z-20 flex min-h-dvh flex-col justify-between p-8 pb-28 md:p-16 md:pb-32 hero-titles--out">
          <h1 className="hero-title-line hero-title-line--left display-heading text-bone text-[12vw] md:text-[8vw] leading-none drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]">
            PNEUMI
          </h1>
          <div className="flex flex-col items-end">
            <h1 className="hero-title-line hero-title-line--right display-heading text-bone text-[12vw] md:text-[8vw] leading-none drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]">
              TECTURE
            </h1>
          </div>
        </div>
      )}

      {heroPhase === 'video' && !ytUnavailable && (
        <button
          type="button"
          onClick={toggleSound}
          className="absolute bottom-6 right-6 z-[25] flex items-center gap-2 rounded-full border border-white/25 bg-black/45 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-bone/90 shadow-lg backdrop-blur-sm transition hover:bg-black/60 md:bottom-7"
        >
          {userAudible ? (
            <VolumeX className="size-3.5 shrink-0 opacity-90" aria-hidden />
          ) : (
            <Volume2 className="size-3.5 shrink-0 opacity-90" aria-hidden />
          )}
          {userAudible ? 'Mute' : 'Unmute'}
        </button>
      )}

      {heroPhase !== 'video' && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-b from-transparent via-[#eceee9]/95 to-[#FBFBF9] transition-opacity duration-500 ease-out md:h-52"
          style={{ opacity: handoffOpacity }}
        />
      )}

      {heroPhase !== 'video' && (
        <button
          type="button"
          onClick={() => scrollToSection('pavilion-lead')}
          aria-label="Go to pavilion premise section"
          tabIndex={scrollHintVisible ? 0 : -1}
          className={`absolute bottom-3 left-1/2 z-30 -translate-x-1/2 cursor-pointer border-0 bg-transparent p-1 text-left transition-[opacity,transform] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60 md:bottom-4 ${
            scrollHintVisible
              ? 'pointer-events-auto translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-1 opacity-0'
          }`}
        >
          <span className="flex flex-col items-center gap-0.5 rounded border border-white/12 bg-black/35 px-1.5 py-1 shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
            <Mouse className="size-2 shrink-0 text-bone/30" strokeWidth={1} aria-hidden />
            <span className="tech-label text-bone/45 text-[6px] leading-none tracking-[0.22em]">
              Scroll
            </span>
            <span
              className="text-bone/35"
              style={{ animation: 'scroll-nudge 1.5s ease-in-out infinite' }}
              aria-hidden
            >
              <ChevronDown className="size-2" strokeWidth={2.5} />
            </span>
          </span>
        </button>
      )}

      <style>{`
        @keyframes scroll-nudge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }
        .hero-titles--in .hero-title-line--left {
          animation: heroLineInL 4.2s cubic-bezier(0.16, 0.1, 0.2, 1) forwards;
        }
        .hero-titles--in .hero-title-line--right {
          animation: heroLineInR 4.2s cubic-bezier(0.16, 0.1, 0.2, 1) 0.35s forwards;
        }
        .hero-titles--out .hero-title-line--left {
          animation: heroLineOutL 2s cubic-bezier(0.45, 0, 0.55, 1) forwards;
        }
        .hero-titles--out .hero-title-line--right {
          animation: heroLineOutR 2s cubic-bezier(0.45, 0, 0.55, 1) forwards;
        }
        @keyframes heroLineInL {
          from { opacity: 0; transform: translateX(-36px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes heroLineInR {
          from { opacity: 0; transform: translateX(36px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes heroLineOutL {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(-48vw); }
        }
        @keyframes heroLineOutR {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(48vw); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-titles--in .hero-title-line--left {
            animation: heroLineInL-rm 1.1s ease forwards;
          }
          .hero-titles--in .hero-title-line--right {
            animation: heroLineInR-rm 1.1s ease 0.08s forwards;
          }
          .hero-titles--out .hero-title-line--left {
            animation: heroLineOutL-rm 0.65s ease forwards;
          }
          .hero-titles--out .hero-title-line--right {
            animation: heroLineOutR-rm 0.65s ease forwards;
          }
        }
        @keyframes heroLineInL-rm {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes heroLineInR-rm {
          from { opacity: 0; transform: translateX(12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes heroLineOutL-rm {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(-14vw); }
        }
        @keyframes heroLineOutR-rm {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(14vw); }
        }
      `}</style>
    </section>
  );
}
