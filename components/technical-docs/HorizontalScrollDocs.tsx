"use client";

import React from "react";
import { TechnicalIntro } from "../TechnicalIntro";
import { TechnicalDeepDive } from "../TechnicalDeepDive";

export function HorizontalScrollDocs() {
  return (
    <>
      <TechnicalIntro
        title="Horizontal Virtual Scroll"
        challenges={[
          {
            label: "Overflow-X Performance",
            description: "Scroll chiều ngang thường gây lag nếu khối lượng DOM lớn xếp cạnh nhau trên một dải flex.",
          },
          {
            label: "Infinite Loading",
            description: "Việc append hàng nghìn card ngang mà không tối ưu sẽ làm vỡ giao diện và tốn RAM.",
          },
        ]}
        solutions={[
          {
            label: "Fixed Item Width",
            description: "Dùng width cố định cho mỗi card để tính toán điểm bắt đầu scroll nhanh chóng.",
          },
          {
            label: "Load More Support",
            description: "Tự động tải thêm Card khi người dùng trượt đến cuối danh sách ngang.",
          },
        ]}
      />

      <TechnicalDeepDive
        className="mb-10"
        mainTitle="Tại sao chiều ngang cần cố định Width?"
        points={[
          {
            title: "Tổng chiều ngang ảo",
            colorClass: "text-blue-600 dark:text-blue-400",
            description: "Để trình duyệt hiểu được dải scroll ngang khổng lồ, ta cần set width cho container bằng (itemWidth * itemCount) ngay lập tức.",
          },
          {
            title: "Nhảy Index O(1)",
            colorClass: "text-emerald-600 dark:text-emerald-400",
            description: "Biết width cố định giúp ta tính ngay được startIndex chỉ bằng phép chia scrollLeft / itemWidth, thay vì phải đo từng card một.",
          },
          {
            title: "TranslateX chuẩn xác",
            colorClass: "text-purple-600 dark:text-purple-400",
            description: "Hệ thống dùng 'translateX' để dịch chuyển dải item. Vị trí dịch chuyển phải khớp tuyệt đối với số lượng item đã bị ẩn đi.",
          },
          {
            title: "Performance over Observers",
            colorClass: "text-amber-600 dark:text-amber-400",
            description: "IntersectionObserver quá chậm để xử lý hàng ngàn item theo thời gian thực (real-time). Math là giải pháp tối ưu cho mọi loại virtualization.",
          },
        ]}
      />
    </>
  );
}
