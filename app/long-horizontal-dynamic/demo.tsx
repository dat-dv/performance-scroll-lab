"use client";

import React, { useState } from "react";
import HorizontalScrollDynamicWidth from "@/libs/virtual-scroll/horizontal-scroll-dynamic-width";
import { Sparkles, ArrowRight } from "lucide-react";
import HeaderItemLoaded from "@/components/header-item-loaded";

interface NewsItem {
  id: string;
  title: string;
  width: number; // Random initial width
  bgColor: string;
}

export default function Demo() {
  const [items, setItems] = useState<NewsItem[]>(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: `item-${i}`,
      title: `News Topic #${i + 1}: ${["AI Revolution", "Next.js 15 Tips", "Web3 Future", "Performance Guide"][i % 4]}`,
      width: 250 + Math.random() * 300, // Random width from 250 to 550
      bgColor: ["bg-blue-500", "bg-emerald-500", "bg-rose-500", "bg-purple-500", "bg-amber-500"][
        i % 5
      ],
    }))
  );

  const [isLoading, setIsLoading] = useState(false);

  const loadMore = () => {
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      const more = Array.from({ length: 20 }, (_, i) => ({
        id: `item-${items.length + i}`,
        title: `Extra #${items.length + i + 1}`,
        width: 200 + Math.random() * 400,
        bgColor: ["bg-blue-500", "bg-emerald-500", "bg-rose-500", "bg-purple-500", "bg-amber-500"][
          (items.length + i) % 5
        ],
      }));
      setItems((prev) => [...prev, ...more]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 py-10">
      <HeaderItemLoaded
        length={items.length}
        isLoading={isLoading}
        title="Horizontal Dynamic Lab"
        description="Mỗi Item dưới đây có chiều rộng ngẫu nhiên"
      />

      <div className="rounded-[3rem] border border-slate-200 bg-slate-50 p-4 shadow-inner dark:border-white/5 dark:bg-slate-900/50">
        <HorizontalScrollDynamicWidth
          items={items}
          estimatedWidth={350}
          itemHeight={480} // Chiều cao tổng của khung cuộn
          onEndReached={loadMore}
          isLoadingMore={isLoading}
          className="py-10"
        >
          {({ item, index }) => (
            <div className="h-full px-3" style={{ width: item.width }}>
              <div
                className={`h-full rounded-[2.5rem] ${item.bgColor} group relative flex cursor-pointer flex-col justify-between overflow-hidden p-8 text-white shadow-lg transition-transform hover:scale-[1.02]`}
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 transition-opacity group-hover:opacity-20">
                  <span className="text-8xl font-black italic">{index}</span>
                </div>

                <div className="relative space-y-2">
                  <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[10px] font-black tracking-widest uppercase">
                    Dynamic Width
                  </span>
                  <div className="text-2xl leading-tight font-black drop-shadow-sm">
                    {item.title}
                  </div>
                </div>

                <div className="relative flex items-center justify-between">
                  <div className="text-[10px] font-bold opacity-70">
                    Calculated: {Math.round(item.width)}px
                  </div>
                  <div className="flex size-10 items-center justify-center rounded-full bg-white/20 transition-all group-hover:bg-white group-hover:text-slate-900">
                    <ArrowRight className="size-5" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </HorizontalScrollDynamicWidth>
      </div>

      <div className="flex justify-center">
        {isLoading ? (
          <div className="flex animate-pulse items-center gap-2 text-xs font-black text-blue-600">
            SYNCHRONIZING NEW COORDINATES...
          </div>
        ) : (
          <div className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">
            Swipe to trigger infinite load
          </div>
        )}
      </div>
    </div>
  );
}
