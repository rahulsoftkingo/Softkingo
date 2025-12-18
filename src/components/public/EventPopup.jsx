'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function EventPopup() {
  const pathname = usePathname() || '/';
  const [event, setEvent] = useState(null);
  const [open, setOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timerId = null;
    let scrollHandler = null;
    let alreadyShown = false;

    const load = async () => {
      try {
        if (typeof window === 'undefined') return;

        const shownKey = 'site-event-shows';
        const raw = window.localStorage.getItem(shownKey);
        const counts = raw ? JSON.parse(raw) : {};

        const res = await fetch(
          `/api/public/events/current?slug=${encodeURIComponent(pathname)}`,
          { cache: 'no-store' }
        );
        const data = await res.json();
        if (!data.event) return;

        const ev = data.event;
        const currentCount = counts[ev.id] || 0;
        const maxShows = ev.maxShowsPerUser ?? 1;
        if (currentCount >= maxShows) {
          return;
        }

        setEvent(ev);

        const delay = ev.triggerDelayMs ?? 2000;
        const scrollPercent = ev.triggerScrollPercent ?? 0;

        const openPopup = () => {
          if (alreadyShown) return;
          alreadyShown = true;
          setOpen(true);
          
          // Smooth entrance with delay
          setTimeout(() => {
            setIsVisible(true);
            setShowConfetti(true);
          }, 50);
          
          setTimeout(() => setShowConfetti(false), 3500);
          
          const updated = {
            ...counts,
            [ev.id]: currentCount + 1,
          };
          window.localStorage.setItem(shownKey, JSON.stringify(updated));
        };

        if (scrollPercent > 0) {
          timerId = window.setTimeout(() => {
            scrollHandler = () => {
              const doc = document.documentElement;
              const scrolled =
                ((window.scrollY || doc.scrollTop) /
                  (doc.scrollHeight - doc.clientHeight || 1)) *
                100;
              if (scrolled >= scrollPercent) {
                openPopup();
                if (scrollHandler) {
                  window.removeEventListener('scroll', scrollHandler);
                }
              }
            };
            window.addEventListener('scroll', scrollHandler, {
              passive: true,
            });
          }, delay);
        } else {
          timerId = window.setTimeout(openPopup, delay);
        }
      } catch {
        // ignore
      }
    };

    load();

    return () => {
      if (timerId) window.clearTimeout(timerId);
      if (scrollHandler) window.removeEventListener('scroll', scrollHandler);
    };
  }, [pathname]);

  if (!event || !open) return null;

  const onClose = () => {
    setIsVisible(false);
    setShowConfetti(false);
    setTimeout(() => setOpen(false), 300);
  };

  const confettiCount = 60;
  const confettiColors = ['#FFD700', '#FF69B4', '#00B7FF', '#FF6347', '#32CD32', '#FF1493', '#00CED1', '#FFA500'];

  return (
    <div className={`fixed inset-0 z-40 flex items-center justify-center px-4 py-8 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <button
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
        aria-label="Close"
      />
      
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: confettiCount }).map((_, i) => {
            const randomColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            const randomX = (Math.random() * 120 - 60);
            const randomY = (Math.random() * 120 - 60);
            const randomRotation = Math.random() * 360;
            const randomDelay = Math.random() * 0.4;
            const randomDuration = 1.5 + Math.random() * 1.5;
            const randomSize = 8 + Math.random() * 10;
            
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  width: `${randomSize}px`,
                  height: `${randomSize}px`,
                  backgroundColor: randomColor,
                  borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                  animation: `confettiBurst ${randomDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${randomDelay}s forwards`,
                  transform: `translate(-50%, -50%) rotate(${randomRotation}deg)`,
                  boxShadow: `0 0 10px ${randomColor}40`,
                  '--tx': `${randomX}vw`,
                  '--ty': `${randomY}vh`,
                  '--rotation': `${randomRotation * 4}deg`,
                }}
              />
            );
          })}
        </div>
      )}
      
      <div className={`relative w-full max-w-4xl bg-slate-950 border border-sky-900/60 rounded-3xl shadow-[0_18px_50px_rgba(15,23,42,0.9)] overflow-hidden max-h-[90vh] transition-all duration-700 ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-8'}`}>
        <div className="relative w-full">
          {event.imageUrl ? (
            <>
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-auto object-contain max-h-[85vh]"
              />
            </>
          ) : (
            <div className="w-full h-[400px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950" />
          )}

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300 z-10"
            aria-label="Close"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4 md:p-6 lg:p-8">
            <div className={`flex justify-start transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            {event.theme && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white">
                  {event.theme }
                </span>
              </div>
            )}
            </div>

            <div className={`flex-1 flex flex-col justify-center items-center text-center max-w-3xl mx-auto space-y-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
                {event.title}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed drop-shadow-lg">
                {event.message}
              </p>
            </div>

            <div className={`flex flex-col sm:flex-row items-center justify-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {event.ctaHref && event.ctaLabel && (
                <a
                  href={event.ctaHref}
                  className="inline-flex items-center justify-center px-3 sm:px-4 sm:py-1 md:px-8 md:py-2 rounded-full bg-gradient-to-r from-sky-700 to-sky-900 text-[9px] sm:text-[10px] md:text-[11px] font-bold text-white shadow-[0_10px_40px_rgba(0,183,255,0.4)] hover:shadow-[0_10px_50px_rgba(0,183,255,0.6)] hover:scale-105 transition-all duration-300"
                >
                  {event.ctaLabel}
                  <svg
                    className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <style >{`
        @keyframes confettiBurst {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
          }
          10% {
            opacity: 1;
          }
          70% {
            opacity: 0.8;
          }
          100% {
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) 
                       scale(1.2) rotate(var(--rotation));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
