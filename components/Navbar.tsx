'use client';

import Link from 'next/link';
import { useSearch } from './SearchProvider';
import { useTheme } from './ThemeProvider';
import { CHANNEL_NAME } from '@/lib/youtube';

export default function Navbar() {
  const { query, setQuery } = useSearch();
  const { theme, toggle } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 glass border-b border-glass-border flex items-center px-4 gap-4 backdrop-blur-xl">
      <Link href="/" className="flex items-center gap-2 shrink-0 group">
        <div className="relative">
          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#e53935] to-[#c62828] flex items-center justify-center text-white font-black text-sm shadow-lg">
            ወ
          </span>
        </div>
        <span
          className="ethiopic text-lg hidden sm:block leading-tight font-semibold"
          style={{ color: 'var(--fg)' }}
        >
          {CHANNEL_NAME}
        </span>
      </Link>

      <div className="flex-1 max-w-lg mx-auto">
        <div className="relative group">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search videos..."
            style={{
              backgroundColor: 'var(--bg-2)',
              color: 'var(--fg)',
              borderColor: 'var(--glass-border)',
            }}
            className="w-full rounded-xl px-4 py-2.5 pl-11 text-sm border border-transparent focus:border-red-500/50 focus:bg-[var(--bg-3)] transition-all duration-200 placeholder:opacity-40 focus:outline-none focus:shadow-sm focus:shadow-red-500/20"
          />
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors opacity-40 group-focus-within:text-red-500 group-focus-within:opacity-100"
            style={{ color: 'var(--fg)' }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>
      </div>

      {/* Theme toggle — desktop */}
      <button
        onClick={toggle}
        aria-label="Toggle theme"
        className="hidden md:flex shrink-0 p-2.5 rounded-xl transition-all duration-200 hover:bg-[var(--bg-3)]"
        style={{ color: 'var(--fg)' }}
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>

      <a
        href="https://www.youtube.com/@Desalegn-e1n?sub_confirmation=1"
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 bg-gradient-to-r from-[#e53935] to-[#d32f2f] hover:from-[#f44336] hover:to-[#e53935] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25 hover:-translate-y-0.5"
      >
        Subscribe
      </a>
    </header>
  );
}
