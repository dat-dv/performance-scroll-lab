"use client";

import React, { useMemo } from "react";
import { CaseCard } from "@/components/case-card";
import { VirtualizationWizard } from "@/components/filter";
import { cases } from "@/constansts/cases-data";
import { useCaseFilters } from "@/context/filter-context";

/**
 * Main Solutions Page - The hub for all virtualization scenarios.
 * Pattern-based filtering driven by FilterContext.
 */
export default function InfiniteScrollDemo() {
  const { scale, direction, itemSize, resetFilters } = useCaseFilters();

  // Derived filtered results
  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      const matchScale = scale === "all" || c.scale === "all" || c.scale === scale;
      const matchDirection =
        direction === "all" || c.direction === "all" || c.direction === direction;
      const matchItemSize = itemSize === "all" || c.itemSize === "all" || c.itemSize === itemSize;

      // When scale is specifically "short", we only care about direction
      if (scale === "short") return matchScale && matchDirection;

      return matchScale && matchDirection && matchItemSize;
    });
  }, [scale, direction, itemSize]);

  return (
    <main className="relative mx-auto max-w-7xl px-0 py-8 lg:py-16">
      {/* 🚀 Header & Intro Text */}
      <header className="mb-14 px-4 sm:px-6">
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-6xl dark:text-slate-100">
            Infinite Scroll & <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-500 dark:to-indigo-500">
              Virtual DOM
            </span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed font-medium text-slate-500 dark:text-slate-400">
            Xây dựng trải nghiệm cuộn siêu cấp (Ultra-smooth) cho hàng triệu dòng dữ liệu. Sử dụng
            Virtualization (Windowing) để giải phóng tài nguyên CPU & RAM cho trình duyệt.
          </p>
        </div>
      </header>

      {/* 🧩 Intelligence Layer: Selection Wizard */}
      <section className="mb-16 px-4 sm:px-6">
        <VirtualizationWizard />
      </section>

      {/* 📚 Results Grid */}
      <section className="px-4 pb-20 sm:px-6">
        <header className="mb-10 flex items-center justify-between border-b border-slate-200 pb-6 dark:border-white/5">
          <div className="flex flex-col gap-1.5">
            <h2 className="flex items-center gap-3 text-sm font-bold text-slate-500 dark:text-slate-400">
              <div className="size-2.5 rounded-full border border-blue-500/50 bg-blue-500" />
              Matching Solutions ({filteredCases.length})
            </h2>
          </div>

          <button
            onClick={resetFilters}
            className="group flex items-center gap-2 text-xs font-semibold text-slate-500 transition-all hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
          >
            <span>Reset Filters</span>
            <div className="size-1 rounded-full bg-slate-300 group-hover:bg-blue-500 dark:bg-slate-700" />
          </button>
        </header>

        {/* Dynamic Grid without Layout Animations */}
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCases.map((c) => (
            <div key={c.title}>
              <CaseCard item={c} />
            </div>
          ))}
        </ul>
      </section>
    </main>
  );
}
