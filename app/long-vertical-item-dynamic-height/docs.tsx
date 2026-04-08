"use client";

import React from "react";
import { TechnicalIntro } from "@/components/technical-intro";
import { TechnicalDeepDive } from "@/components/technical-deep-dive";
import { Code } from "lucide-react";

/**
 * Technical documentation for Case 5: Huge Dataset / Vertical / Dynamic Height.
 * Explains the complexities of measuring dynamic elements in a virtual list.
 */
export function Docs() {
  return (
    <>
      <TechnicalIntro
        title="5. Huge Dataset / Vertical / Dynamic Height"
        challenges={[
          {
            label: "Layout Uncertainty",
            description: "Mỗi item có độ dài nội dung khác nhau, không thể áp dụng công thức index * height.",
          },
          {
            label: "Scrollbar Jumping",
            description: "Thanh cuộn bị nhảy hoặc giật khi item được đo lường lại kích thước thực tế.",
          },
          {
            label: "Performance Overhead",
            description: "Việc đo lường kích thước liên tục (Measuring) có thể gây lag nếu không tối ưu.",
          },
        ]}
        solutions={[
          {
            label: "Estimated Height",
            description: "Sử dụng một giá trị chiều cao dự đoán (e.g. 100px) cho các item chưa render.",
          },
          {
            label: "ResizeObserver API",
            description: "Tự động cập nhật kích thước chính xác ngay khi item xuất hiện trong DOM.",
          },
          {
            label: "Position Offset Cache",
            description: "Lưu trữ toạ độ Y của từng item vào một mảng đệm để tính toán scroll mượt mà.",
          },
        ]}
      />

      <div className="mb-6 flex items-center gap-2">
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

      <TechnicalDeepDive
        className="mb-10"
        mainTitle="Chiến lược Ảo hóa Dynamic"
        points={[
          {
            title: "Dynamic Measurement",
            colorClass: "text-indigo-600 dark:text-indigo-400",
            description:
              "Không giống như ảo hóa cố định, chúng ta cần render item một cách 'vô hình' để đo lường trước khi đưa vào luồng hiển thị chính thức.",
          },
          {
            title: "Accumulated Offset",
            colorClass: "text-violet-600 dark:text-violet-400",
            description:
              "Tính toán vị trí của item N bằng tổng chiều cao của N-1 item trước đó. Module này đòi hỏi cấu trúc dữ liệu hiệu quả cao.",
          },
          {
            title: "Scroll Anchoring",
            colorClass: "text-rose-600 dark:text-rose-400",
            description:
              "Kỹ thuật cố định vị trí hiển thị khi các item phía trên thay đổi kích thước, ngăn chặn hiện tượng 'content shifting'.",
          },
        ]}
      />
    </>
  );
}
