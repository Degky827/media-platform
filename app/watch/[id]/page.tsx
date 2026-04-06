import { getVideoById, getChannelVideos } from "@/lib/youtube";
import TheaterPlayer from "@/components/TheaterPlayer";
import VideoMeta from "@/components/VideoMeta";
import VideoCard from "@/components/VideoCard";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [video, related] = await Promise.all([
    getVideoById(id),
    getChannelVideos(9),
  ]);

  if (!video) return notFound();

  const others = related.filter((v) => v.id !== id).slice(0, 8);
  const nextVideo = others[0];

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-screen-2xl mx-auto px-4 py-8 flex flex-col xl:flex-row gap-8">
        {/* Main column */}
        <div className="flex-1 min-w-0">
          <TheaterPlayer video={video} nextVideo={nextVideo} />
          <VideoMeta video={video} />

          <Link
            href="/"
            className="group inline-flex items-center gap-2 mt-6 text-sm transition-all duration-200 hover:text-red-500"
            style={{ color: "var(--fg)" }}
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to all videos
          </Link>
        </div>

        {/* Sidebar */}
        <aside className="xl:w-96 shrink-0">
          <h2 className="text-base font-semibold mb-4 uppercase tracking-wider" style={{ color: "var(--fg-60)" }}>More Videos</h2>
          <div className="flex flex-col gap-4">
            {others.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
