import { getChannelVideos, CHANNEL_NAME, CHANNEL_HANDLE } from "@/lib/youtube";
import VideoGridClient from "@/components/VideoGridClient";

export const revalidate = 3600;

export default async function HomePage() {
  const videos = await getChannelVideos(24);

  return (
    <div className="min-h-screen">
      {/* Hero banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] dark:from-[#1a1a2e] dark:via-[#16213e] dark:to-[#0f3460] light:from-[#e8e8f0] light:via-[#d8d8e8] light:to-[#c8c8e0] px-4 py-16 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(229,57,53,0.2),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(229,57,53,0.1),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(229,57,53,0.08),transparent_40%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full scale-150" />
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#e53935] to-[#c62828] mx-auto flex items-center justify-center text-white text-4xl font-black ethiopic shadow-2xl shadow-red-500/30 transform hover:scale-105 transition-transform duration-300">
              ወ
            </div>
          </div>
          <h1 className="ethiopic text-5xl font-black mb-3 bg-gradient-to-r from-white to-white/80 dark:from-white dark:to-white/80 light:from-gray-900 light:to-gray-700 bg-clip-text text-transparent">{CHANNEL_NAME}</h1>
          <p className="text-base mb-8 font-medium" style={{ color: "var(--fg-60)" }}>{CHANNEL_HANDLE}</p>
          <a
            href="https://www.youtube.com/@Desalegn-e1n?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#e53935] to-[#d32f2f] hover:from-[#f44336] hover:to-[#e53935] text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-0.5"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Subscribe on YouTube
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
      </section>

      {/* Videos */}
      <section className="max-w-screen-2xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-bold text-2xl" style={{ color: "var(--fg)" }}>Latest Videos</h2>
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--fg-40)" }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            Updated hourly
          </div>
        </div>
        <VideoGridClient videos={videos} />
      </section>
    </div>
  );
}
