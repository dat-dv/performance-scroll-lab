"use client";

import React from "react";
import { TechnicalIntro } from "../tẹchnical-intro";
import { TechnicalDeepDive } from "../technical-deep-dive";

export function StaticListDocs() {
  return (
    <>
      <TechnicalIntro
        title="Trường hợp: Danh sách tĩnh (Static List)"
        challenges={[
          {
            label: "Không có thách thức lớn",
            description:
              "Dữ liệu ít (ví dụ < 50 items) không gây ảnh hưởng đến hiệu suất render của trình duyệt.",
          },
          {
            label: "Yêu cầu đơn giản",
            description: "Chỉ cần hiển thị thông tin mà không cần phân trang hay cuộn vô tận.",
          },
        ]}
        solutions={[
          {
            label: "Sử dụng .map() cơ bản",
            description: "Render toàn bộ mảng dữ liệu trực tiếp vào DOM.",
          },
          {
            label: "Không cần tối ưu",
            description:
              "Việc sử dụng Virtual Scroll trong trường hợp này là dư thừa và làm tăng độ phức tạp của code không cần thiết.",
          },
        ]}
      />

      <TechnicalDeepDive
        className="mb-10"
        mainTitle="Lời khuyên kỹ thuật"
        points={[
          {
            title: "Ưu điểm tối đa",
            colorClass: "text-emerald-600 dark:text-emerald-400",
            description:
              "Code ngắn gọn, dễ bảo trì, SEO tốt vì toàn bộ nội dung hiển thị ngay lập tức.",
          },
          {
            title: "Giới hạn an toàn",
            colorClass: "text-amber-600 dark:text-amber-400",
            description:
              "Hãy dùng cách này nếu danh sách của bạn chắc chắn không bao giờ vượt quá 100 phần tử.",
          },
          {
            title: "KISS Principle",
            colorClass: "text-blue-600 dark:text-blue-400",
            description:
              "Keep It Simple, Stupid - Đừng tối ưu hóa quá sớm (premature optimization).",
          },
        ]}
      />
    </>
  );
}
