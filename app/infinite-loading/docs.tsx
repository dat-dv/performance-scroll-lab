"use client";

import React from "react";
import { TechnicalIntro } from "@/components/technical-intro";
import { TechnicalDeepDive } from "@/components/technical-deep-dive";
import { Code } from "lucide-react";

/**
 * Technical documentation for Case 10: Huge Dataset / Combined / Infinite Loading.
 */
export function Docs() {
  return (
    <>
      <TechnicalIntro
        title="10. Huge Dataset / Infinite Loading"
        challenges={[
          {
            label: "Bidirectional Data Fetch",
            description: "Cần tải dữ liệu (Fetching) khi người dùng cuộn tới cuối hoặc đầu danh sách.",
          },
          {
            label: "Loading State Isolation",
            description: "Hiển thị trạng thái Loading mà không làm gián đoạn trải nghiệm cuộn.",
          },
        ]}
        solutions={[
          {
            label: "Sentinel Pattern",
            description: "Sử dụng IntersectionObserver để phát hiện điểm cuối và kích hoạt tải dữ liệu.",
          },
          {
            label: "FlatList Strategy",
            description: "Kết hợpảo hoá với cơ chế gom nhóm (Batching) dữ liệu từ API.",
          },
        ]}
      />

      <div className="mb-6 flex items-center gap-2">
        <a
          href="https://github.com/dat-dv/performance-scroll-lab/tree/Master/app/infinite-loading/page.tsx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 opacity-40 transition-opacity hover:text-blue-500 hover:opacity-100"
        >
          <Code className="size-3" />
          <span className="font-mono text-[10px] font-bold tracking-tight">
            infinite-loading/page.tsx
          </span>
        </a>
      </div>

      <TechnicalDeepDive
        className="mb-10"
        mainTitle="Chiến lược Tải Vô Tận"
        points={[
          {
            title: "Data Re-concilation",
            colorClass: "text-indigo-600 dark:text-indigo-400",
            description:
              "Kỹ thuật hợp nhất dữ liệu mới từ API vào cache ảo hoá một cách tinh tế để tránh layout shift.",
          },
          {
            title: "Skeleton Interaction",
            colorClass: "text-blue-600 dark:text-blue-400",
            description:
              "Placeholder (Skeleton) phải có kích thước tương đồng với item thực tế để giữ cho thanh cuộn ổn định.",
          },
        ]}
      />
    </>
  );
}
