"use client";

import React from "react";
import { ExternalLink, Sparkles } from "lucide-react";
import StepItem from "@/components/step-item";

export function Docs() {
  return (
    <div className="mx-auto space-y-10 pt-10 pb-24">
      {/* Header */}
      <section className="relative space-y-6 overflow-hidden rounded-[3rem] bg-slate-900 p-12 text-white dark:bg-white/5">
        <div className="absolute -top-20 -right-20 size-64 rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="relative space-y-4">
          <div className="flex items-center gap-2 text-xs font-black tracking-[0.2em] text-blue-400 uppercase">
            <Sparkles className="size-4" />
            Technical Architecture
          </div>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            Xây dựng Virtual Scroll <br />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Dynamic Height
            </span>{" "}
            từ con số 0 🚀
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-400">
            Để xử lý danh sách hàng triệu bản ghi với kích thước không cố định (như tin nhắn, bảng
            tin), bí quyết nằm ở việc quản lý tọa độ thay vì quản lý số lượng phần tử. Dưới đây là 6
            bước cốt lõi:
          </p>
        </div>
      </section>

      {/* Implementation Guide */}
      <div className="relative pl-4">
        {/* Step 1 */}
        <StepItem
          step="S.01"
          title='Bước 1: Thiết lập "Khung xương" và "Vùng đệm giả"'
          accentColor="text-blue-600 dark:text-blue-400"
          glowColor="shadow-blue-500/10"
        >
          <p>
            Đừng render toàn bộ dữ liệu vào DOM. Anh chỉ cần một khung hiển thị cố định (Viewport)
            và một cơ chế giả lập chiều cao.
          </p>
          <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-slate-50 p-5 dark:bg-white/5">
            <p>
              <b className="text-slate-900 dark:text-white">Cấu trúc:</b> Một Container cha có{" "}
              <code>overflow-y: auto</code> và một div con (Phantom Container).
            </p>
            <p>
              <b className="text-slate-900 dark:text-white">Nhiệm vụ:</b> Chiều cao của div con này
              bằng Tổng số lượng item × Chiều cao ước tính. Nó giúp trình duyệt hiển thị thanh cuộn
              với tỷ lệ chính xác, dù các item thật sự chưa hề tồn tại.
            </p>
          </div>
        </StepItem>

        {/* NEW Step 2 */}
        <StepItem
          step="S.02"
          title="Bước 2: Gắn Listener theo dõi sự kiện cuộn"
          accentColor="text-cyan-600 dark:text-cyan-400"
          glowColor="shadow-cyan-500/10"
        >
          <p>
            Để hệ thống biết khi nào cần cập nhật dữ liệu, anh phải biết được người dùng đang đứng ở
            đâu trong danh sách.
          </p>
          <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-slate-50 p-5 dark:bg-white/5">
            <p>
              <b className="text-cyan-700 dark:text-cyan-300">Cơ chế:</b> Anh gắn sự kiện{" "}
              <code>onScroll</code> vào Container Ref (nếu cuộn trong khung cục bộ) hoặc gắn thẳng
              vào <code>window</code> (nếu cuộn toàn trang).
            </p>
            <p>
              <b className="text-cyan-700 dark:text-cyan-300">Nhiệm vụ:</b> Mỗi khi cuộn, listener
              sẽ bắt lấy giá trị <code>scrollTop</code> và cập nhật vào State. Đây chính là "đầu
              vào" duy nhất để các bước sau tính toán toạ độ hiển thị.
            </p>
          </div>
        </StepItem>

        {/* Step 3 */}
        <StepItem
          step="S.03"
          title="Bước 3: Truy vấn vị trí bằng Binary Search"
          accentColor="text-emerald-600 dark:text-emerald-400"
          glowColor="shadow-emerald-500/10"
        >
          <p>
            Khi nhận được giá trị <code>scrollTop</code> từ Bước 2, hệ thống cần thực hiện một phép
            tính "thần tốc" để xác định trạng thái hiển thị:
          </p>
          <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-slate-50 p-5 dark:bg-white/5">
            <p>
              <b className="text-emerald-700 dark:text-emerald-300">Tính toán StartIndex:</b> Sử
              dụng Tìm kiếm nhị phân trên mảng <b>Offset Cache</b> để tìm ra Index của item có toạ
              độ Y gần nhất với <code>scrollTop</code>. Đây chính là điểm bắt đầu để anh cắt (slice)
              mảng dữ liệu.
            </p>
            <p>
              <b className="text-emerald-700 dark:text-emerald-300">Xác định TranslateY:</b> Từ
              Index vừa tìm được, anh lấy toạ độ Y thực tế của nó trong Cache. Giá trị này dùng để
              đẩy (transform) khối item đang render lên đúng vị trí, đảm bảo nó luôn khớp với thanh
              cuộn thật của trình duyệt.
            </p>
          </div>
        </StepItem>

        {/* Step 4 */}
        <StepItem
          step="S.04"
          title="Bước 4: Cập nhật kích thước thực tế với ResizeObserver"
          accentColor="text-purple-600 dark:text-purple-400"
          glowColor="shadow-purple-500/10"
        >
          <p>
            Vì chiều cao ban đầu chỉ là con số &quot;ước tính&quot;, anh cần lấy kích thước thật
            ngay khi item được render để hiệu chỉnh lại hệ thống.
          </p>
          <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-slate-50 p-5 dark:bg-white/5">
            <p>
              <b className="text-purple-700 dark:text-purple-300">Cơ chế:</b> Gắn ResizeObserver vào
              các item đang hiển thị trong Viewport.
            </p>
            <p>
              <b className="text-purple-700 dark:text-purple-300">Nhiệm vụ:</b> Khi item xuất hiện
              hoặc thay đổi nội dung (ảnh load xong, bấm mở rộng văn bản), Observer sẽ trả về chiều
              cao thực. Anh lấy con số này cập nhật lại vào Offset Cache và tính toán lại tổng chiều
              cao của toàn bộ danh sách.
            </p>
          </div>
        </StepItem>

        {/* Step 5 */}
        <StepItem
          step="S.05"
          title='Bước 5: Cơ chế "Neo cuộn" (Scroll Anchoring)'
          accentColor="text-amber-600 dark:text-amber-400"
          glowColor="shadow-amber-500/10"
        >
          <p>
            Đây là kỹ thuật xử lý trải nghiệm người dùng quan trọng nhất. Nếu một item phía trên
            khung nhìn thay đổi chiều cao, nó sẽ vô tình đẩy các item phía dưới xuống, gây hiện
            tượng giật trang.
          </p>
          <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-slate-50 p-5 dark:bg-white/5">
            <p>
              <b className="text-amber-700 dark:text-amber-300">Xử lý:</b> Tính toán độ lệch (Delta
              = Chiều cao thực tế - Chiều cao ước tính).
            </p>
            <p>
              <b className="text-amber-700 dark:text-amber-300">Bù trừ:</b> Nếu thay đổi xảy ra ở vị
              trí phía trên scrollTop, anh cần cộng dồn giá trị Delta này trực tiếp vào scrollTop
              của Container. Kết quả là người dùng sẽ thấy nội dung đứng yên một cách ổn định dù dữ
              liệu bên trên đang co giãn.
            </p>
          </div>
        </StepItem>

        {/* Step 6 */}
        <StepItem
          step="S.06"
          title="Bước 6: Tối ưu hiển thị và phần cứng"
          accentColor="text-rose-600 dark:text-rose-400"
          glowColor="shadow-rose-500/10"
        >
          <p>Để đảm bảo trải nghiệm liền mạch, anh cần thêm các tinh chỉnh về tài nguyên:</p>
          <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-slate-50 p-5 dark:bg-white/5">
            <p>
              <b className="text-rose-700 dark:text-rose-300">Vùng đệm (Overscan):</b> Luôn render
              dư ra khoảng 5-10 item ở hai đầu khung nhìn. Điều này giúp khi cuộn nhanh, các item
              mới đã sẵn sàng hiển thị trước khi người dùng kịp nhìn thấy khoảng trắng.
            </p>
            <p>
              <b className="text-rose-700 dark:text-rose-300">Tận dụng GPU:</b> Sử dụng transform:
              translate3d(0, y, 0) để định vị các item thay vì dùng thuộc tính top. Cách này giúp
              trình duyệt xử lý hình ảnh trực tiếp trên lớp (layer) đồ họa, giảm tải cho vi xử lý
              trung tâm và giữ cho chuyển động luôn mượt mà.
            </p>
          </div>
        </StepItem>
      </div>

      {/* References */}
      <div className="rounded-[2.5rem] border border-blue-100 bg-blue-50/30 p-10 dark:border-blue-500/10 dark:bg-blue-500/5">
        <h4 className="mb-8 flex items-center gap-3 text-sm font-black tracking-widest text-blue-600 uppercase dark:text-blue-400">
          <ExternalLink className="size-5" />
          Các thư viện có sẵn
        </h4>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <ReferenceItem
            title="TanStack Virtual"
            description="Mạnh về headless logic và dynamic measurement."
            link="https://tanstack.com/virtual"
          />
          <ReferenceItem
            title="React Virtuoso"
            description="Thư viện xử lý dynamic height tốt nhất hiện nay."
            link="https://virtuoso.dev/"
          />
        </div>
      </div>
    </div>
  );
}

function ReferenceItem({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 rounded-2xl border border-slate-200/60 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-xl dark:border-white/5 dark:bg-slate-900"
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {title}
        </span>
        <ExternalLink className="size-4 text-slate-400 transition-colors group-hover:text-blue-500" />
      </div>
      <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
    </a>
  );
}
