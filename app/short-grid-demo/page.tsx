"use client";

import React from "react";
import { ChevronLeft, Info, Grid3X3 } from "lucide-react";
import Link from "next/link";

const MOCK_ITEMS = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  title: `#${i + 1}`,
  color: [
    "bg-red-400",
    "bg-blue-400",
    "bg-emerald-400",
    "bg-amber-400",
    "bg-purple-400",
    "bg-teal-400",
  ][i % 6],
}));

export default function ShortGridDemo() {
  return (
    <div className="min-h-screen space-y-12 pb-20">
      <header className="space-y-4">
        <Link
          href="/"
          className="flex w-fit items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600"
        >
          <ChevronLeft className="size-4" />
          <span>BACK TO SOLUTIONS</span>
        </Link>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Short <span className="text-purple-600">Bidirectional List</span>
        </h1>
        <p className="max-w-xl text-lg font-medium text-slate-500 dark:text-slate-400">
          Native 2D navigation (Map/Sheet style). Scrolls across both X and Y axis without
          virtualization.
        </p>
      </header>

      <section className="relative -mx-6 bg-slate-50/50 px-6 py-12 dark:bg-white/5">
        {/* 🚀 Bidirectional Scroll Viewport */}
        <div className="mx-auto h-[500px] max-w-2xl overflow-auto rounded-[2.5rem] border-4 border-white bg-slate-100 shadow-2xl dark:border-white/5 dark:bg-black/40">
          <div className="inline-grid grid-cols-10 gap-2 p-4" style={{ width: "1200px" }}>
            {MOCK_ITEMS.map((item) => (
              <div
                key={item.id}
                className={`flex aspect-square w-24 flex-col items-center justify-center rounded-2xl p-2 text-center font-bold text-white shadow-md transition-all hover:scale-105 ${item.color}`}
              >
                <div className="text-[9px] font-black tracking-widest uppercase opacity-40">
                  Card
                </div>
                <div className="text-lg leading-tight font-black tracking-tighter">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
          <Grid3X3 className="size-3" />
          <span>Scroll in all directions (X + Y)</span>
        </div>
      </section>
    </div>
  );
}
