"use client";

import React from "react";
import { TechnicalIntro } from "@/components/technical-intro";
import { TechnicalDeepDive } from "@/components/technical-deep-dive";
import { Code } from "lucide-react";

export function Docs() {
  return (
    <>
      <TechnicalIntro
        title="3.3. Short 2D Grid (Dynamic Height - Fixed Width)"
        challenges={[
          {
            label: "Content Variance",
            description: "Xử lý item có lượng text khác nhau mà không làm vỡ cấu trúc grid.",
          },
          {
            label: "Equal Heights",
            description:
              "Làm sao để các card trong cùng một hàng có chiều cao đồng nhất một cách tự động.",
          },
        ]}
        solutions={[
          {
            label: "CSS Grid Stretch",
            description: "Tận dụng thuộc tính mặc định align-items: stretch của CSS Grid.",
          },
          {
            label: "1fr Rows",
            description:
              "Sử dụng grid-template-rows để ép item tự co giãn theo item cao nhất trong hàng.",
          },
        ]}
      />

      <div className="mb-6 flex items-center gap-2">
        <a
          href="https://github.com/dat-dv/performance-scroll-lab/tree/Master/app/short-grid-dynamic-height-fixed-width/page.tsx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 opacity-40 transition-opacity hover:text-blue-500 hover:opacity-100"
        >
          <Code className="size-3" />
          <span className="font-mono text-[10px] font-bold tracking-tight">
            short-grid-dynamic-height-fixed-width/page.tsx
          </span>
        </a>
      </div>

      <TechnicalDeepDive
        className="mb-10"
        mainTitle="Bố cục Product Grid"
        points={[
          {
            title: "Smart Row Calculation",
            colorClass: "text-blue-600 dark:text-blue-400",
            description:
              "Trình duyệt tự động xác định 'item cao nhất' trong mỗi hàng và đồng bộ cho các item còn lại, đảm bảo sự ngăn nắp.",
          },
          {
            title: "No JS Required",
            colorClass: "text-emerald-600 dark:text-emerald-400",
            description:
              "Tính toán chiều cao được thực hiện ở mức Engine, giúp scroll cực kỳ mượt mà kể cả khi nội dung nặng.",
          },
        ]}
      />
    </>
  );
}
