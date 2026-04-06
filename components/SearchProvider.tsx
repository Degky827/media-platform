"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { VideoItem } from "@/lib/youtube";

interface SearchContextValue {
  query: string;
  setQuery: (q: string) => void;
  filter: (videos: VideoItem[]) => VideoItem[];
  sort: SortOption;
  setSort: (s: SortOption) => void;
}

export type SortOption = "newest" | "oldest" | "popular";

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");

  const filter = useCallback(
    (videos: VideoItem[]) => {
      let result = videos;

      if (query.trim()) {
        const q = query.toLowerCase();
        result = result.filter(
          (v) =>
            v.title.toLowerCase().includes(q) ||
            v.description.toLowerCase().includes(q)
        );
      }

      return [...result].sort((a, b) => {
        if (sort === "newest")
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        if (sort === "oldest")
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        // popular: parse view count strings like "1.2M", "300K"
        const parseViews = (v: string) => {
          const n = parseFloat(v);
          if (v.endsWith("M")) return n * 1_000_000;
          if (v.endsWith("K")) return n * 1_000;
          return n;
        };
        return parseViews(b.viewCount) - parseViews(a.viewCount);
      });
    },
    [query, sort]
  );

  return (
    <SearchContext.Provider value={{ query, setQuery, filter, sort, setSort }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within SearchProvider");
  return ctx;
}
