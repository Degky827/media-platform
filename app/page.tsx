import { getChannelVideos, CHANNEL_NAME, CHANNEL_HANDLE } from "@/lib/youtube";
import VideoGrid from "@/components/VideoGrid";

export const revalidate = 3600;

export default async function HomePage() {
  const videos = await getChannelVideos(24);

  return (
    <div className="min-h-screen">
      {/* Hero banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-2 to-surface px-4 py-12 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(229,57,53,0.15),transparent_70%)]" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-accent mx-auto mb-4 flex items-center justify-center text-white text-3xl font-black ethiopic">
            ወ
          </div>
          <h1 className="ethiopic text-4xl font-black text-white mb-2">{CHANNEL_NAME}</h1>
          <p className="text-white/40 text-sm mb-6">{CHANNEL_HANDLE}</p>
          <a
            href={`https://www.youtube.com/@Desalegn-e1n?sub_confirmation=1`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Subscribe on YouTube
          </a>
        </div>
      </section>

      {/* Videos */}
      <section className="max-w-screen-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-semibold text-lg">Latest Videos</h2>
          <span className="text-white/30 text-sm">{videos.length} videos</span>
        </div>
        <VideoGrid videos={videos} />
      </section>
    </div>
  );
}
