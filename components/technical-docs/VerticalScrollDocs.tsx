"use client";

import React from "react";
import { TechnicalIntro } from "../TechnicalIntro";
import { TechnicalDeepDive } from "../TechnicalDeepDive";

export function VerticalScrollDocs() {
  return (
    <>
      <TechnicalIntro
        title="Virtualized List (HOC)"
        challenges={[
          {
            label: "Quá tải DOM",
            description: "Render hàng nghìn phần tử cùng lúc khiến trình duyệt giật lag và tốn nhiều RAM.",
          },
          {
            label: "Chi phí xử lý cao",
            description: "Các thao tác tính toán layout, reflow và repaint trở nên rất tốn kém.",
          },
          {
            label: "Hạn chế thiết bị",
            description: "Hiệu năng giảm sâu trên các thiết bị cấu hình yếu hoặc mobile.",
          },
        ]}
        solutions={[
          {
            label: "Render theo Viewport",
            description: "Chỉ hiển thị những phần tử thực sự nằm trong tầm mắt người dùng.",
          },
          {
            label: "Tối ưu bộ nhớ",
            description: "Giảm đáng kể số lượng DOM nodes, giúp trải nghiệm mượt mà hơn.",
          },
          {
            label: "Infinite Scroll",
            description: "Tự động tải thêm dữ liệu khi người dùng cuộn đến cuối danh sách.",
          },
        ]}
      />

      <TechnicalDeepDive
        className="mb-10"
        mainTitle="Tại sao cần cố định kích thước?"
        points={[
          {
            title: "Không gian ảo",
            colorClass: "text-blue-600 dark:text-blue-400",
            description: "Để trình duyệt hiển thị thanh cuộn chính xác ngay cả với 10k items, ta cần biết tổng size (itemHeight * count) ngay lập tức.",
          },
          {
            title: "Truy xuất O(1)",
            colorClass: "text-emerald-600 dark:text-emerald-400",
            description: "Với fixed-size, ta có thể tính chính xác index cần render dựa trên độ dời (offset) cuộn mà không cần loop duyệt mảng.",
          },
          {
            title: "Vị trí tuyệt đối",
            colorClass: "text-purple-600 dark:text-purple-400",
            description: "Hệ thống dùng 'position: absolute'; item thứ 5k chỉ đứng đúng vị trí nếu ta biết được tổng size của 4,999 item phía trước.",
          },
          {
            title: "Tại sao không dùng Observer?",
            colorClass: "text-amber-600 dark:text-amber-400",
            description: "IntersectionObserver là bất đồng bộ (async). Tính toán Math giúp xác định index tức thì, tránh tình trạng giật/trắng trang khi cuộn nhanh qua hàng ngàn item.",
          },
        ]}
      />
    </>
  );
}
