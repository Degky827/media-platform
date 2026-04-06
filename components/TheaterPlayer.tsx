'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { VideoItem } from '@/lib/youtube';

interface Props {
  video: VideoItem;
  nextVideo?: VideoItem;
}

const AUTOPLAY_SECONDS = 5;

export default function TheaterPlayer({ video, nextVideo }: Props) {
  const [theater, setTheater] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const router = useRouter();
  const hasEthiopic = /[\u1200-\u137F]/.test(video.title);

  // Detect video end via YouTube iframe postMessage
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (typeof e.data !== 'string') return;
      try {
        const data = JSON.parse(e.data);
        if (data.event === 'infoDelivery' && data.info?.playerState === 0 && nextVideo) {
          setCountdown(AUTOPLAY_SECONDS);
        }
      } catch {
        /* ignore non-JSON messages */
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [nextVideo]);

  // Countdown tick — only start interval once when countdown is first set
  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      if (nextVideo) router.push(`/watch/${nextVideo.id}`);
      return;
    }

    // Clear any existing interval before starting a new one
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCountdown((c) => (c !== null && c > 0 ? c - 1 : c));
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown === null ? null : countdown > 0 ? 'ticking' : 'done']);

  const cancelAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCountdown(null);
  };

  // Keyboard shortcuts: 't' to toggle theater, Escape to exit theater
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 't') setTheater((t) => !t);
      if (e.key === 'Escape') setTheater(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  }, []);

  return (
    <div
      className={`transition-all duration-500 ${theater ? 'fixed inset-0 z-40 bg-black flex flex-col' : ''}`}
    >
      <div
        className={`relative bg-black ${
          theater
            ? 'flex-1 w-full'
            : 'w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-red-900/10'
        }`}
      >
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />

        {/* Up-next overlay */}
        {countdown !== null && nextVideo && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center gap-6 animate-fadeIn z-10">
            <div className="flex items-center gap-3 text-white/70 text-lg font-medium">
              <span className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center font-bold">
                {countdown}
              </span>
              <span>Up next</span>
            </div>
            <div className="glass rounded-2xl p-4 flex items-center gap-4 max-w-lg w-full mx-4">
              <div className="w-28 aspect-video rounded-xl overflow-hidden shrink-0 shadow-lg">
                <Image
                  src={nextVideo.thumbnail}
                  alt={nextVideo.title}
                  width={112}
                  height={63}
                  className="object-cover"
                  priority={false}
                />
              </div>
              <p className="text-white text-base font-semibold line-clamp-2 leading-snug">
                {nextVideo.title}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => router.push(`/watch/${nextVideo.id}`)}
                className="bg-gradient-to-r from-[#e53935] to-[#d32f2f] hover:from-[#f44336] hover:to-[#e53935] text-white text-base font-semibold px-8 py-3 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5"
              >
                Play now
              </button>
              <button
                onClick={cancelAutoplay}
                className="glass text-white/70 hover:text-white text-base px-8 py-3 rounded-full transition-all duration-200 hover:bg-white/10"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Player controls — positioned below YouTube's own UI */}
        <div className="absolute bottom-16 right-4 z-10 flex items-center gap-3">
          <button
            onClick={copyLink}
            aria-label="Copy video link"
            title={linkCopied ? 'Copied!' : 'Copy link'}
            className="glass rounded-xl p-2.5 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            {linkCopied ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            )}
          </button>

          <button
            onClick={() => setTheater((t) => !t)}
            aria-label={theater ? 'Exit theater mode' : 'Theater mode'}
            title={theater ? 'Exit theater mode' : 'Theater mode'}
            className="glass rounded-xl p-2.5 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            {theater ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {theater && (
        <div className="glass border-t border-glass-border px-6 py-4 flex items-center justify-between">
          <h1
            className={`text-white font-semibold text-base truncate ${hasEthiopic ? 'ethiopic text-lg' : ''}`}
          >
            {video.title}
          </h1>
          <button
            onClick={() => setTheater(false)}
            className="text-white/50 hover:text-white text-sm ml-4 shrink-0 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all"
          >
            Exit
          </button>
        </div>
      )}
    </div>
  );
}
