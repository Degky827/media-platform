export default function VideoCardSkeleton() {
  return (
    <div className="masonry-item block animate-fadeIn">
      <div className="glass rounded-xl overflow-hidden shadow-card">
        <div className="w-full aspect-video skeleton" />
        <div className="p-3 space-y-2">
          <div className="skeleton h-3.5 rounded w-full" />
          <div className="skeleton h-3.5 rounded w-3/4" />
          <div className="skeleton h-3 rounded w-1/3 mt-1" />
        </div>
      </div>
    </div>
  );
}
