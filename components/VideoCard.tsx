import Link from 'next/link';
import Image from 'next/image';
import type { VideoItem } from '@/lib/youtube';

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return 'Today';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export default function VideoCard({ video }: { video: VideoItem }) {
  const hasEthiopic = /[\u1200-\u137F]/.test(video.title);

  return (
    <Link href={`/watch/${video.id}`} className="masonry-item block group">
      <div className="glass rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-1 transition-all duration-300">
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <span className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-md">
            {video.duration}
          </span>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-white/90 dark:bg-white/90 dark:group-hover:bg-white dark:shadow-lg dark:shadow-red-500/30 light:bg-gray-900/80 light:group-hover:bg-gray-900/90 flex items-center justify-center transition-all duration-300 scale-75 group-hover:scale-100 opacity-0 group-hover:opacity-100 shadow-xl">
              <svg
                className="w-6 h-6 text-red-500 ml-0.5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3
            className={`text-sm font-semibold line-clamp-2 leading-snug mb-2 group-hover:text-red-500 transition-colors ${hasEthiopic ? 'ethiopic text-base' : ''}`}
            style={{ color: 'var(--fg)' }}
          >
            {video.title}
          </h3>
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--fg-40)' }}>
            <span className="font-medium">{video.viewCount} views</span>
            <span className="w-1 h-1 rounded-full bg-current opacity-40" />
            <span>{timeAgo(video.publishedAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
