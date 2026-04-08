"use client";

import React from "react";
import { Info, Grid3X3 } from "lucide-react";

const MOCK_ITEMS = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  title: `#${i + 1}`,
  color: [
    "bg-red-400",
    "bg-blue-400",
    "bg-emerald-400",
    "bg-amber-400",
    "bg-purple-400",
    "bg-teal-400",
  ][i % 6],
}));

export default function ShortGridDemo() {
  return (
    <div className="min-h-screen space-y-12 pb-20">
      <div className="overflow-hidden rounded-[2rem] border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent p-10 backdrop-blur-sm dark:border-purple-400/20">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-purple-500 text-white shadow-2xl shadow-purple-500/20">
              <Info className="size-7" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-black tracking-widest text-purple-500 uppercase">Architecture Tier 1</span>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                1.3. Short 2D Grid (Native Map)
              </h1>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-xs font-black tracking-widest text-slate-900 uppercase dark:text-white">
                <div className="size-1.5 rounded-full bg-purple-500" />
                BÀI TOÁN & NGỮ CẢNH
              </h4>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Bạn cần xây dựng một <strong>Trình chọn sơ đồ ghế (Cinema/Stadium picker), danh sách ứng dụng trong một folder, hoặc một bảng dữ liệu (Sheet) quy mô nhỏ</strong> cần khả năng di chuyển tự do theo cả trục X và Y.
                <br /><br />
                Thách thức ở đây là <strong>Virtualization 2D</strong> là một trong những bài toán phức tạp nhất trong lập trình Frontend (khó hơn nhiều so với 1 chiều). Nếu số lượng ô dữ liệu của bạn &lt; 200, việc cài đặt và cấu hình thư viện ảo hóa là &quot;Over-engineering&quot; khủng khiếp.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-xs font-black tracking-widest text-purple-600 uppercase">
                <div className="size-1.5 rounded-full bg-purple-600" />
                CHIẾN LƯỢC GIẢI QUYẾT
              </h4>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Sử dụng kết hợp <strong>CSS Grid Layout và Thuộc tính Overflow</strong>. Bằng cách định nghĩa chiều rộng/cao cho container và nội dung, trình duyệt sẽ tự cung cấp thanh cuộn 2 chiều cực kỳ mượt mà.
                <br /><br />
                <strong>Tại sao chọn cách này:</strong> Bạn có thể dễ dàng tùy biến giao diện bằng CSS Grid (gap, span, v.v.), hỗ trợ hoàn hảo cho các tương tác như zoom hoặc highlight ô mà không lo lắng về logic recycling của Virtualization. Hiệu năng render cho 200 items 2D là không đáng kể đối với CPU hiện đại.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="relative -mx-6 bg-slate-50/50 px-6 py-12 dark:bg-white/5">
        {/* 🚀 Bidirectional Scroll Viewport */}
        <div className="mx-auto h-[500px] max-w-2xl overflow-auto rounded-[2.5rem] border-4 border-white bg-slate-100 shadow-2xl dark:border-white/5 dark:bg-black/40">
          <div className="inline-grid grid-cols-10 gap-2 p-4" style={{ width: "1200px" }}>
            {MOCK_ITEMS.map((item) => (
              <div
                key={item.id}
                className={`flex aspect-square w-24 flex-col items-center justify-center rounded-2xl p-2 text-center font-bold text-white shadow-md transition-all hover:scale-105 ${item.color}`}
              >
                <div className="text-[9px] font-black tracking-widest uppercase opacity-40">
                  Card
                </div>
                <div className="text-lg leading-tight font-black tracking-tighter">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
          <Grid3X3 className="size-3" />
          <span>Scroll in all directions (X + Y)</span>
        </div>
      </section>
    </div>
  );
}
