"use client";

import { useSearch } from "./SearchProvider";
import VideoCard from "./VideoCard";
import type { VideoItem } from "@/lib/youtube";
import type { SortOption } from "./SearchProvider";

const SORT_LABELS: Record<SortOption, string> = {
  newest: "Newest",
  oldest: "Oldest",
  popular: "Most Viewed",
};

export default function VideoGridClient({ videos }: { videos: VideoItem[] }) {
  const { filter, sort, setSort, query } = useSearch();
  const filtered = filter(videos);

  return (
    <div>
      {/* Sort bar */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => (
          <button
            key={opt}
            onClick={() => setSort(opt)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
            style={
              sort === opt
                ? { backgroundColor: "#e53935", color: "#fff" }
                : { backgroundColor: "var(--bg-3)", color: "var(--fg-50)" }
            }
          >
            {SORT_LABELS[opt]}
          </button>
        ))}
        <span className="ml-auto text-sm" style={{ color: "var(--fg-30)" }}>
          {filtered.length} video{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-20" style={{ color: "var(--fg-30)" }}>
          <svg className="w-12 h-12 mx-auto mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <p className="text-sm">No videos found for &ldquo;{query}&rdquo;</p>
        </div>
      )}

      {/* Grid */}
      <div className="masonry">
        {filtered.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}

export function VideoGridSkeleton() {
  return (
    <div className="masonry">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="masonry-item block animate-fadeIn">
          <div className="glass rounded-xl overflow-hidden shadow-card">
            <div className="w-full aspect-video skeleton" />
            <div className="p-3 space-y-2">
              <div className="skeleton h-3.5 rounded w-full" />
              <div className="skeleton h-3.5 rounded w-3/4" />
              <div className="skeleton h-3 rounded w-1/3 mt-1" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
