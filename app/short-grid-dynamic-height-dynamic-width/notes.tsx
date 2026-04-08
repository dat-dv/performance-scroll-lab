"use client";

import { CodeBlock } from "@/components/code-block";

export function Notes() {
  return (
    <div className="mt-12 space-y-8 border-t border-slate-100 pt-10 dark:border-white/5">
      {/* 1. Technical Nature */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
          <span className="flex h-6 w-1 rounded-full bg-emerald-500"></span>
          1. Bản chất kỹ thuật: CSS Columns hoạt động như thế nào?
        </h3>
        <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          <p>
            Nếu bạn đang tự hỏi "Làm sao chỉ với 2 dòng CSS mà các item lại tự xếp khít nhau như
            vậy?" thì câu trả lời nằm ở cơ chế{" "}
            <strong className="text-emerald-600">Multi-column Layout</strong> - một kỹ thuật mượn từ
            cách dàn trang của báo giấy.
          </p>

          <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-5 dark:border-white/5 dark:bg-white/5">
            <ul className="space-y-3">
              <li className="flex gap-2">
                <span className="font-bold text-emerald-500 italic">Step 1:</span>
                <span>Trình duyệt chia container thành N cột dọc (ví dụ 4 cột).</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-emerald-500 italic">Step 2:</span>
                <span>Nội dung chảy hết cột 1 rồi tự động "tràn" lên đầu cột 2.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-emerald-500 italic">Step 3:</span>
                <span>Các item "hít" vào nhau theo chiều dọc, lấp đầy mọi khoảng trống.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3 rounded-xl border border-blue-100 bg-blue-50/30 p-5 dark:border-blue-500/10 dark:bg-blue-500/5">
            <h4 className="text-[12px] font-bold tracking-widest text-blue-600 uppercase dark:text-blue-400">
              🚀 Thực hành: Thử nghiệm ngay
            </h4>
            <p className="text-xs">
              Mở file{" "}
              <code className="font-mono font-bold text-slate-800 dark:text-slate-200">
                page.tsx
              </code>{" "}
              và thử thay đổi 3 thuộc tính sau để thấy kết quả tức thì:
            </p>
            <ul className="list-inside list-decimal space-y-2 text-xs">
              <li>
                <strong className="text-slate-800 dark:text-slate-200">columns:</strong> Đổi từ{" "}
                <code className="text-blue-500">columns-4</code> sang{" "}
                <code className="text-blue-500">columns-2</code> hoặc{" "}
                <code className="text-blue-500">columns-8</code>.
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">gap:</strong> Thay đổi khoảng
                cách giữa các cột bằng <code className="text-blue-500">gap-2</code>,{" "}
                <code className="text-blue-500">gap-10</code>.
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">break-inside-avoid:</strong>{" "}
                Xóa class này ở item con. Bạn sẽ thấy item bị "cắt đôi" khi nằm ở ranh giới giữa 2
                cột.
              </li>
            </ul>
            <CodeBlock code={codeExamples} />
          </div>
        </div>
      </div>

      {/* 2. Visual Comparison */}
      <div className="space-y-6">
        <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
          <span className="flex h-6 w-1 rounded-full bg-violet-500"></span>
          2. So sánh trực quan: Grid vs. Masonry (CSS Columns)
        </h3>

        <div className="grid gap-8 sm:grid-cols-2">
          {/* Grid Side */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold tracking-tighter text-slate-400 uppercase italic">
              🚨 CSS Grid: Để lại khoảng trắng (Gaps)
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {[160, 80, 130, 200, 90, 150, 110, 210, 140].map((h, i) => (
                <div
                  key={i}
                  style={{ height: h }}
                  className="flex items-center justify-center rounded-lg bg-slate-200 font-mono text-xs font-bold text-slate-400 dark:bg-white/10"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Masonry Side */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold tracking-tighter text-emerald-500 uppercase italic">
              ✅ CSS Columns: Lấp đầy khoảng trống
            </h4>
            <div className="columns-3 gap-3">
              {[160, 80, 130, 200, 90, 150, 110, 210, 140].map((h, i) => (
                <div
                  key={i}
                  style={{ height: h }}
                  className="mb-3 flex break-inside-avoid items-center justify-center rounded-lg bg-emerald-500/80 font-mono text-xs font-bold text-white shadow-sm"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Practical Case */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
          <span className="flex h-6 w-1 rounded-full bg-blue-500"></span>
          3. Góc nhìn thực tế: Có nên chia data thành nhiều cột bằng JS?
        </h3>

        <div className="space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          <p>
            Nhiều dev hay làm kiểu: <br />
            <code className="rounded bg-blue-50 px-1.5 py-0.5 font-mono text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              split data thành N mảng → mỗi mảng là 1 column → render từng column
            </code>
          </p>

          <p>Nhìn thì có vẻ hợp lý, nhưng thực tế lại có mấy vấn đề "chí mạng":</p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <h4 className="flex items-center gap-1.5 font-bold text-slate-800 line-through decoration-red-500/50 dark:text-slate-200">
                1. DOM order bị sai
              </h4>
              <p className="text-xs">
                Thứ tự trong DOM sẽ là: <br />
                <strong>Column 1 → hết rồi mới tới Column 2.</strong>
                <br />
                Nhưng UI lại hiển thị theo hàng ngang. Screen reader sẽ đọc rất khó hiểu, SEO cũng
                không tốt.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="flex items-center gap-1.5 font-bold text-slate-800 line-through decoration-red-500/50 dark:text-slate-200">
                2. Responsive rất mệt
              </h4>
              <p className="text-xs">
                Muốn từ 4 cột xuống 2 cột bạn phải: <br />
                <strong>Nghe resize → split lại data → re-render.</strong>
                <br />
                Trong khi dùng CSS (Grid, Column) thì trình duyệt tự lo hết với chi phí bằng 0.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="flex items-center gap-1.5 font-bold text-slate-800 line-through decoration-red-500/50 dark:text-slate-200">
                3. Code phức tạp hơn cần thiết
              </h4>
              <p className="text-xs">
                Thêm logic split, merge, duy trì state dữ liệu. Rất dễ phát sinh bug khi dữ liệu cập
                nhật, phân trang (pagination) hoặc lọc (filter).
              </p>
            </div>
          </div>

          <div className="space-y-3 rounded-2xl bg-slate-50 p-6 dark:bg-white/5">
            <h4 className="font-bold text-slate-900 dark:text-white">Khi nào NÊN dùng cách này?</h4>
            <p className="text-xs italic">
              Chỉ khi làm <strong className="text-blue-500">Virtual Scroll 2D (Grid lớn)</strong>.
              Lúc đó bạn cần kiểm soát chặt chẽ từng cell để tối ưu performance. Còn lại thì sao?
            </p>
            <div className="flex flex-col gap-2 pt-2 text-xs">
              <span className="flex items-center gap-2">
                👉 <strong>Với data bình thường → Đừng làm vậy.</strong>
              </span>
              <span className="flex items-center gap-2">
                ➡️ Cứ dùng <strong>CSS Grid</strong> hoặc <strong>CSS Columns</strong>. Đơn giản
                hơn, ít bug hơn, trình duyệt tự tối ưu sẵn.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const codeExamples = `
export default function App() {
  return (
    <div style={{ padding: 20 }}>
      {/* ================= GRID ================= */}
      <h2>Grid (Gaps exist)</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          marginBottom: 40,
        }}
      >
        <div style={box(160, '#cbd5e1')}>1</div>
        <div style={box(80, '#cbd5e1')}>2</div>
        <div style={box(130, '#cbd5e1')}>3</div>
        <div style={box(200, '#cbd5e1')}>4</div>
        <div style={box(90, '#cbd5e1')}>5</div>
        <div style={box(150, '#cbd5e1')}>6</div>
        <div style={box(110, '#cbd5e1')}>7</div>
        <div style={box(210, '#cbd5e1')}>8</div>
        <div style={box(140, '#cbd5e1')}>9</div>
      </div>

      {/* ================= COLUMNS ================= */}
      <h2>CSS Columns (Masonry)</h2>
      <div
        style={{
          columnCount: 3,
          columnGap: '12px',
        }}
      >
        <div style={columnBox(160)}>1</div>
        <div style={columnBox(80)}>2</div>
        <div style={columnBox(130)}>3</div>
        <div style={columnBox(200)}>4</div>
        <div style={columnBox(90)}>5</div>
        <div style={columnBox(150)}>6</div>
        <div style={columnBox(110)}>7</div>
        <div style={columnBox(210)}>8</div>
        <div style={columnBox(140)}>9</div>
      </div>
    </div>
  );
}

// ================= helpers =================

function box(height, bg) {
  return {
    height,
    background: bg,
    color: '#64748b',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  };
}

function columnBox(height) {
  return {
    height,
    background: '#10b981',
    color: 'white',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    breakInside: 'avoid',
    fontWeight: 'bold',
  };
}
`;
