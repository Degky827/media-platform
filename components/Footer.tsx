import { CHANNEL_NAME, CHANNEL_HANDLE } from "@/lib/youtube";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="glass border-t border-glass-border mt-16 mb-16 md:mb-0">
      <div className="max-w-screen-2xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-md" />
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#e53935] to-[#c62828] flex items-center justify-center text-white font-black ethiopic text-lg shadow-lg">
                ወ
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="ethiopic font-bold text-base leading-tight" style={{ color: "var(--fg)" }}>{CHANNEL_NAME}</p>
              <p className="text-sm" style={{ color: "var(--fg-40)" }}>{CHANNEL_HANDLE}</p>
            </div>
          </div>

          <nav className="flex items-center justify-center gap-6 text-sm" style={{ color: "var(--fg-50)" }}>
            <a
              href="https://www.youtube.com/@Desalegn-e1n"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#e53935] transition-all duration-200 hover:-translate-y-0.5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              YouTube
            </a>
            <a
              href="https://www.youtube.com/@Desalegn-e1n?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e53935] transition-all duration-200 hover:-translate-y-0.5"
            >
              Subscribe
            </a>
          </nav>

          <p className="text-sm text-center md:text-right" style={{ color: "var(--fg-30)" }}>
            © {year} {CHANNEL_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
