"use client";

import React from "react";
import { TechnicalIntro } from "@/components/technical-intro";
import { TechnicalDeepDive } from "@/components/technical-deep-dive";
import { Code } from "lucide-react";

/**
 * Technical documentation for Case 7: Huge Dataset / Horizontal / Dynamic Width.
 */
export function Docs() {
  return (
    <>
      <TechnicalIntro
        title="7. Huge Dataset / Horizontal / Dynamic Width"
        challenges={[
          {
            label: "Horizontal Measuring",
            description: "Mỗi item có độ rộng khác nhau, cần đo lường (Measuring) liên tục khi cuộn ngang.",
          },
          {
            label: "X-Shift Correction",
            description: "Cần xử lý hiện tượng nhảy scroll khi item bên trái thay đổi kích thước.",
          },
        ]}
        solutions={[
          {
            label: "Width Pre-estimation",
            description: "Sử dụng độ rộng trung bình cho các item chưa render để vẽ scrollbar sơ bộ.",
          },
          {
            label: "Dynamic X-Positioning",
            description: "Cập nhật toạ độ left của từng item dựa trên tổng width của các item đứng trước.",
          },
        ]}
      />

      <div className="mb-6 flex items-center gap-2">
        <a
          href="https://github.com/dat-dv/performance-scroll-lab/tree/Master/app/long-horizontal-dynamic/page.tsx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 opacity-40 transition-opacity hover:text-blue-500 hover:opacity-100"
        >
          <Code className="size-3" />
          <span className="font-mono text-[10px] font-bold tracking-tight">
            long-horizontal-dynamic/page.tsx
          </span>
        </a>
      </div>

      <TechnicalDeepDive
        className="mb-10"
        mainTitle="Bố cục Hoành Độ Biến Thiên"
        points={[
          {
            title: "ResizeObserver Integration",
            colorClass: "text-amber-600 dark:text-amber-400",
            description:
              "Module này sử dụng ResizeObserver để lắng nghe width của từng phần tử, đảm bảo độ chính xác tuyệt đối.",
          },
          {
            title: "Accumulated Width Caching",
            colorClass: "text-orange-600 dark:text-orange-400",
            description:
              "Việc lưu trữ cache tổng width là cực kỳ quan trọng để duy trì hiệu năng 60fps khi cuộn nhanh.",
          },
        ]}
      />
    </>
  );
}
