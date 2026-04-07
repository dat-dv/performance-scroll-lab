"use client";

import React from "react";
import { TechnicalIntro } from "../TechnicalIntro";
import { TechnicalDeepDive } from "../TechnicalDeepDive";

export function LoadMoreObserverDocs() {
  return (
    <>
      <TechnicalIntro
        title="Load More with IntersectionObserver"
        challenges={[
          {
            label: "Dư thừa DOM",
            description: "Mỗi khi append dữ liệu, số lượng DOM Node tăng dần. Nếu danh sách quá lớn (>1000), trình duyệt sẽ bắt đầu lag.",
          },
          {
            label: "Trigger Fetching",
            description: "Cần một cơ chế tự động nhận biết khi nào người dùng sắp cuộn hết danh sách để gọi API kịp thời.",
          },
        ]}
        solutions={[
          {
            label: "Sentinel Element",
            description: "Đặt một phần tử 'Loader' ở cuối danh sách để làm điểm đánh dấu (Sentinel).",
          },
          {
            label: "Intersection Observer",
            description: "Sử dụng API trình duyệt để theo dõi khi Sentinel xuất hiện trong Viewport, từ đó trigger fetch dữ liệu mới.",
          },
          {
            label: "Clean Execution",
            description: "Tự động ngắt quan sát (unobserve) khi dữ liệu đang tải hoặc đã hết danh sách.",
          },
        ]}
      />

      <TechnicalDeepDive
        className="mb-10"
        mainTitle="Đặc điểm của kỹ thuật này"
        points={[
          {
            title: "Ưu điểm",
            colorClass: "text-emerald-600 dark:text-emerald-400",
            description: "Dễ cài đặt, code sạch, không cần tính toán chiều cao thủ công. Phù hợp cho list < 500 items.",
          },
          {
            title: "Nhược điểm (DOM Leak)",
            colorClass: "text-red-600 dark:text-red-400",
            description: "Càng cuộn lâu, DOM càng phình to. Đây là lý do tại sao nó CHƯA phải là Virtual Scroll.",
          },
          {
            title: "Khi nào nên dùng?",
            colorClass: "text-blue-600 dark:text-blue-400",
            description: "Dùng cho Feed tin tức đơn giản, sản phẩm thương mại điện tử tầm trung hoặc các list ít tương tác.",
          },
        ]}
      />
    </>
  );
}
