"use client";

import React from "react";
import { GridFixedDocs } from "./docs";
import { LaboratoryDemoHeader } from "@/components/laboratory-demo-header";

const MOCK_ICONS = Array.from({ length: 150 }, (_, i) => ({
  id: i + 1,
  emoji: ["🚀", "✨", "🔥", "🌈", "🛡️", "📦", "🧩", "⚡"][i % 8],
  label: `Item ${i + 1}`,
}));

export default function FixedHeightFixedWidthPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pb-20">
        <div className="mx-auto max-w-5xl px-6 pt-12">
          {/* 1. Technical Documentation Section */}
          <GridFixedDocs />

          {/* 2. Live Demo Section */}
          <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-white/5 dark:bg-white/5">
            <LaboratoryDemoHeader
              title="3.1. Live Demo: Fixed Size Grid"
              description="150 Items • Native CSS Grid • Aspect Square"
              badgeText="Uniform Layout"
            />

            <div className="p-8">
              <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {MOCK_ICONS.map((item) => (
                  <div
                    key={item.id}
                    className="group/item flex aspect-square flex-col items-center justify-center rounded-2xl border border-slate-100 bg-slate-50/50 transition-all hover:border-blue-400 hover:bg-white hover:shadow-xl dark:border-white/5 dark:bg-white/5 dark:hover:border-blue-500/30"
                  >
                    <span className="text-2xl transition-transform group-hover/item:scale-125">
                      {item.emoji}
                    </span>
                    <span className="mt-2 text-[8px] font-bold text-slate-400 uppercase tracking-tighter">
                      ID: {item.id}
                    </span>
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
