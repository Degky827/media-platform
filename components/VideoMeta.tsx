"use client";

import { useState } from "react";
import type { VideoItem } from "@/lib/youtube";
import { CHANNEL_NAME } from "@/lib/youtube";

export default function VideoMeta({ video }: { video: VideoItem }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const hasEthiopic = /[\u1200-\u137F]/.test(video.title);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: video.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch { /* user cancelled or clipboard unavailable */ }
  };

  return (
    <div className="glass rounded-2xl p-5 mt-5">
      <h1
        className={`font-bold text-2xl leading-tight mb-3 group-hover:text-red-500 transition-colors ${hasEthiopic ? "ethiopic text-3xl" : ""}`}
        style={{ color: "var(--fg)" }}
      >
        {video.title}
      </h1>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3 text-sm" style={{ color: "var(--fg-40)" }}>
          <span className="font-semibold">{video.viewCount} views</span>
          <span className="w-1 h-1 rounded-full bg-current opacity-40" />
          <span>
            {new Date(video.publishedAt).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </span>
        </div>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-all duration-200 hover:bg-[var(--bg-3)] hover:scale-105"
          style={{ backgroundColor: "var(--bg-2)", color: "var(--fg-50)" }}
        >
          {copied ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              Share
            </>
          )}
        </button>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4 pt-4" style={{ borderTop: "1px solid var(--glass-border)" }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e53935] to-[#c62828] flex items-center justify-center text-white font-black ethiopic text-xl shadow-lg">
            ወ
          </div>
          <div>
            <p className="ethiopic font-bold text-base" style={{ color: "var(--fg)" }}>{CHANNEL_NAME}</p>
            <p className="text-sm" style={{ color: "var(--fg-40)" }}>@Desalegn-e1n</p>
          </div>
        </div>
        <a
          href="https://www.youtube.com/@Desalegn-e1n?sub_confirmation=1"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-[#e53935] to-[#d32f2f] hover:from-[#f44336] hover:to-[#e53935] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25 hover:-translate-y-0.5"
        >
          Subscribe
        </a>
      </div>

      {video.description && (
        <div className="mt-5">
          <p
            className={`text-sm leading-relaxed whitespace-pre-line ${expanded ? "" : "line-clamp-3"}`}
            style={{ color: "var(--fg-50)" }}
          >
            {video.description}
          </p>
          {video.description.length > 200 && (
            <button
              onClick={() => setExpanded((e) => !e)}
              className="mt-2 text-sm font-medium transition-colors hover:text-red-500"
              style={{ color: "var(--fg-40)" }}
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
