"use client";

import React from "react";
import { Docs } from "./docs";
import { LaboratoryDemoHeader } from "@/components/laboratory-demo-header";

const MOCK_CARDS = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  title: `Card Title #${i + 1}`,
  description: i % 3 === 0 
    ? "Mô tả ngắn." 
    : i % 3 === 1 
      ? "Mô tả trung bình để kiểm tra sự co giãn của Card."
      : "Đây là một đoạn mô tả rất dài được viết ra để ép card phải giãn nở tối đa theo chiều dọc, từ đó kiểm tra xem native grid có đồng bộ chiều cao hàng hay không.",
}));

export default function DynamicHeightFixedWidthPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pb-20">
        <div className="mx-auto max-w-5xl px-6 pt-12">
          <Docs />

          <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-white/5 dark:bg-white/5">
            <LaboratoryDemoHeader
              title="3.3. Live Demo: Card Grid"
              description="40 Items • Native CSS Grid • Dynamic Height"
              badgeText="Product Layout"
            />

            <div className="p-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {MOCK_CARDS.map((card) => (
                  <div
                    key={card.id}
                    className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 transition-all hover:border-blue-400 hover:shadow-lg dark:border-white/5 dark:bg-white/5"
                  >
                    <div className="mb-4 text-2xl">📦</div>
                    <h4 className="mb-2 font-bold text-slate-900 dark:text-white leading-tight">
                      {card.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {card.description}
                    </p>
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
