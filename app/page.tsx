"use client";

import Link from "next/link";

const cases = [
  {
    title: "Tổng số item ít, không phân trang",
    description: "Load toàn bộ data một lần, render list bình thường.",
    recommendation: "Dùng list thông thường, không cần tối ưu.",
    href: null,
  },
  {
    title: "Load more khi scroll xuống cuối — item ít",
    description: "Append thêm item mỗi khi chạm đáy. DOM tăng dần theo thời gian.",
    recommendation: "List thường + IntersectionObserver trigger fetch.",
    href: "/load-more-intersection-observer",
  },
  {
    title: "Load more khi scroll xuống cuối — item nhiều",
    description: "DOM phình to nếu append mãi. Cần virtual DOM để chỉ render phần đang nhìn thấy.",
    recommendation: "Virtual scroll với fixed item height.",
    href: "/virtual-scroll-with-fixed-item-height",
  },
  {
    title: "Item có chiều cao động (dynamic height)",
    description:
      "Mỗi item cao khác nhau (comment, card mở rộng...). Không thể tính offset bằng index * height.",
    recommendation: "Virtual scroll với dynamic item height — đo từng item bằng ResizeObserver.",
    href: null, // TODO
  },
  {
    title: "Bidirectional scroll (chat, timeline)",
    description:
      "Scroll cả lên lẫn xuống, load thêm ở cả hai đầu. Phải giữ scroll position khi prepend.",
    recommendation: "Virtual scroll với anchor-based scroll preservation.",
    href: null, // TODO
  },
  {
    title: "Virtual Scroll Chiều Ngang",
    description: "Tối ưu cho Dashboard, Carousel có hàng ngàn items xếp ngang.",
    recommendation: "Virtual scroll với Fixed Item Width.",
    href: "/horizontal-scroll-demo",
  },
];

export default function InfiniteScrollDemo() {
  return (
    <div className="relative">
      <h1 className="mb-1 text-xl font-semibold">Infinite Scroll & Virtual DOM</h1>
      <p className="mb-6 text-sm text-slate-500">Các trường hợp sử dụng và chiến lược tương ứng.</p>

      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {cases.map((c, i) => (
          <li
            key={i}
            className="border-border-primary flex flex-col justify-between rounded-lg border bg-white/5 p-3 backdrop-blur-sm transition-all hover:bg-white/10 dark:bg-black/20"
          >
            <div className="space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                  {c.title}
                </h2>
                {c.href ? (
                  <div className="size-1.5 shrink-0 rounded-full bg-green-500" />
                ) : (
                  <div className="size-1.5 shrink-0 rounded-full bg-gray-300 dark:bg-gray-700" />
                )}
              </div>

              <p className="line-clamp-2 text-sm leading-snug font-medium">{c.description}</p>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <p className="line-clamp-1 text-[10px] text-slate-500 italic">{c.recommendation}</p>

              {c.href ? (
                <Link
                  href={c.href}
                  className="rounded px-2 py-1 text-[10px] font-bold text-blue-500 transition-colors hover:bg-blue-500/10"
                >
                  GO →
                </Link>
              ) : (
                <span className="text-[10px] font-bold text-gray-400">WIP</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
