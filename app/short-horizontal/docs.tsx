"use client";

import { TechnicalIntro } from "@/components/technical-intro";
import { TechnicalDeepDive } from "@/components/technical-deep-dive";
import { Code } from "lucide-react";

export function ShortHorizontalDocs() {
  return (
    <>
      <TechnicalIntro
        title="1.2. Short Horizontal (Native Map)"
        challenges={[
          {
            label: "Trải nghiệm cuộn",
            description:
              "Cuộn ngang trên desktop bằng chuột thường gây khó khăn nếu không có trackpad.",
          },
          {
            label: "Cắt nội dung (Clipping)",
            description: "Đảm bảo nội dung không bị dính sát mép và có không gian 'thở' khi cuộn.",
          },
          {
            label: "Snap behavior",
            description: "Dừng đúng vị trí item khi người dùng 'vuốt' (swipe) trên mobile.",
          },
        ]}
        solutions={[
          {
            label: "CSS Scroll Snap",
            description: "Sử dụng scroll-snap-type để tạo hiệu ứng 'trượt' mượt mà như app native.",
          },
          {
            label: "Overflow-X Management",
            description: "Giữ cho thanh cuộn luôn khả dụng nhưng vẫn thẩm mỹ trên mọi OS.",
          },
          {
            label: "Flexbox/Gap Layout",
            description:
              "Tận dụng gap và padding để tạo khoảng cách đồng nhất mà không cần tính toán JS.",
          },
        ]}
      />

      <div className="mb-6 flex items-center gap-2">
        <a
          href="https://github.com/dat-dv/performance-scroll-lab/tree/Master/app/short-horizontal/page.tsx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 opacity-40 transition-opacity hover:text-blue-500 hover:opacity-100"
        >
          <Code className="size-3" />
          <span className="font-mono text-[10px] font-bold tracking-tight">
            app/short-horizontal/page.tsx
          </span>
        </a>
      </div>

      <TechnicalDeepDive
        className="mb-10"
        mainTitle="Tối ưu trải nghiệm cuộn ngang"
        points={[
          {
            title: "Tại sao không Virtualize theo chiều ngang?",
            colorClass: "text-blue-600 dark:text-blue-400",
            description:
              "Tầm nhìn của con người hạn chế theo chiều ngang. Hầu hết các app chỉ hiển thị < 20 items (Categories, Story, Tabs). Ở mức này, CSS là vua.",
          },
          {
            title: "Ưu tiên Mobile Performance",
            colorClass: "text-emerald-600 dark:text-emerald-400",
            description:
              "Cuộn ngang native sử dụng GPU acceleration của trình duyệt, giúp thao tác vuốt trơn tru 60fps mà không cần tốn main-thread cho JS.",
          },
          {
            title: "Scroll Snap - Bí kíp UX",
            colorClass: "text-purple-600 dark:text-purple-400",
            description:
              "Bằng cách cho phép browser kiểm soát 'hít' item, bạn đảm bảo item luôn nằm đúng tầm mắt người dùng.",
          },
        ]}
      />
    </>
  );
}
