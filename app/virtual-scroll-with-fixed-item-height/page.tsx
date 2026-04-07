"use client";

import VirtualScrollWithFixedItemHeight from "@/libs/virtual-scroll-with-fixed-item-height";
import { TechnicalIntro } from "@/components/TechnicalIntro";

interface Item {
  id: number;
  name: string;
}

const items: Item[] = Array.from({ length: 10_000 }, (_, i) => ({
  id: i,
  name: `Item ${i}`,
}));

const renderItem = ({ index, item }: { index: number; item: Item }) => {
  return (
    <div
      key={index}
      className={`flex h-full items-center border-b border-gray-100 px-6 transition-all duration-200 last:border-0 hover:bg-gray-50 dark:border-white/5 dark:hover:bg-white/5 ${
        index % 2 === 0 ? "bg-gray-50/50 dark:bg-white/5" : ""
      }`}
    >
      <div className="mr-4 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-gray-200 dark:bg-zinc-800">
        <span className="text-[10px] font-bold text-gray-500">#{index}</span>
      </div>
      <div className="flex flex-col overflow-hidden text-left">
        <span className="truncate text-sm font-medium">{item.name}</span>
        <span className="text-[10px] tracking-wider text-gray-400 uppercase">Virtualized</span>
      </div>

      <div className="ml-auto flex space-x-1">
        <div className="h-4 w-1 rounded-full bg-blue-500/40" />
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <div className="relative">
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
            label: "Fixed Item Height",
            description: "Tối ưu tốc độ tính toán offset một cách tức thì thông qua index.",
          },
        ]}
      />

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900/70">
        <VirtualScrollWithFixedItemHeight visibleCount={10} overscan={8} items={items}>
          {renderItem}
        </VirtualScrollWithFixedItemHeight>

        <div className="border-t border-gray-100 p-4 text-center dark:border-white/10">
          <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-bold tracking-tighter text-blue-500 uppercase">
            Performance Mode Active
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
