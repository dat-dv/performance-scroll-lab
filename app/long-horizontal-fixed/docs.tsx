"use client";

import React from "react";
import { TechnicalIntro } from "@/components/technical-intro";
import { TechnicalDeepDive } from "@/components/technical-deep-dive";
import { Code } from "lucide-react";

/**
 * Technical documentation for Case 6: Huge Dataset / Horizontal / Fixed Width.
 */
export function Docs() {
  return (
    <>
      <TechnicalIntro
        title="6. Huge Dataset / Horizontal / Fixed Width"
        challenges={[
          {
            label: "X-Axis Virtualization",
            description: "Tính toán vị trí hiển thị theo chiều ngang (left offset) thay vì chiều dọc.",
          },
          {
            label: "Container Width",
            description: "Ép chiều rộng container (Scroll Width) cực lớn mà không làm treo trình duyệt.",
          },
        ]}
        solutions={[
          {
            label: "O(1) Positioning",
            description: "Sử dụng transform: translateX() để đặt item chính xác theo pixel.",
          },
          {
            label: "Lazy Side Rendering",
            description: "Chỉ render các item nằm trong 'overscan' buffer ở hai bên trái/phải viewport.",
          },
        ]}
      />

      <div className="mb-6 flex items-center gap-2">
        <a
          href="https://github.com/dat-dv/performance-scroll-lab/tree/Master/app/long-horizontal-fixed/page.tsx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 opacity-40 transition-opacity hover:text-blue-500 hover:opacity-100"
        >
          <Code className="size-3" />
          <span className="font-mono text-[10px] font-bold tracking-tight">
            long-horizontal-fixed/page.tsx
          </span>
        </a>
      </div>

      <TechnicalDeepDive
        className="mb-10"
        mainTitle="Tối ưu Hoá cuộn ngang"
        points={[
          {
            title: "Fixed Width Math",
            colorClass: "text-blue-600 dark:text-blue-400",
            description:
              "Vì mỗi item có width cố định, việc tính toán `startIndex` chỉ đơn giản là `Math.floor(scrollLeft / itemWidth)`.",
          },
          {
            title: "Hardware Acceleration",
            colorClass: "text-emerald-600 dark:text-emerald-400",
            description:
              "Sử dụng translate3d để đẩy việc render sang GPU, giúp cuộn mượt mà ngay cả với hàng trăm ngàn item.",
          },
        ]}
      />
    </>
  );
}
