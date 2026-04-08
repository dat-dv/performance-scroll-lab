"use client";

import React from "react";
import { TechnicalIntro } from "@/components/technical-intro";
import { TechnicalDeepDive } from "@/components/technical-deep-dive";
import { Code } from "lucide-react";

export function GridFixedDocs() {
  return (
    <>
      <TechnicalIntro
        title="3.1. Short 2D Grid (Fixed Height - Fixed Width)"
        challenges={[
          {
            label: "Rendering Consistency",
            description: "Đảm bảo mọi item có kích thước pixel-perfect đồng nhất tuyệt đối.",
          },
          {
            label: "Gap Management",
            description: "Xử lý khoảng cách giữa các item một cách đồng đều trên mọi breakpoint.",
          },
        ]}
        solutions={[
          {
            label: "Aspect Ratio Control",
            description: "Sử dụng aspect-square hoặc kích thước w/h cố định để giữ form.",
          },
          {
            label: "CSS Grid Gap",
            description: "Tận dụng thuộc tính gap của CSS Grid để phân bổ không gian tự động.",
          },
        ]}
      />

      <div className="mb-6 flex items-center gap-2">
        <a
          href="https://github.com/dat-dv/performance-scroll-lab/tree/Master/app/short-grid-fixed-height-fixed-width/page.tsx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 opacity-40 transition-opacity hover:text-blue-500 hover:opacity-100"
        >
          <Code className="size-3" />
          <span className="font-mono text-[10px] font-bold tracking-tight">
            short-grid-fixed-height-fixed-width/page.tsx
          </span>
        </a>
      </div>

      <TechnicalDeepDive
        className="mb-10"
        mainTitle="Tối ưu Grid Đồng Nhất"
        points={[
          {
            title: "Performance O(1) Layout",
            colorClass: "text-blue-600 dark:text-blue-400",
            description: "Vì item có kích thước cố định, trình duyệt tính toán vị trí cực kỳ nhanh (Simple Math) so với các layout linh hoạt.",
          },
          {
            title: "Native Map Efficiency",
            colorClass: "text-emerald-600 dark:text-emerald-400",
            description: "Với < 100 items, việc giữ DOM ổn định giúp các hiệu ứng hover và transition đạt 60fps dễ dàng.",
          },
        ]}
      />
    </>
  );
}
