"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import VirtualScrollFixed from "@/libs/virtual-scroll/virtual-scroll-with-fixed-item-height";
import HorizontalVirtualScroll from "@/libs/virtual-scroll/horizontal-scroll-fixed-width";
import { Play, Plus, Info, ChevronRight, Sparkles } from "lucide-react";

// Mock data generator for Nested Content
const createNestedData = () => {
  return Array.from({ length: 100 }, (_, r) => ({
    id: `row-${r}`,
    title: [
      "Trending Now",
      "Because you watched Inception",
      "Award-Winning TV Dramas",
      "New Releases",
      "Action & Adventure",
      "US TV Shows",
    ][r % 6],
    items: Array.from({ length: 100 }, (_, c) => ({
      id: `row-${r}-col-${c}`,
      title: `Movie ${r * 100 + c + 1}`,
      image: `https://picsum.photos/seed/${r * 100 + c}/300/170`,
    })),
  }));
};

export default function Demo() {
  const categories = useMemo(() => createNestedData(), []);

  return (
    <div className="relative min-h-screen bg-black transition-colors duration-500">
      {/* Hero Banner */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <Image
          src="https://picsum.photos/seed/hero-stranger/1200/600"
          alt="Hero background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute bottom-20 left-12 z-20 max-w-xl space-y-6">
          <div className="flex h-20 items-center">
            <h1 className="bg-gradient-to-r from-rose-600 to-rose-400 bg-clip-text text-5xl font-black tracking-tighter text-transparent">
              STRANGER
            </h1>
          </div>
          <p className="text-lg font-medium text-slate-200">
            When a young boy vanishes, a small town uncovers a mystery involving secret experiments,
            terrifying supernatural forces and one strange little girl.
          </p>
          <div className="flex items-center gap-4">
            <button className="transition-hover flex items-center gap-2 rounded-md bg-white px-8 py-3 text-lg font-bold text-black hover:bg-white/90">
              <Play className="size-6 fill-black" /> Play
            </button>
            <button className="transition-hover flex items-center gap-2 rounded-md bg-white/20 px-8 py-3 text-lg font-bold text-white backdrop-blur-md hover:bg-white/30">
              <Info className="size-6" /> More Info
            </button>
          </div>
        </div>
      </section>

      {/* Nested Virtualization Layer */}
      <div className="relative z-20 -mt-20 pl-12">
        <VirtualScrollFixed items={categories} overscan={3} className="pb-20">
          {({ item: category, index: rowIndex }) => (
            <div className="space-y-4 py-4 pr-12">
              {/* Category Title */}
              <div className="flex items-center justify-between">
                <h3 className="group flex cursor-pointer items-center gap-2 text-xl font-bold tracking-tight text-white">
                  {category.title}
                  <ChevronRight className="size-5 -translate-x-2 text-blue-500 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </h3>
                <div className="text-[10px] font-black tracking-widest text-slate-600 uppercase">
                  Virtual Row {rowIndex}
                </div>
              </div>

              {/* Inner Virtual Scroll (Horizontal) */}
              <HorizontalVirtualScroll
                items={category.items}
                itemWidth={320} // Width of movie card
                itemHeight={240}
                overscan={5}
                className="overflow-visible"
              >
                {({ item: movie, index: colIndex }) => (
                  <div className="h-full px-1">
                    <div className="group relative h-[180px] cursor-pointer overflow-hidden rounded-lg bg-slate-900 shadow-2xl transition-all duration-300 hover:z-50 hover:scale-105">
                      <Image
                        src={movie.image}
                        alt={movie.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/20 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                        <h4 className="text-sm font-bold text-white">{movie.title}</h4>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex size-6 items-center justify-center rounded-full border border-white">
                            <Play className="size-3 fill-white" />
                          </div>
                          <div className="flex size-6 items-center justify-center rounded-full border border-white">
                            <Plus className="size-3" />
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-[9px] font-bold text-emerald-400">
                          <span>98% Match</span>
                          <span className="border border-slate-600 px-1 text-white uppercase">
                            HD
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between px-1">
                      <span className="text-[10px] font-bold text-slate-500">
                        Virtual Col {colIndex}
                      </span>
                      <Sparkles className="size-3 text-blue-500/30" />
                    </div>
                  </div>
                )}
              </HorizontalVirtualScroll>
            </div>
          )}
        </VirtualScrollFixed>
      </div>

      {/* Floating Info */}
      <div className="fixed right-12 bottom-6 z-50 rounded-3xl border border-white/20 bg-white/10 px-6 py-4 text-white backdrop-blur-xl">
        <div className="mb-1 text-[10px] font-black tracking-widest text-blue-400 uppercase">
          Architecture Monitoring
        </div>
        <div className="text-xs font-bold text-slate-300">
          100 Channels • 10,000 Nodes • Zero Layout Shift
        </div>
      </div>
    </div>
  );
}
