"use client";

import React from "react";
import { TechnicalIntro } from "@/components/technical-intro";
import { TechnicalDeepDive } from "@/components/technical-deep-dive";
import { Code } from "lucide-react";

/**
 * Technical documentation for Case 9: Huge Dataset / 2D Grid / Dynamic Size.
 */
export function Docs() {
  return (
    <>
      <TechnicalIntro
        title="9. Huge Dataset / 2D Grid / Dynamic Size"
        challenges={[
          {
            label: "Variable 2D Measuring",
            description: "Số lượng cột và hàng không cố định, item có thể có kích thước khác nhau hoàn toàn.",
          },
          {
            label: "Complex Scroll Sync",
            description: "Thanh cuộn dọc và ngang phải đồng bộ với logic đo lường kích thước động.",
          },
        ]}
        solutions={[
          {
            label: "Staggered Measurement",
            description: "Đo lường kích thước item khi chúng lọt vào viewport ảo.",
          },
          {
            label: "2D Offset Caching",
            description: "Lưu trữ toạ độ (x, y) dựa trên kích thước của các hàng/cột phía trước.",
          },
        ]}
      />

      <div className="mb-6 flex items-center gap-2">
        <a
          href="https://github.com/dat-dv/performance-scroll-lab/tree/Master/app/grid-dynamic/page.tsx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 opacity-40 transition-opacity hover:text-blue-500 hover:opacity-100"
        >
          <Code className="size-3" />
          <span className="font-mono text-[10px] font-bold tracking-tight">
            grid-dynamic/page.tsx
          </span>
        </a>
      </div>

      <TechnicalDeepDive
        className="mb-10"
        mainTitle="Bố cục 2D Dynamic"
        points={[
          {
            title: "Masonry Virtualization",
            colorClass: "text-purple-600 dark:text-purple-400",
            description:
              "Kỹ thuật tối thượng để ảo hoá các thư viện ảnh (Pinterest style) với hàng triệu item có tỷ lệ khung hình khác nhau.",
          },
          {
            title: "Performance Bottlenecks",
            colorClass: "text-rose-600 dark:text-rose-400",
            description:
              "Ở cấp độ này, việc tối ưu JS Execution Time (Time Slicing) là bắt buộc để tránh drop frame khi cuộn chéo (Diagonal Scrolling).",
          },
        ]}
      />
    </>
  );
}
