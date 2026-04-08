"use client";

import React from "react";
import VirtualScrollWithFixedItemHeight from "@/libs/virtual-scroll-with-fixed-item-height";
import RenderItem from "./render-item";
import { VerticalScrollDocs } from "@/components/technical-docs";

export interface Item {
  id: number;
  name: string;
}

const Page = () => {
  const [items, setItems] = React.useState<Item[]>(
    Array.from({ length: 100 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
    }))
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLoadMore = () => {
    if (isLoading) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setItems((prev) => [
        ...prev,
        ...Array.from({ length: 100 }, (_, i) => ({
          id: prev.length + i,
          name: `Item ${prev.length + i}`,
        })),
      ]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="relative">
      <VerticalScrollDocs />

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900/70">
        <VirtualScrollWithFixedItemHeight
          visibleCount={10}
          overscan={8}
          items={items}
          onEndReached={handleLoadMore}
          isLoadingMore={isLoading}
        >
          {RenderItem}
        </VirtualScrollWithFixedItemHeight>

        <div className="flex items-center justify-between border-t border-gray-100 p-4 dark:border-white/10">
          <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-bold tracking-tighter text-blue-500 uppercase">
            Performance Mode Active
          </div>
          {isLoading && (
            <div className="animate-pulse text-[10px] font-bold tracking-widest text-gray-400 uppercase">
              Loading more items...
            </div>
          )}
          <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            Total Items: {items.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
