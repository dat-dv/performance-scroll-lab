"use client";

import React, { useMemo } from "react";
import VirtualGridFixedSize from "@/libs/virtual-scroll/grid-fixed-size";
import { Grid3X3, MousePointer2 } from "lucide-react";

export default function Demo2D() {
  // Tạo ma trận 1,000 x 1,000 (1 triệu ô)
  const data = useMemo(() => {
    return Array.from({ length: 1000 }, (_, r) =>
      Array.from({ length: 1000 }, (_, c) => ({
        id: `${r}-${c}`,
        value: Math.floor(Math.random() * 1000),
        label: `R${r} C${c}`,
      }))
    );
  }, []);

  return (
    <div className="space-y-8 py-10">
      <div className="flex flex-col gap-4 px-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-blue-500 uppercase">
            <Grid3X3 className="size-4" />
            2D Sparse Matrix Demo
          </div>
          <h3 className="text-xl font-black tracking-tight dark:text-white">
            Rendering 1,000,000 Points
          </h3>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold tracking-tighter text-slate-400 uppercase">
              GPU Load
            </span>
            <span className="text-xs font-black text-emerald-500">OPTIMAL</span>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-white/10" />
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold tracking-tighter text-slate-400 uppercase">
              Memory
            </span>
            <span className="text-xs font-black text-blue-500">~24MB</span>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-4 shadow-xl dark:border-white/5 dark:bg-slate-900">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 size-64 rounded-full bg-blue-500/5 blur-[80px]" />

        <VirtualGridFixedSize
          data={data}
          columnWidth={120}
          rowHeight={80}
          height={600}
          overscan={3}
          className="bg-slate-50/50 dark:bg-black/20"
        >
          {({ item }) => (
            <div className="flex h-full w-full items-center justify-center p-1">
              <div className="flex h-full w-full flex-col justify-center rounded-xl border border-slate-200 bg-white px-3 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50 dark:border-white/5 dark:bg-white/5 dark:hover:bg-blue-500/10">
                <span className="text-[9px] font-black text-slate-400">{item.label}</span>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.value}
                  </span>
                  <div className="size-1.5 rounded-full bg-blue-500/30" />
                </div>
              </div>
            </div>
          )}
        </VirtualGridFixedSize>

        {/* Interaction Indicator */}
        <div className="pointer-events-none absolute right-10 bottom-10 flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-2 text-[10px] font-black tracking-widest text-white uppercase opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
          <MousePointer2 className="size-3" />
          Smooth Bidirectional Scroll
        </div>
      </div>

      <div className="rounded-3xl border border-blue-500/10 bg-blue-500/5 p-6">
        <p className="text-sm leading-relaxed font-medium text-blue-600 dark:text-blue-400">
          <b>Kiểm chứng:</b> Dù ma trận có 1 triệu phần tử, DOM chỉ render khoảng 60-80 ô cùng lúc
          (tuỳ vào overscan). Điều này giúp trình duyệt duy trì FPS ở mức 60 ngay cả trên các thiết
          bị trung bình.
        </p>
      </div>
    </div>
  );
}
