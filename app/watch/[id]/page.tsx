import { getVideoById, getChannelVideos, CHANNEL_NAME } from "@/lib/youtube";
import TheaterPlayer from "@/components/TheaterPlayer";
import VideoCard from "@/components/VideoCard";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [video, related] = await Promise.all([
    getVideoById(id),
    getChannelVideos(8),
  ]);

  if (!video) return notFound();

  const hasEthiopic = /[\u1200-\u137F]/.test(video.title);
  const others = related.filter((v) => v.id !== id);

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-screen-2xl mx-auto px-4 py-6 flex flex-col xl:flex-row gap-6">
        {/* Main column */}
        <div className="flex-1 min-w-0">
          {/* Player */}
          <TheaterPlayer video={video} />

          {/* Video meta */}
          <div className="mt-4 glass rounded-xl p-4">
            <h1
              className={`text-white font-bold text-xl leading-snug mb-2 ${
                hasEthiopic ? "ethiopic text-2xl" : ""
              }`}
            >
              {video.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/40 mb-4">
              <span>{video.viewCount} views</span>
              <span>·</span>
              <span>{new Date(video.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>

            {/* Channel row */}
            <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-glass-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-black ethiopic">
                  ወ
                </div>
                <div>
                  <p className="ethiopic text-white font-bold text-sm">{CHANNEL_NAME}</p>
                  <p className="text-white/40 text-xs">@Desalegn-e1n</p>
                </div>
              </div>
              <a
                href="https://www.youtube.com/@Desalegn-e1n?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent hover:bg-accent-hover text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
              >
                Subscribe
              </a>
            </div>

            {/* Description */}
            {video.description && (
              <p className="mt-4 text-white/50 text-sm leading-relaxed line-clamp-4">
                {video.description}
              </p>
            )}
          </div>

          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-4 text-white/40 hover:text-white text-sm transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to all videos
          </Link>
        </div>

        {/* Sidebar */}
        <aside className="xl:w-80 shrink-0">
          <h2 className="text-white/60 text-sm font-semibold mb-3 uppercase tracking-wider">More Videos</h2>
          <div className="flex flex-col gap-3">
            {others.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
