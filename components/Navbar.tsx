"use client";

import Link from "next/link";
import { useState } from "react";
import { CHANNEL_NAME } from "@/lib/youtube";

export default function Navbar() {
  const [query, setQuery] = useState("");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 glass border-b border-glass-border flex items-center px-4 gap-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-black text-sm">
          ወ
        </span>
        <span className="ethiopic text-white text-lg hidden sm:block leading-tight">
          {CHANNEL_NAME}
        </span>
      </Link>

      {/* Search */}
      <div className="flex-1 max-w-xl mx-auto">
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search videos..."
            className="w-full bg-surface-3 border border-glass-border rounded-full px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-accent/60 transition-colors"
          />
          <button
            aria-label="Search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </div>
      </div>

      {/* Subscribe CTA */}
      <a
        href={`https://www.youtube.com/@Desalegn-e1n?sub_confirmation=1`}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 bg-accent hover:bg-accent-hover text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
      >
        Subscribe
      </a>
    </header>
  );
}
