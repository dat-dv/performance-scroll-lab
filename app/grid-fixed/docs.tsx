"use client";

import React from "react";
import { Table2, Zap } from "lucide-react";
import StepItem from "@/components/step-item";
import { ComingSoon } from "@/components/coming-soon";

export function Docs() {
  const isChecked = false;

  return !isChecked ? (
    <ComingSoon title="2D Virtual Grid Documentation" />
  ) : (
    <div className="space-y-12 pb-24">
      {/* Introduction */}
      <section className="relative overflow-hidden rounded-[3rem] bg-slate-900 p-12 text-white">
        <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="relative space-y-4">
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-blue-400 uppercase">
            <Table2 className="size-4" />
            Bidirectional Virtualization
          </div>
          <h2 className="text-4xl font-black tracking-tighter md:text-5xl">
            Ảo hoá <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent italic">
              Ma trận 2 chiều (2D Grid)
            </span>
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-400">
            Khi dữ liệu mở rộng theo cả hai trục X (Ngang) và Y (Dọc), việc chỉ ảo hoá một chiều là
            không đủ. Chúng ta cần một giải pháp <b>Sparse Rendering</b> để chỉ hiển thị một "khung
            cửa sổ" nhỏ trong một biển dữ liệu khổng lồ.
          </p>
        </div>
      </section>

      {/* Guide Steps */}
      <div className="relative pl-4">
        {/* Step 1 */}
        <StepItem
          step="S.01"
          title="Phantom Container (X & Y)"
          accentColor="text-blue-600 dark:text-blue-400"
          glowColor="shadow-blue-500/10"
        >
          <p>
            Tạo một vùng chứa ảo có kích thước bằng chính xác <code>(rowCount * rowHeight)</code> và{" "}
            <code>(colCount * colWidth)</code>. Điều này giúp hệ thống cuộn của trình duyệt hoạt
            động tự nhiên như thật.
          </p>
        </StepItem>

        {/* Step 2 */}
        <StepItem
          step="S.02"
          title="O(1) Matrix Indexing"
          accentColor="text-emerald-600 dark:text-emerald-400"
          glowColor="shadow-emerald-500/10"
        >
          <div className="space-y-4">
            <p className="text-sm">
              Vì kích thước Item cố định, ta có thể tìm ra ngay dải Row và Column cần render chỉ
              bằng các phép chia đơn giản (Tránh mọi vòng lặp lồng nhau vô nghĩa).
            </p>
            <div className="rounded-xl bg-slate-900 p-4 font-mono text-[11px] text-blue-400">
              const startRow = Math.floor(scrollTop / rowHeight);
              <br />
              const startCol = Math.floor(scrollLeft / colWidth);
            </div>
          </div>
        </StepItem>

        {/* Step 3 */}
        <StepItem
          step="S.03"
          title="Sparse Rendering Strategy"
          accentColor="text-purple-600 dark:text-purple-400"
          glowColor="shadow-purple-500/10"
        >
          <p>
            Chỉ tạo một mảng phẳng (Flat Array) chứa các phần tử nằm trong vùng hiển thị. Việc này
            giúp React <b>diffing</b> cực nhanh vì số lượng component thực tế trong DOM luôn được
            giữ ở mức tối thiểu.
          </p>
        </StepItem>

        {/* Step 4 */}
        <StepItem
          step="S.04"
          title="Absolute Grid Positioning"
          accentColor="text-rose-600 dark:text-rose-400"
          glowColor="shadow-rose-500/10"
        >
          <p>
            Mỗi Item được đặt chính xác vào tọa độ bằng <code>top</code> và <code>left</code>. Kỹ
            thuật này loại bỏ hoàn toàn hiện tượng Layout Shift và giúp GPU xử lý các layer mượt mà
            hơn.
          </p>
        </StepItem>
      </div>

      {/* Technical Summary */}
      <div className="rounded-[2.5rem] bg-blue-600 p-10 text-white shadow-2xl shadow-blue-500/20">
        <h4 className="mb-6 flex items-center gap-2 text-xl font-bold italic">
          <Zap className="size-5 text-yellow-300" />
          Phép màu của O(1):
        </h4>
        <p className="text-sm leading-relaxed text-blue-50">
          Ảo hoá 2 chiều kích thước cố định là bài toán hiệu năng thuần túy. Bằng cách loại bỏ sự
          phụ thuộc vào trạng thái (State) của từng Item và dùng toán học để điều khiển tọa độ,
          chúng ta có thể render <b>hàng tỷ ô dữ liệu</b> mà không bao giờ làm trình duyệt bị đơ.
        </p>
      </div>
    </div>
  );
}
