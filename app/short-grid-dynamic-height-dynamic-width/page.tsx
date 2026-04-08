"use client";

import React from "react";
import { Docs } from "./docs";
import { LaboratoryDemoHeader } from "@/components/laboratory-demo-header";
import { Notes } from "./notes";

const MOCK_TILES = Array.from({ length: 80 }, (_, i) => ({
  id: i + 1,
  content:
    i % 4 === 0
      ? "Text ngắn."
      : i % 4 === 1
        ? "Text trung bình để tạo sự khác biệt về chiều cao."
        : i % 4 === 2
          ? "Đây là một đoạn text dài ép card phải giãn nở đáng kể trong layout mosaic."
          : "Nội dung siêu dài: " + "Lorem ipsum dolor sit amet. ".repeat(6),
  color: ["from-blue-500/10", "from-purple-500/10", "from-emerald-500/10", "from-amber-500/10"][
    i % 4
  ],
}));

export default function DynamicHeightDynamicWidthPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pb-20">
        <div className="mx-auto max-w-5xl px-6 pt-12">
          <Docs />

          <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-white/5 dark:bg-white/5">
            <LaboratoryDemoHeader
              title="3.4. Live Demo: Masonry Grid"
              description="40 Tiles • CSS Columns • Dynamic Layout"
              badgeText="Mosaic Style"
            />

            <div className="p-8">
              <div className="custom-scrollbar -mr-4 max-h-[600px] columns-1 gap-4 overflow-y-auto pr-4 sm:columns-2 md:columns-3 lg:columns-4">
                {MOCK_TILES.map((item) => (
                  <div
                    key={item.id}
                    className={`mb-4 flex break-inside-avoid flex-col rounded-2xl border border-slate-100 bg-white bg-gradient-to-br via-transparent to-transparent p-6 transition-all hover:border-blue-400 hover:shadow-xl dark:border-white/5 dark:bg-white/5 ${item.color}`}
                  >
                    <div className="mb-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                      Tile #{item.id}
                    </div>
                    <p className="text-sm leading-relaxed font-medium text-slate-600 dark:text-slate-300">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Notes />
        </div>
      </main>
    </div>
  );
}
