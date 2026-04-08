"use client";

import React from "react";
import { TechnicalIntro } from "@/components/technical-intro";
import { TechnicalDeepDive } from "@/components/technical-deep-dive";
import { CodeBlock } from "@/components/code-block";
import { Code, ExternalLink } from "lucide-react";

/**
 * Case 5: Technical documentation for Dynamic Height Virtualization.
 * Content provided by the USER regarding advanced position management and performance hooks.
 */
export function Docs() {
  return (
    <div className="space-y-16 pb-24">
      {/* 1. Introduction & Overview */}
      <TechnicalIntro
        title="5. Huge Dataset / Vertical / Dynamic Height"
        challenges={[
          {
            label: "Layout Uncertainty",
            description:
              "Mỗi item có độ dài nội dung khác nhau, không thể áp dụng công thức index * height.",
          },
          {
            label: "Scrollbar Jumping",
            description:
              "Thanh cuộn bị nhảy hoặc giật khi item được đo lường lại kích thước thực tế.",
          },
          {
            label: "Performance Overhead",
            description:
              "Việc đo lường kích thước liên tục (Measuring) có thể gây lag nếu không tối ưu.",
          },
        ]}
        solutions={[
          {
            label: "Estimated Height",
            description:
              "Sử dụng một giá trị chiều cao dự đoán (e.g. 100px) cho các item chưa render.",
          },
          {
            label: "ResizeObserver API",
            description: "Lắng nghe thay đổi kích thước thực tế của DOM Node một cách bất đồng bộ.",
          },
          {
            label: "Position Offset Cache",
            description:
              "Lưu trữ toạ độ Y của từng item vào một mảng đệm để tính toán scroll mượt mà.",
          },
        ]}
      />

      <div className="-mt-8 flex items-center gap-2">
        <a
          href="https://github.com/dat-dv/performance-scroll-lab/tree/Master/app/long-vertical-item-dynamic-height/page.tsx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 opacity-40 transition-opacity hover:text-blue-500 hover:opacity-100"
        >
          <Code className="size-3" />
          <span className="font-mono text-[10px] font-bold tracking-tight">
            long-vertical-item-dynamic-height/page.tsx
          </span>
        </a>
      </div>

      {/* 2. Deep Dive Sections */}
      <div className="space-y-12">
        <TechnicalDeepDive
          mainTitle="Kiến trúc Quản lý Vị trí (Position Manager)"
          points={[
            {
              title: "Metadata Caching with O(logn)",
              colorClass: "text-blue-600 dark:text-blue-400",
              description:
                "Thay vì dùng vòng lặp, chúng ta sử dụng Binary Search trên mảng metadata {index, height, offsetTop} để tìm startIndex cực nhanh, ngay cả với 100,000 items.",
            },
            {
              title: "Scroll Anchoring & Delta Correction",
              colorClass: "text-emerald-600 dark:text-emerald-400",
              description:
                "Để tránh nhảy scrollbar, khi item phía trên thay đổi kích thước, ta phải lập tức bù đắp (delta) vào scrollTop của container.",
            },
          ]}
        />

        <TechnicalDeepDive
          mainTitle="Tối ưu Hoá Rendering & Browser"
          points={[
            {
              title: "Content Visibility auto",
              colorClass: "text-purple-600 dark:text-purple-400",
              description:
                "Kết hợp Virtual Scroll với content-visibility: auto để trình duyệt bỏ qua việc render layout cho các phần tử ngoài màn hình nhưng vẫn giữ trạng thái hình học.",
            },
            {
              title: "ResizeObserver Batching",
              colorClass: "text-amber-600 dark:text-amber-400",
              description:
                "Sử dụng một Observer duy nhất phối hợp với requestAnimationFrame (rAF) để batch các cập nhật kích thước, tránh gây ra Forced Reflow liên tục.",
            },
          ]}
        />
      </div>

      {/* 3. Implementation Logic (Code Example) */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Core Position Management Logic
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Mô phỏng logic xử lý Cache và cập nhật Offset khi kích thước thực tế thay đổi.
          </p>
        </div>
        <CodeBlock
          language="typescript"
          code={`interface ItemMeta {
  index: number;
  height: number;
  offsetTop: number;
}

class VirtualPositionManager {
  private cache: ItemMeta[] = [];
  private estimatedHeight: number;

  constructor(count: number, estimatedHeight: number) {
    this.estimatedHeight = estimatedHeight;
    // Khởi tạo cache với giá trị dự đoán
    for (let i = 0; i < count; i++) {
      this.cache.push({
        index: i,
        height: estimatedHeight,
        offsetTop: i * estimatedHeight
      });
    }
  }

  // Cập nhật khi ResizeObserver tìm thấy kích thước thực
  updateItemHeight(index: number, realHeight: number) {
    const diff = realHeight - this.cache[index].height;
    if (diff === 0) return;

    this.cache[index].height = realHeight;
    // Cập nhật lại offset cho tất cả các item phía sau (Prefix Sum update)
    // Trong thực tế có thể tối ưu bằng Segment Tree hoặc Binary Indexed Tree để đạt O(logn) cập nhật
    for (let i = index + 1; i < this.cache.length; i++) {
        this.cache[i].offsetTop += diff;
    }
  }

  // Dùng Binary Search để tìm item hiển thị đầu tiên
  findStartIndex(scrollTop: number) {
     // Binary Search logic on this.cache based on offsetTop
     let low = 0, high = this.cache.length - 1;
     while (low <= high) {
         const mid = Math.floor((low + high) / 2);
         if (this.cache[mid].offsetTop <= scrollTop) low = mid + 1;
         else high = mid - 1;
     }
     return high >= 0 ? high : 0;
  }
}`}
        />
      </div>

      {/* 4. References & Learning Resources */}
      <div className="rounded-3xl border border-blue-100 bg-blue-50/30 p-8 dark:border-blue-500/10 dark:bg-blue-500/5">
        <h4 className="mb-6 flex items-center gap-2 text-sm font-bold tracking-widest text-blue-600 uppercase dark:text-blue-400">
          <ExternalLink className="size-4" />
          Tài liệu Tham khảo chuyên sâu
        </h4>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ReferenceItem
            title="TanStack Virtual"
            description="Mạnh về headless logic và dynamic measurement, tiêu chuẩn cho React hiện đại."
            link="https://tanstack.com/virtual"
          />
          <ReferenceItem
            title="React Virtuoso"
            description="Thư viện xử lý dynamic height tốt nhất hiện nay, giải quyết cực tốt vấn đề nhảy scrollbar."
            link="https://virtuoso.dev/"
          />
        </div>
      </div>
    </div>
  );
}

function ReferenceItem({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group space-y-2 rounded-2xl border border-slate-200/60 bg-white p-5 transition-all hover:border-blue-300 hover:shadow-md dark:border-white/5 dark:bg-slate-900"
    >
      <div className="flex items-center justify-between">
        <span className="font-bold text-slate-900 dark:text-white">{title}</span>
        <ExternalLink className="size-3 text-slate-400 transition-colors group-hover:text-blue-500" />
      </div>
      <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
    </a>
  );
}
