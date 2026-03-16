"use client";

import { useState } from "react";
import type { VideoItem } from "@/lib/youtube";

export default function TheaterPlayer({ video }: { video: VideoItem }) {
  const [theater, setTheater] = useState(false);
  const hasEthiopic = /[\u1200-\u137F]/.test(video.title);

  return (
    <div className={`transition-all duration-500 ${theater ? "fixed inset-0 z-40 bg-black flex flex-col" : ""}`}>
      {/* Player wrapper */}
      <div
        className={`relative bg-black ${
          theater
            ? "flex-1 w-full"
            : "w-full aspect-video rounded-xl overflow-hidden shadow-glass"
        }`}
      >
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />

        {/* Theater toggle */}
        <button
          onClick={() => setTheater((t) => !t)}
          aria-label={theater ? "Exit theater mode" : "Enter theater mode"}
          className="absolute bottom-4 right-16 z-10 glass rounded-lg p-2 text-white/70 hover:text-white transition-colors"
          title={theater ? "Exit theater mode" : "Theater mode"}
        >
          {theater ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          )}
        </button>
      </div>

      {/* Theater mode info bar */}
      {theater && (
        <div className="glass border-t border-glass-border px-6 py-3 flex items-center justify-between">
          <h1 className={`text-white font-semibold text-sm truncate ${hasEthiopic ? "ethiopic text-base" : ""}`}>
            {video.title}
          </h1>
          <button
            onClick={() => setTheater(false)}
            className="text-white/50 hover:text-white text-sm ml-4 shrink-0"
          >
            Exit
          </button>
        </div>
      )}
    </div>
  );
}
