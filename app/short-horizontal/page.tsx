"use client";

import React from "react";
import { ChevronLeft, Info, MousePointer2 } from "lucide-react";
import Link from "next/link";

const MOCK_ITEMS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  title: `Tab Item #${i + 1}`,
  color: [
    "from-blue-500 to-indigo-600",
    "from-emerald-400 to-teal-600",
    "from-rose-400 to-orange-500",
  ][i % 3],
}));

export default function ShortHorizontalDemo() {
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
          Short <span className="text-emerald-600">Horizontal</span>
        </h1>
        <p className="max-w-xl text-lg font-medium text-slate-500 dark:text-slate-400">
          Native horizontal mapping for small datasets. Zero-logic navigation using CSS.
        </p>
      </header>

      <section className="relative -mx-6 overflow-hidden bg-slate-50/50 py-12 dark:bg-white/5">
        {/* 🚀 Pure CSS Horizontal Scroll Container */}
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 scrollbar-hide">
          {MOCK_ITEMS.map((item) => (
            <div
              key={item.id}
              className="w-80 shrink-0 snap-center"
            >
              <div className={`flex h-64 flex-col items-center justify-center rounded-[2.5rem] bg-gradient-to-br p-8 text-center font-bold text-white shadow-xl ${item.color}`}>
                <div className="mb-2 text-[10px] tracking-widest uppercase opacity-70">
                  Native Item
                </div>
                <div className="text-2xl tracking-tight leading-tight">{item.title}</div>
                <div className="mt-4 rounded-full bg-white/20 px-4 py-1 text-sm font-black">
                  ID: {item.id}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
          <MousePointer2 className="size-3" />
          <span>Swipe or Scroll horizontally</span>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4 rounded-3xl border border-slate-200 p-8 dark:border-white/5">
          <Info className="size-6 text-emerald-500" />
          <h2 className="text-xl font-bold">Native Scroll Snap</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Sử dụng <code>snap-x snap-mandatory</code> của Tailwind (CSS) để tạo trải nghiệm mượt mà như native carousel mà không cần thư viện JS nào.
          </p>
        </div>
      </div>
    </div>
  );
}
