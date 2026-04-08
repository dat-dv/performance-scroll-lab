"use client";

import React from "react";
import { TechnicalIntro } from "@/components/technical-intro";
import { TechnicalDeepDive } from "@/components/technical-deep-dive";
import { Code } from "lucide-react";

/**
 * Technical documentation for Case 8: Huge Dataset / 2D Grid / Fixed Size.
 */
export function Docs() {
  return (
    <>
      <TechnicalIntro
        title="8. Huge Dataset / 2D Grid / Fixed Size"
        challenges={[
          {
            label: "Bidirectional Scissoring",
            description: "Tính toán item nằm trong vùng giao thoa của cả trục X và trục Y.",
          },
          {
            label: "Matrix Mapping",
            description: "Ánh xạ index phẳng (flat index) sang toạ độ (row, col) một cách tối ưu.",
          },
        ]}
        solutions={[
          {
            label: "Virtual Viewport Window",
            description: "Chỉ render item xuất hiện trong 'khung cửa sổ' (Rect) của viewport.",
          },
          {
            label: "Absolute Grid Positioning",
            description: "Sử dụng position: absolute để đặt item vào toạ độ X,Y đã tính toán.",
          },
        ]}
      />

      <div className="mb-6 flex items-center gap-2">
        <a
          href="https://github.com/dat-dv/performance-scroll-lab/tree/Master/app/grid-fixed/page.tsx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 opacity-40 transition-opacity hover:text-blue-500 hover:opacity-100"
        >
          <Code className="size-3" />
          <span className="font-mono text-[10px] font-bold tracking-tight">
            grid-fixed/page.tsx
          </span>
        </a>
      </div>

      <TechnicalDeepDive
        className="mb-10"
        mainTitle="Ảo hóa 2 Chiều Cố Định"
        points={[
          {
            title: "Grid Calculation O(1)",
            colorClass: "text-blue-600 dark:text-blue-400",
            description:
              "Với item kích thước cố định, chúng ta có thể biết ngay item tại (row, col) bất kỳ bằng các phép toán chia lấy dư đơn giản.",
          },
          {
            title: "Memory Footprint",
            colorClass: "text-cyan-600 dark:text-cyan-400",
            description:
              "Kỹ thuật này giúp xử lý hàng triệu ô dữ liệu (như Excel) mà chỉ tiêu tốn vài MB RAM do số lượng DOM Node luôn hữu hạn.",
          },
        ]}
      />
    </>
  );
}
