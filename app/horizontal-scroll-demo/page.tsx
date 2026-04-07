"use client";

import HorizontalVirtualScroll, { withLoaderWidth } from "@/libs/horizontal-virtual-scroll";
import { TechnicalIntro } from "@/components/TechnicalIntro";

const HorizontalVirtualScrollWithLoader = withLoaderWidth(HorizontalVirtualScroll);

interface CardItem {
  id: number;
  title: string;
  color: string;
}

const colors = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-purple-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-indigo-500",
];

const items: CardItem[] = Array.from({ length: 5000 }, (_, i) => ({
  id: i,
  title: `Card #${i}`,
  color: colors[i % colors.length],
}));

const renderCard = ({ item }: { index: number; item: CardItem }) => {
  return (
    <div className="h-full w-[240px] p-3">
      <div
        className={`flex h-full w-full flex-col items-center justify-center rounded-2xl p-6 text-center font-bold text-white shadow-lg transition-transform hover:scale-95 ${item.color}`}
      >
        <span className="mb-1 text-[10px] tracking-widest uppercase opacity-70">
          Portfolio Item
        </span>
        <div className="text-xl">{item.title}</div>
        <div className="mt-4 rounded-full bg-white/20 px-3 py-1 text-[10px]">ID: {item.id}</div>
      </div>
    </div>
  );
};

export default function HorizontalDemoPage() {
  return (
    <div className="relative">
      <TechnicalIntro
        title="Horizontal Virtual Scroll"
        challenges={[
          {
            label: "Overflow-X Performance",
            description:
              "Scroll chiều ngang thường gây lag nếu khối lượng DOM lớn xếp cạnh nhau trên một dải flex.",
          },
          {
            label: "Layout Reflow",
            description:
              "Việc tính toán slide-to-scroll truyền thống rất tốn CPU khi thay đổi kích thước container.",
          },
        ]}
        solutions={[
          {
            label: "Fixed Item Width",
            description:
              "Dùng width cố định cho mỗi card để tính toán điểm bắt đầu scroll nhanh chóng.",
          },
          {
            label: "withLoaderWidth",
            description: "Tự động đo kích thước phần tử thực để đảm bảo virtualization chính xác.",
          },
        ]}
      />

      <div className="mb-6">
        <h2 className="text-lg font-semibold">Horizontal Windowing Demo</h2>
        <p className="text-sm text-gray-500">
          5,000 cards rendering horizontally with withLoaderWidth HOC.
        </p>
      </div>

      <div className="rounded-3xl border border-gray-100 bg-gray-50/50 py-8 dark:border-white/5 dark:bg-zinc-900/40">
        <div className="mx-auto flex justify-center">
          <HorizontalVirtualScrollWithLoader items={items} visibleCount={4} overscan={4}>
            {renderCard}
          </HorizontalVirtualScrollWithLoader>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50/50 p-6 dark:border-blue-900/20 dark:bg-blue-900/10">
        <h3 className="mb-2 font-bold text-blue-600 underline decoration-blue-500/30 underline-offset-4 dark:text-blue-500">
          Horizontal Scroll Advantage:
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Việc xử lý chiều ngang (X-axis) thường khó hơn do các layout `flex` hay `float` mặc định
          sẽ đẩy các phần tử xuống dòng (wrap). Kỹ thuật này kết hợp `flex-shrink-0` và `translateX`
          để tạo ra một dải dữ liệu vô tận, cực kỳ thích hợp cho các Dashboard hiện đại hoặc
          Portfolio Showcase.
        </p>
      </div>
    </div>
  );
}
