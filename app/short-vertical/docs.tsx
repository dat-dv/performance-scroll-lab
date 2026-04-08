"use client";

import React from "react";
import { TechnicalIntro } from "@/components/technical-intro";
import { TechnicalDeepDive } from "@/components/technical-deep-dive";
import { Code } from "lucide-react";

export function ShortVerticalDocs() {
  return (
    <>
      <TechnicalIntro
        title="1.1. Short Vertical (Native Map)"
        challenges={[
          {
            label: "Quản lý độ phức tạp",
            description:
              "Nhiều Dev thường mắc lỗi 'Over-engineering' khi áp dụng Windowing cho danh sách nhỏ.",
          },
          {
            label: "Hỗ trợ Browser Features",
            description:
              "Các tính năng như Ctrl+F (Tìm kiếm) hoặc Screen Reader cần toàn bộ DOM để hoạt động.",
          },
          {
            label: "SEO & Indexing",
            description:
              "Bot của Google cần thấy nội dung trực tiếp trong mã nguồn để index tốt hơn.",
          },
        ]}
        solutions={[
          {
            label: "Tận dụng Browser Engine",
            description: "Trình duyệt hiện đại render 100-200 nodes trong chưa đầy 2ms.",
          },
          {
            label: "Native Map Logic",
            description: "Sử dụng .map() nguyên bản giữ code sạch, dễ bảo trì và dễ debug.",
          },
          {
            label: "Zero Overhead",
            description: "Không cần ref, không cần offset calculation, không cần third-party lib.",
          },
        ]}
      />

      <div className="mb-6 flex items-center gap-2">
        <a
          href="https://github.com/dat-dv/performance-scroll-lab/tree/Master/app/short-vertical/page.tsx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 opacity-40 transition-opacity hover:text-blue-500 hover:opacity-100"
        >
          <Code className="size-3" />
          <span className="font-mono text-[10px] font-bold tracking-tight">
            app/short-vertical/page.tsx
          </span>
        </a>
      </div>

      <TechnicalDeepDive
        className="mb-10"
        mainTitle="Tại sao Native Rendering là lựa chọn số 1?"
        points={[
          {
            title: "Performance không chỉ là Windows",
            colorClass: "text-blue-600 dark:text-blue-400",
            description:
              "Với danh sách < 100 items, Virtualization tốn nhiều 'chi phí JS' hơn là 'chi phí Render' của Browser. Native Map là winner tuyệt đối ở quy mô này.",
          },
          {
            title: "Bảo trì và mở rộng",
            colorClass: "text-emerald-600 dark:text-emerald-400",
            description:
              "Thay đổi layout hay thêm tính năng mới cực kỳ đơn giản vì bạn không bị giới hạn bởi logic tính toán tọa độ ảo của thư viện.",
          },
          {
            title: "Trải nghiệm đồng nhất",
            colorClass: "text-purple-600 dark:text-purple-400",
            description:
              "Người dùng có thể dùng thanh cuộn mặc định của hệ điều hành một cách tự nhiên nhất, không bị hiện tượng 'jank' do JS can thiệp.",
          },
        ]}
      />
    </>
  );
}
