"use client";

import React from "react";
import { Info, MousePointer2 } from "lucide-react";

const MOCK_ITEMS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  title: `Tab Item #${i + 1}`,
  color: [
    "from-blue-500 to-indigo-600",
    "from-emerald-400 to-teal-600",
    "from-rose-400 to-orange-500",
  ][i % 3],
}));

export default function ShortHorizontalDemo() {
  return (
    <div className="min-h-screen space-y-12 pb-20">
      <div className="overflow-hidden rounded-[2rem] border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent p-10 backdrop-blur-sm dark:border-emerald-400/20">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-2xl shadow-emerald-500/20">
              <Info className="size-7" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-black tracking-widest text-emerald-500 uppercase">
                Architecture Tier 1
              </span>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                1.2. Short Horizontal (Native Map)
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-xs font-black tracking-widest text-slate-900 uppercase dark:text-white">
                <div className="size-1.5 rounded-full bg-emerald-500" />
                BÀI TOÁN & NGỮ CẢNH
              </h4>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Hiển thị một cụm{" "}
                <strong>
                  Banner quảng cáo, dải Story icons (kiểu Instagram), hoặc danh sách thẻ sản phẩm
                  Hot
                </strong>{" "}
                với số lượng từ 5-15 items.
                <br />
                <br />
                Thách thức chính là <strong>Bundle Size và Thời gian khởi tạo</strong>. Sử dụng các
                thư viện như Swiper.js hay Slick cho 10 items là sự lãng phí tài nguyên lớn, làm
                chậm chỉ số LCP (Largest Contentful Paint) của trang web.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-xs font-black tracking-widest text-emerald-600 uppercase">
                <div className="size-1.5 rounded-full bg-emerald-500" />
                CHIẾN LƯỢC GIẢI QUYẾT
              </h4>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Tận dụng sức mạnh của <strong>CSS Scroll Snap</strong>. Đây là giải pháp native giúp
                tạo trải nghiệm cuộn mượt mà như ứng dụng di động mà không tốn bất kỳ dòng
                JavaScript nào để khởi tạo UI.
                <br />
                <br />
                <strong>Ưu điểm:</strong> 0ms JS initialization, hỗ trợ Touch/Swipe native cực tốt,
                và hoàn toàn响应 (Responsive) thông qua CSS Media Queries. Đây là lựa chọn hàng đầu
                cho các Carousel đơn giản ở đầu trang (Above the fold).
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="relative -mx-6 overflow-hidden bg-slate-50/50 py-12 dark:bg-white/5">
        {/* 🚀 Pure CSS Horizontal Scroll Container */}
        <div className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6">
          {MOCK_ITEMS.map((item) => (
            <div key={item.id} className="w-80 shrink-0 snap-center">
              <div
                className={`flex h-64 flex-col items-center justify-center rounded-[2.5rem] bg-gradient-to-br p-8 text-center font-bold text-white shadow-xl ${item.color}`}
              >
                <div className="mb-2 text-[10px] tracking-widest uppercase opacity-70">
                  Native Item
                </div>
                <div className="text-2xl leading-tight tracking-tight">{item.title}</div>
                <div className="mt-4 rounded-full bg-white/20 px-4 py-1 text-sm font-black">
                  ID: {item.id}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
          <MousePointer2 className="size-3" />
          <span>Swipe or Scroll horizontally</span>
        </div>
      </section>
    </div>
  );
}
