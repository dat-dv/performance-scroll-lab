"use client";

import React from "react";
import { TechnicalIntro } from "@/components/technical-intro";
import { TechnicalDeepDive } from "@/components/technical-deep-dive";
import { Code } from "lucide-react";

export function Docs() {
  return (
    <>
      <TechnicalIntro
        title="3.4. Small Dataset / Grid / Dynamic Axis"
        challenges={[
          {
            label: "Packing Density",
            description:
              "Lấp đầy các khoảng trống trong layout khi item có kích thước hoàn toàn ngẫu nhiên.",
          },
          {
            label: "Layout Jitters",
            description:
              "Ngăn chặn hiện tượng 'nhảy' layout khi các item có kích thước biến thiên được render.",
          },
        ]}
        solutions={[
          {
            label: "CSS Columns",
            description: "Sử dụng multi-column layout để tạo Masonry mà không cần JS Calculation.",
          },
          {
            label: "Break Inside Avoid",
            description:
              "Sử dụng break-inside-avoid để đảm bảo item không bị cắt đôi giữa các cột.",
          },
        ]}
      />

      <div className="mb-6 flex items-center gap-2">
        <a
          href="https://github.com/dat-dv/performance-scroll-lab/tree/Master/app/short-grid-dynamic-height-dynamic-width/page.tsx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 opacity-40 transition-opacity hover:text-blue-500 hover:opacity-100"
        >
          <Code className="size-3" />
          <span className="font-mono text-[10px] font-bold tracking-tight">
            short-grid-dynamic-height-dynamic-width/page.tsx
          </span>
        </a>
      </div>

      <TechnicalDeepDive
        className="mb-10"
        mainTitle="Bố cục Masonry Mosaic"
        points={[
          {
            title: "Vertical Continuity",
            colorClass: "text-purple-600 dark:text-purple-400",
            description:
              "Các item được dồn theo chiều dọc trước, tạo nên dòng chảy thông tin tự nhiên như Pinterest.",
          },
          {
            title: "Native Scalability",
            colorClass: "text-pink-600 dark:text-pink-400",
            description:
              "Tận dụng GPU để handle việc sắp xếp, giúp animation khi resize màn hình cực kỳ mượt mà.",
          },
        ]}
      />
    </>
  );
}
