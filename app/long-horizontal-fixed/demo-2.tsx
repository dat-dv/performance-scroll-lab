"use client";

import HorizontalVirtualScroll from "@/libs/virtual-scroll/horizontal-scroll-fixed-width";
import { useState, useMemo } from "react";
import { delay } from "@/libs/delay";
import { createMockItems } from "./mock-data";
import { Layers } from "lucide-react";

export default function DemoMultiRow() {
  const ROWS_COUNT = 10; // Số hàng trong mỗi nhóm
  const INITIAL_COLS = 40; // Số cột (Group) ban đầu

  const [rawData, setRawData] = useState(() => {
    // Tạo 40 cột, mỗi cột là 1 Group chứa 10 hàng
    return new Array(INITIAL_COLS).fill(0).map(() => createMockItems(ROWS_COUNT));
  });
  const [loading, setLoading] = useState(false);

  const handleEndReached = async () => {
    if (loading) return;
    setLoading(true);
    await delay(1500);
    // Tải thêm 20 cột (mỗi cột có 10 hàng)
    setRawData((prev) => [
      ...prev,
      ...new Array(20).fill(0).map(() => createMockItems(ROWS_COUNT)),
    ]);
    setLoading(false);
  };

  const hasNext = rawData.length < 100; // Giới hạn 100 cột để test

  return (
    <div className="min-h-screen space-y-12 pb-20">
      <section className="relative -mx-6 overflow-visible rounded-[3rem] bg-slate-100/50 px-6 py-16 dark:bg-white/5">
        <div className="mb-6 flex items-center gap-3 px-10">
          <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600">
            <Layers className="size-5" />
          </div>
          <div>
            <h4 className="text-sm font-black tracking-tight dark:text-white">
              Multi-row Horizontal Grid
            </h4>
            <p className="text-[10px] font-medium tracking-widest text-slate-500 uppercase">
              Technique: Data Chunking
            </p>
          </div>
        </div>

        <HorizontalVirtualScroll
          items={rawData}
          overscan={4}
          onEndReached={handleEndReached}
          isLoadingMore={loading}
          hasNext={hasNext}
        >
          {({ item: columnItems, index: colIndex }) => (
            <div className="flex h-full flex-col gap-4 px-3">
              {columnItems.map((subItem, rowIndex) => (
                <div
                  key={`${colIndex}-${rowIndex}`}
                  className="group flex-1 cursor-pointer rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-emerald-500 hover:shadow-xl dark:border-white/10 dark:bg-slate-900"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-black text-slate-400">
                      R{rowIndex + 1} C{colIndex + 1}
                    </span>
                    <div className="size-2 rounded-full bg-emerald-500 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <div className="mt-4">
                    <h5 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                      {subItem.title}
                    </h5>
                    <p className="mt-1 text-[10px] text-slate-500">ID: {subItem.id}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </HorizontalVirtualScroll>

        {/* Indicator */}
        <div className="absolute bottom-6 left-10 flex items-center gap-2">
          <div className="h-1 w-12 rounded-full bg-emerald-500" />
          <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
            {rawData.length} Columns • Total {rawData.length * ROWS_COUNT} items
          </span>
        </div>
      </section>
    </div>
  );
}
