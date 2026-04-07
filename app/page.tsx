"use client";

import React, { useState } from "react";
import InfiniteScroll from "@/libs/infinite-scroll";
import { Sparkles, ArrowDown, Loader2 } from "lucide-react";

export default function InfiniteScrollDemo() {
  const [items, setItems] = useState(
    Array.from({ length: 20 }, (_, i) => `Initial Item #${i + 1}`)
  );
  const [hasMore, setHasMore] = useState(true);

  const loadMore = (page: number) => {
    console.log("Loading page:", page);
    // Simulate API delay
    setTimeout(() => {
      if (items.length >= 100) {
        setHasMore(false);
        return;
      }
      const nextItems = Array.from(
        { length: 15 },
        (_, i) => `Loaded Item #${items.length + i + 1}`
      );
      setItems((prev) => [...prev, ...nextItems]);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-8 md:p-24">
      <div className="w-full max-w-2xl space-y-8">
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400">
            <Sparkles className="h-3 w-3" />
            <span>Pure Library Migration</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tighter text-white">
            Infinite<span className="text-indigo-500">Scroll</span>
          </h1>
          <p className="text-zinc-500 italic">
            &ldquo;Headless logic in libs, premium UI in app.&rdquo;
          </p>
        </header>

        <div className="glass relative overflow-hidden rounded-3xl p-4">
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMore}
            threshold={100}
            loader={
              <div key="loader" className="flex w-full items-center justify-center p-8">
                <div className="glass flex items-center gap-3 rounded-2xl px-6 py-3 shadow-xl">
                  <Loader2 className="h-5 w-5 animate-spin text-indigo-500" />
                  <span className="text-sm font-medium text-zinc-400">
                    Loading more excellence...
                  </span>
                </div>
              </div>
            }
            className="flex flex-col gap-6"
          >
            {items.map((item, index) => (
              <div
                key={item}
                className="group relative flex cursor-default items-center justify-between overflow-hidden rounded-2xl border border-white/5 bg-red-200! p-6 transition-all hover:bg-white/10"
              >
                <div>
                  <h3 className="font-medium tracking-tight text-white uppercase transition-colors group-hover:text-indigo-400">
                    {item}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-600">
                    Processed by headless functional library.
                  </p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-500">
                  {index + 1}
                </div>
              </div>
            ))}
          </InfiniteScroll>

          {!hasMore && (
            <div className="py-12 text-center text-zinc-600 italic">End of the void reached.</div>
          )}
        </div>

        <footer className="py-8 text-center">
          <p className="flex items-center justify-center gap-2 text-sm text-zinc-700">
            Scroll down for more <ArrowDown className="h-3 w-3 animate-bounce" />
          </p>
        </footer>
      </div>
    </div>
  );
}
