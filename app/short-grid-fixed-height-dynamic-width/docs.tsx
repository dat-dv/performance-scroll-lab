"use client";

import React from "react";
import { TechnicalIntro } from "@/components/technical-intro";
import { TechnicalDeepDive } from "@/components/technical-deep-dive";
import { Code } from "lucide-react";

export function Docs() {
  return (
    <>
      <TechnicalIntro
        title="3.2. Short 2D Grid (Fixed Height - Dynamic Width)"
        challenges={[
          { label: "Text Wrapping", description: "Xử lý việc các item có chiều rộng khác nhau wrap xuống dòng mượt mà." },
          { label: "Vertical Rhythm", description: "Đảm bảo khoảng cách dọc giữa các dòng item luôn đồng nhất." },
        ]}
        solutions={[
          { label: "Flex Wrap", description: "Sử dụng display: flex và flex-wrap: wrap để tận dụng cơ chế dồn item của browser." },
          { label: "Fixed Line Height", description: "Cố định chiều cao item (h-9, h-10) để giữ sự ngăn nắp cho layout." },
        ]}
      />

      <div className="mb-6 flex items-center gap-2">
        <a
          href="https://github.com/dat-dv/performance-scroll-lab/tree/Master/app/short-grid-fixed-height-dynamic-width/page.tsx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 opacity-40 transition-opacity hover:text-blue-500 hover:opacity-100"
        >
          <Code className="size-3" />
          <span className="font-mono text-[10px] font-bold tracking-tight">
            short-grid-fixed-height-dynamic-width/page.tsx
          </span>
        </a>
      </div>

      <TechnicalDeepDive
        className="mb-10"
        mainTitle="Kỹ thuật Tag Cloud"
        points={[
          { title: "Intrinsic Sizing", colorClass: "text-blue-600 dark:text-blue-400", description: "Item tự động nở rộng theo nội dung text bên trong (width: auto)." },
          { title: "Smart Wrapping", colorClass: "text-emerald-600 dark:text-emerald-400", description: "Native Browser Layout xử lý việc đẩy item xuống hàng mới cực kỳ tối ưu, không cần JS tính toán breakpoint." },
        ]}
      />
    </>
  );
}
