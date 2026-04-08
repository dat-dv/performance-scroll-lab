"use client";

import React from "react";
import { TechnicalIntro } from "@/components/technical-intro";
import { TechnicalDeepDive } from "@/components/technical-deep-dive";
import { Code } from "lucide-react";

/**
 * Technical documentation for Case 12: Huge Dataset / Nested / Bidirectional.
 */
export function Docs() {
  return (
    <>
      <TechnicalIntro
        title="12. Huge Dataset / Nested / Bidirectional"
        challenges={[
          {
            label: "Nested Event Bubbling",
            description: "Xử lý sự kiện cuộn ngang bên trong một danh sách cuộn dọc khổng lồ.",
          },
          {
            label: "Propagated Scissoring",
            description: "Tối ưu hoá render cho các item nằm sâu trong cấu trúc component lồng nhau.",
          },
        ]}
        solutions={[
          {
            label: "Recycling Shared Context",
            description: "Chia sẻ logic ảo hoá giữa danh sách cha và danh sách con để tiết kiệm tài nguyên.",
          },
          {
            label: "Passive Scroll Listening",
            description: "Sử dụng passive listener để không làm nghẽn Main Thread khi có nhiều vùng cuộn.",
          },
        ]}
      />

      <div className="mb-6 flex items-center gap-2">
        <a
          href="https://github.com/dat-dv/performance-scroll-lab/tree/Master/app/nested-virtualization/page.tsx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 opacity-40 transition-opacity hover:text-blue-500 hover:opacity-100"
        >
          <Code className="size-3" />
          <span className="font-mono text-[10px] font-bold tracking-tight">
            nested-virtualization/page.tsx
          </span>
        </a>
      </div>

      <TechnicalDeepDive
        className="mb-10"
        mainTitle="Ảo hoá Lồng nhau Siêu cấp"
        points={[
          {
            title: "Netflix Layout Pattern",
            colorClass: "text-rose-600 dark:text-rose-400",
            description:
              "Đây là mô hình tiêu chuẩn cho các ứng dụng như Netflix hoặc App Store, nơi một danh sách dọc vô tận chứa hàng trăm danh sách ngang vô tận.",
          },
          {
            title: "Component Isolation",
            colorClass: "text-emerald-600 dark:text-emerald-400",
            description:
              "Mỗi hàng ngang (Row) phải được memoized cực kỳ kỹ lưỡng để tránh re-render thừa thãi khi danh sách dọc di chuyển.",
          },
        ]}
      />
    </>
  );
}
