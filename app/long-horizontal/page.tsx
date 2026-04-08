"use client";

import HorizontalVirtualScroll from "@/libs/horizontal-virtual-scroll";
import { RenderItem } from "./render-item";
import { useState } from "react";
import { delay } from "@/libs/delay";
import { createMockItems } from "./mock-data";
import { DemoHeader } from "./components/demo-header";

/**
 * Static Horizontal Demo Page
 * Demonstrates high-performance horizontal scrolling with virtualization and infinite load.
 */
export default function StaticHorizontalDemo() {
  const [items, setItems] = useState(() => createMockItems(20));
  const [loading, setLoading] = useState(false);
  const handleEndReached = async () => {
    if (loading) return;
    setLoading(true);
    await delay(2000);
    console.log("End reached");
    setItems((prev) => [...prev, ...createMockItems(20, prev.length)]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen space-y-12 pb-20">
      {/* 🚀 Header Section */}
      <DemoHeader />

      {/* 🧩 Virtualized Scroll Area */}
      <section className="relative -mx-6 overflow-visible rounded-[3rem] bg-slate-50/50 px-6 py-12 dark:bg-white/5">
        <HorizontalVirtualScroll
          items={items}
          visibleCount={null}
          overscan={4}
          onEndReached={handleEndReached}
          isLoadingMore={loading}
        >
          {RenderItem}
        </HorizontalVirtualScroll>

        {/* 💡 Scroll Tip & Loading State */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-4 text-[10px] font-bold tracking-widest uppercase">
          {loading ? (
            <div className="flex animate-pulse items-center gap-2 text-blue-500">
              <div className="size-1.5 animate-bounce rounded-full bg-blue-500" />
              <span>Fetching new projects...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-slate-400">
              <div className="h-px w-8 bg-slate-200 dark:bg-white/10" />
              <span>Swipe to explore projects</span>
              <div className="h-px w-8 bg-slate-200 dark:bg-white/10" />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
