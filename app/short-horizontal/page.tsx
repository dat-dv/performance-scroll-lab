"use client";

import React from "react";
import { ShortHorizontalDocs } from "./docs";
import { LaboratoryDemoHeader } from "@/components/laboratory-demo-header";

interface Category {
  id: number;
  title: string;
  count: number;
  icon: string;
  color: string;
}

const MOCK_CATEGORIES: Category[] = [
  { id: 1, title: "Architecture", count: 12, icon: "🏛️", color: "from-blue-500 to-cyan-500" },
  { id: 2, title: "Performance", count: 8, icon: "⚡", color: "from-amber-500 to-orange-500" },
  { id: 3, title: "Animation", count: 15, icon: "✨", color: "from-purple-500 to-pink-500" },
  { id: 4, title: "Database", count: 6, icon: "💾", color: "from-emerald-500 to-teal-500" },
  { id: 5, title: "Security", count: 9, icon: "🛡️", color: "from-rose-500 to-red-500" },
  { id: 6, title: "Frontend", count: 24, icon: "🎨", color: "from-indigo-500 to-blue-500" },
];

export default function ShortHorizontalPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pb-20">
        <div className="mx-auto max-w-5xl px-6 pt-12">
          {/* 1. Technical Documentation Section */}
          <ShortHorizontalDocs />

          {/* 2. Live Demo Section */}
          <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-white/5 dark:bg-white/5">
            <LaboratoryDemoHeader
              description={`${MOCK_CATEGORIES.length} Categories • Horizontal Scroll Logic`}
            />

            <div className="p-8">
              <div className="custom-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pt-2 pb-6">
                {MOCK_CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    className="group/card relative min-w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl dark:border-white/5 dark:bg-white/5 dark:hover:border-white/10"
                  >
                    <div
                      className={`mb-4 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} text-2xl shadow-lg`}
                    >
                      {cat.icon}
                    </div>
                    <h4 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">
                      {cat.title}
                    </h4>
                    <p className="mb-4 text-xs font-medium tracking-tighter text-slate-500 uppercase">
                      {cat.count} Experiments
                    </p>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/5">
                      <div
                        className={`h-full bg-gradient-to-r ${cat.color} transition-all duration-1000 group-hover/card:w-full`}
                        style={{ width: `${(cat.count / 25) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
