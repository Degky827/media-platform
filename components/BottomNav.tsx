"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

export default function BottomNav() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  const isHome = pathname === "/";

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-glass-border flex items-center justify-around h-16 backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <Link
        href="/"
        className="flex flex-col items-center gap-1 text-xs transition-all duration-200 hover:scale-105"
        style={{ color: isHome ? "#e53935" : "var(--fg)", opacity: isHome ? 1 : 0.5 }}
      >
        <div className={`p-1.5 rounded-xl transition-all ${isHome ? "bg-red-500/10" : ""}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <span className="font-medium">Home</span>
      </Link>

      <a
        href="https://www.youtube.com/@Desalegn-e1n?sub_confirmation=1"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 text-xs transition-all duration-200 hover:scale-105"
        style={{ color: "var(--fg)", opacity: 0.5 }}
      >
        <div className="p-1.5 rounded-xl">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </div>
        <span className="font-medium">Subscribe</span>
      </a>

      <button
        onClick={toggle}
        aria-label="Toggle theme"
        className="flex flex-col items-center gap-1 text-xs transition-all duration-200 hover:scale-105"
        style={{ color: "var(--fg)", opacity: 0.5 }}
      >
        <div className="p-1.5 rounded-xl">
          {theme === "dark" ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </div>
        <span className="font-medium">{theme === "dark" ? "Light" : "Dark"}</span>
      </button>
    </nav>
  );
}
