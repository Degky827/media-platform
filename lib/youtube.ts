export const CHANNEL_ID = "UCDesalegn"; // replace with real channel ID
export const CHANNEL_HANDLE = "@Desalegn-e1n";
export const CHANNEL_NAME = "ወይኩን ፈቃድከ";

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: string;
  duration: string;
  channelTitle: string;
}

const API_KEY = process.env.YOUTUBE_API_KEY ?? "";
const BASE = "https://www.googleapis.com/youtube/v3";

export async function getChannelVideos(maxResults = 24): Promise<VideoItem[]> {
  if (!API_KEY) return getMockVideos();

  const searchRes = await fetch(
    `${BASE}/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=${maxResults}&type=video`,
    { next: { revalidate: 3600 } }
  );
  const searchData = await searchRes.json();
  const ids: string[] = searchData.items?.map((i: { id: { videoId: string } }) => i.id.videoId) ?? [];

  if (!ids.length) return getMockVideos();

  const detailRes = await fetch(
    `${BASE}/videos?key=${API_KEY}&id=${ids.join(",")}&part=snippet,statistics,contentDetails`,
    { next: { revalidate: 3600 } }
  );
  const detailData = await detailRes.json();

  return detailData.items?.map((item: {
    id: string;
    snippet: { title: string; description: string; thumbnails: { maxres?: { url: string }; high: { url: string } }; publishedAt: string; channelTitle: string };
    statistics: { viewCount: string };
    contentDetails: { duration: string };
  }) => ({
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.maxres?.url ?? item.snippet.thumbnails.high.url,
    publishedAt: item.snippet.publishedAt,
    viewCount: formatViews(item.statistics.viewCount),
    duration: parseDuration(item.contentDetails.duration),
    channelTitle: item.snippet.channelTitle,
  })) ?? getMockVideos();
}

export async function getVideoById(id: string): Promise<VideoItem | null> {
  if (!API_KEY) return getMockVideos().find((v) => v.id === id) ?? getMockVideos()[0];

  const res = await fetch(
    `${BASE}/videos?key=${API_KEY}&id=${id}&part=snippet,statistics,contentDetails`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  const item = data.items?.[0];
  if (!item) return null;

  return {
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.maxres?.url ?? item.snippet.thumbnails.high.url,
    publishedAt: item.snippet.publishedAt,
    viewCount: formatViews(item.statistics.viewCount),
    duration: parseDuration(item.contentDetails.duration),
    channelTitle: item.snippet.channelTitle,
  };
}

function formatViews(count: string): string {
  const n = parseInt(count, 10);
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return count;
}

function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "0:00";
  const h = match[1] ? `${match[1]}:` : "";
  const m = match[2] ? match[2].padStart(h ? 2 : 1, "0") : "0";
  const s = (match[3] ?? "0").padStart(2, "0");
  return `${h}${m}:${s}`;
}

function getMockVideos(): VideoItem[] {
  return Array.from({ length: 12 }, (_, i) => ({
    id: `mock-${i}`,
    title: i % 3 === 0 ? `ወይኩን ፈቃድከ - ቪዲዮ ${i + 1}` : `Video Title ${i + 1} - ወይኩን ፈቃድከ`,
    description: "ይህ ቪዲዮ ስለ ወይኩን ፈቃድከ ቻናል ነው።",
    thumbnail: `https://picsum.photos/seed/${i + 10}/640/360`,
    publishedAt: new Date(Date.now() - i * 86400000 * 3).toISOString(),
    viewCount: `${Math.floor(Math.random() * 900 + 100)}K`,
    duration: `${Math.floor(Math.random() * 20 + 3)}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
    channelTitle: CHANNEL_NAME,
  }));
}
