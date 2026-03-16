import VideoCard from "./VideoCard";
import type { VideoItem } from "@/lib/youtube";

export default function VideoGrid({ videos }: { videos: VideoItem[] }) {
  return (
    <div className="masonry">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
