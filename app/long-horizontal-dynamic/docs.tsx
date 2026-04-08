"use client";

import React from "react";
import { Sparkles, Layout, Cpu, Zap, Info, Code2, ExternalLink } from "lucide-react";
import StepItem from "@/components/step-item";
import ReferenceItem from "../referance-item";
import { ComingSoon } from "@/components/coming-soon";

export function Docs() {
  const isChecked = false;
  return !isChecked ? (
    <ComingSoon title="Horizontal Virtual Dynamic Demo" />
  ) : (
    <div className="space-y-12 pb-24">
      {/* Introduction */}
      <section className="relative overflow-hidden rounded-[3rem] bg-slate-900 p-12 text-white">
        <div className="absolute -top-20 -right-20 size-64 rounded-full bg-emerald-600/20 blur-[100px]" />
        <div className="relative space-y-4">
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-emerald-400 uppercase">
            <Layout className="size-4" />
            Adaptive X-Axis Logic
          </div>
          <h2 className="text-4xl font-black tracking-tighter md:text-5xl">
            Virtualization <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent italic">
              Chiều rộng động (Dynamic Width)
            </span>
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-400">
            Thách thức lớn nhất của trục ngang là việc các item có thể &quot;phình&quot; ra theo nội
            dung (như biểu đồ hoặc dải banners). Để xử lý, hệ thống phải liên tục hiệu chỉnh{" "}
            <b>Toạ độ Left</b> dựa trên các lần đo đạc thực tế.
          </p>
        </div>
      </section>

      {/* Guide Steps */}
      <div className="relative pl-4">
        {/* Step 1 */}
        <StepItem
          step="S.01"
          title='Khởi tạo "Dữ liệu dự báo" (Forecasting)'
          accentColor="text-blue-600 dark:text-blue-400"
          glowColor="shadow-blue-500/10"
        >
          <p>
            Vì chưa render, mình chưa biết item rộng bao nhiêu. Mình cần một{" "}
            <code>estimatedWidth</code> để tính toán tổng chiều rộng giả lập ban đầu.
          </p>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/5 dark:bg-white/5">
            <p className="text-sm font-medium">
              Chiêu này giúp thanh cuộn ngang xuất hiện ngay lập tức với độ dài &quot;tạm ổn&quot;,
              tránh việc scrollbar bị nhảy khi thực hiện render lần đầu.
            </p>
          </div>
        </StepItem>

        {/* Step 2 */}
        <StepItem
          step="S.02"
          title="Binary Search trên trục X"
          accentColor="text-emerald-600 dark:text-emerald-400"
          glowColor="shadow-emerald-500/10"
        >
          <div className="space-y-4">
            <p className="text-sm">
              Sử dụng thuật toán tìm kiếm nhị phân để truy vấn trong mảng <b>itemPositionsX</b>{" "}
              (Prefix Sums). Với <code>scrollLeft</code> bất kỳ, mình tìm ra ngay Item nào đang nằm
              ở vị trí đó trong <code>O(log n)</code>.
            </p>
            <div className="rounded-xl bg-slate-900 p-4 font-mono text-[11px] text-emerald-400">
              const startIndex = binarySearch(itemPositionsX, scrollLeft);
            </div>
          </div>
        </StepItem>

        {/* Step 3 */}
        <StepItem
          step="S.03"
          title="Mắt thần ResizeObserver"
          accentColor="text-purple-600 dark:text-purple-400"
          glowColor="shadow-purple-500/10"
        >
          <div className="flex items-start gap-4">
            <div className="mt-1 rounded-full bg-purple-500/10 p-2 text-purple-600">
              <Cpu className="size-4" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold">Cơ chế &quot;Reality Check&quot;:</p>
              <p className="text-sm text-slate-500">
                Mọi item khi render ra đều được theo dõi width thực tế. Ngay khi có số liệu thật, nó
                sẽ cập nhật vào <b>measuredWidths</b> cache và kích hoạt tính toán lại toàn bộ toạ
                độ X của các item phía sau.
              </p>
            </div>
          </div>
        </StepItem>

        {/* Step 4 */}
        <StepItem
          step="S.04"
          title="Neo Cuộn Ngang (Horizontal Anchoring)"
          accentColor="text-rose-600 dark:text-rose-400"
          glowColor="shadow-rose-500/10"
        >
          <p>
            Nếu các Item bên trái (đã cuộn qua) thay đổi chiều rộng, mình phải bù trừ vào{" "}
            <code>scrollLeft</code>. Nếu không làm việc này, nội dung trước mắt người dùng sẽ bị
            &quot;trôi&quot; sang trái hoặc phải một cách mất kiểm soát.
          </p>
        </StepItem>

        {/* Step 5 */}
        <StepItem
          step="S.05"
          title="Tối ưu Buffer (Overscan)"
          accentColor="text-amber-600 dark:text-amber-400"
          glowColor="shadow-amber-500/10"
        >
          <p>
            Do chiều rộng item không đều, việc render dư ra 5-10 item ở hai lề giúp bảo vệ trải
            nghiệm khi người dùng &quot;quẹt&quot; (swipe) ngang với tốc độ cao trên thiết bị di
            động.
          </p>
        </StepItem>
      </div>

      {/* Summary Advisory */}
      <div className="rounded-[2.5rem] bg-slate-900 p-10 text-white dark:bg-white/5">
        <h4 className="mb-6 flex items-center gap-2 text-xl font-bold text-emerald-400 italic">
          <Zap className="size-5" />
          Tư duy kiến trúc:
        </h4>
        <p className="text-sm leading-relaxed text-slate-400">
          Bài toán Dynamic Width là đỉnh cao của Virtualization ngang. Bí quyết là sự kiên trì trong
          việc <b>Cập nhật bộ nhớ đệm (Cache update)</b>. Mỗi khi một Item được đo đạc, toàn bộ
          &quot;thế giới&quot; phía sau nó phải được đẩy sang đúng vị trí mới.
        </p>
      </div>

      {/* References */}
      <div className="rounded-[2.5rem] border border-emerald-100 bg-emerald-50/30 p-10 dark:border-emerald-500/10 dark:bg-emerald-500/5">
        <h4 className="mb-8 flex items-center gap-3 text-sm font-black tracking-widest text-emerald-600 uppercase dark:text-emerald-400">
          <ExternalLink className="size-5" />
          Kiến thức nâng cao
        </h4>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <ReferenceItem
            title="ResizeObserver API"
            description="Tìm hiểu sâu về cách trình duyệt theo dõi kích thước phần tử."
            link="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver"
          />
          <ReferenceItem
            title="Prefix Sum Algorithm"
            description="Thuật toán mấu chốt để tối ưu hoá việc tra cứu toạ độ."
            link="https://en.wikipedia.org/wiki/Prefix_sum"
          />
        </div>
      </div>
    </div>
  );
}
