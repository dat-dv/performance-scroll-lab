"use client";

import React from "react";
import HorizontalVirtualScroll, { withLoaderWidth } from "@/libs/horizontal-virtual-scroll";
import { HorizontalScrollDocs } from "@/components/technical-docs";

const HorizontalVirtualScrollWithLoader = withLoaderWidth(HorizontalVirtualScroll);

interface CardItem {
  id: number;
  title: string;
  color: string;
}

const colors = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-purple-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-indigo-500",
];

const renderCard = ({ item }: { index: number; item: CardItem }) => {
  return (
    <div className="h-full w-[240px] p-3">
      <div
        className={`flex h-full w-full flex-col items-center justify-center rounded-2xl p-6 text-center font-bold text-white shadow-lg transition-transform hover:scale-95 ${item.color}`}
      >
        <span className="mb-1 text-[10px] tracking-widest uppercase opacity-70">
          Portfolio Item
        </span>
        <div className="text-xl">{item.title}</div>
        <div className="mt-4 rounded-full bg-white/20 px-3 py-1 text-[10px]">ID: {item.id}</div>
      </div>
    </div>
  );
};

export default function HorizontalDemoPage() {
  const [items, setItems] = React.useState<CardItem[]>(
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      title: `Card #${i}`,
      color: colors[i % colors.length],
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
        ...Array.from({ length: 20 }, (_, i) => ({
          id: prev.length + i,
          title: `Card #${prev.length + i}`,
          color: colors[(prev.length + i) % colors.length],
        })),
      ]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="relative">
      <HorizontalScrollDocs />

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Horizontal Windowing Demo</h2>
          <p className="text-sm text-gray-500">
            5,000 cards rendering horizontally with withLoaderWidth HOC.
          </p>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            Total Cards: {items.length}
          </div>
          {isLoading && (
            <div className="animate-pulse text-[10px] font-bold tracking-widest text-emerald-500 uppercase">
              Fetching more...
            </div>
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-gray-100 bg-gray-50/50 py-8 dark:border-white/5 dark:bg-zinc-900/40">
        <div className="mx-auto flex justify-center">
          <HorizontalVirtualScrollWithLoader
            items={items}
            visibleCount={4}
            overscan={4}
            onEndReached={handleLoadMore}
            isLoadingMore={isLoading}
          >
            {renderCard}
          </HorizontalVirtualScrollWithLoader>
        </div>
      </div>
    </div>
  );
}
