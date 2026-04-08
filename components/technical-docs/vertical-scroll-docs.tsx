"use client";

import React from "react";
import { TechnicalIntro } from "../tẹchnical-intro";
import { TechnicalDeepDive } from "../technical-deep-dive";

export function VerticalScrollDocs() {
  return (
    <>
      <TechnicalIntro
        title="Virtualized List (HOC)"
        challenges={[
          {
            label: "Quá tải DOM",
            description:
              "Render hàng nghìn phần tử cùng lúc khiến trình duyệt giật lag và tốn nhiều RAM.",
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
            title: "Để hiển thị thanh scroll đúng",
            colorClass: "text-blue-600 dark:text-blue-400",
            description:
              "Trình duyệt cần biết tổng chiều cao list để render thanh cuộn. Nếu mỗi item cao 30px và có 10,000 items thì tổng là 300,000px — phải tính được ngay từ đầu.",
          },
          {
            title: "Tính index cực nhanh (O(1))",
            colorClass: "text-emerald-600 dark:text-emerald-400",
            description:
              "Chỉ cần lấy scrollTop chia cho itemHeight là ra index. Không cần duyệt mảng hay đo từng phần tử.",
          },
          {
            title: "Đặt vị trí chính xác",
            colorClass: "text-purple-600 dark:text-purple-400",
            description:
              "Mỗi item được đặt bằng position: absolute. Muốn item thứ 5000 nằm đúng chỗ thì phải biết nó cách top bao nhiêu (5000 * height).",
          },
          {
            title: "Tại sao không dùng IntersectionObserver?",
            colorClass: "text-amber-600 dark:text-amber-400",
            description:
              "Observer chạy theo kiểu callback sau khi scroll xảy ra, nên có thể bị trễ. Dùng công thức toán giúp xác định item cần render ngay lập tức, mượt hơn khi scroll nhanh.",
          },
        ]}
      />
    </>
  );
}
