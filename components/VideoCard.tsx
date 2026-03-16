import Link from "next/link";
import Image from "next/image";
import type { VideoItem } from "@/lib/youtube";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "Today";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export default function VideoCard({ video }: { video: VideoItem }) {
  const hasEthiopic = /[\u1200-\u137F]/.test(video.title);

  return (
    <Link
      href={`/watch/${video.id}`}
      className="masonry-item block group animate-fadeIn"
    >
      <div className="glass rounded-xl overflow-hidden shadow-card hover:shadow-glass transition-all duration-300 hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="relative w-full aspect-video overflow-hidden bg-surface-3">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Duration badge */}
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-mono px-1.5 py-0.5 rounded">
            {video.duration}
          </span>
          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/0 group-hover:bg-white/20 flex items-center justify-center transition-all scale-75 group-hover:scale-100">
              <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <h3
            className={`text-sm font-semibold text-white/90 line-clamp-2 leading-snug mb-1 ${
              hasEthiopic ? "ethiopic text-base" : ""
            }`}
          >
            {video.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span>{video.viewCount} views</span>
            <span>·</span>
            <span>{timeAgo(video.publishedAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
