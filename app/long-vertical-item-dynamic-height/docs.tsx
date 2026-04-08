"use client";

import React from "react";
import { ExternalLink, Sparkles, Code2, Cpu, Info, Zap } from "lucide-react";
import StepItem from "@/components/step-item";
import ReferenceItem from "../referance-item";

/**
 * Technical documentation for Dynamic Height Virtualization.
 * Content focused on expert-level architecture (Steps 1-6 + Outro).
 */
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
          title='Bước 1: Thiết lập "Khung xương"'
          accentColor="text-blue-600 dark:text-blue-400"
          glowColor="shadow-blue-500/10"
        >
          <p>
            Đừng render toàn bộ dữ liệu vào DOM. Mình chỉ cần một khung hiển thị cố định (Viewport)
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

        {/* Step 2 */}
        <StepItem
          step="S.02"
          title="Bước 2: Gắn Listener theo dõi sự kiện cuộn"
          accentColor="text-cyan-600 dark:text-cyan-400"
          glowColor="shadow-cyan-500/10"
        >
          <p>
            Để hệ thống biết khi nào cần cập nhật dữ liệu, mình phải biết được người dùng đang đứng
            ở đâu trong danh sách.
          </p>
          <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-slate-50 p-5 dark:bg-white/5">
            <p>
              <b className="text-cyan-700 dark:text-cyan-300">Cơ chế:</b> Mình gắn sự kiện{" "}
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
            tính "thần tốc" để xác định trạng thái hiển thị mà không cần duyệt qua toàn bộ danh
            sách:
          </p>
          <div className="mt-4 flex flex-col gap-4 rounded-2xl bg-slate-50 p-6 dark:bg-white/5">
            <p>
              <b className="text-emerald-700 dark:text-emerald-300">
                Tính toán StartIndex (O(log n)):
              </b>{" "}
              Sử dụng Tìm kiếm nhị phân trên mảng <b>Offset Cache</b> (mảng chứa tọa độ Y bắt đầu
              của từng item). Thuật toán này giúp mình tìm ra Index của item đầu tiên xuất hiện
              trong khung nhìn chỉ trong vài micro giây.
            </p>
            <p>
              <b className="text-emerald-700 dark:text-emerald-300">
                Xác định TranslateY (Vị trí tuyệt đối):
              </b>{" "}
              Sau khi có Index, mình truy xuất tọa độ Y chính xác của item đó từ Cache. Giá trị này
              được dùng để thiết lập thuộc tính <code>transform: translate3d(0, y, 0)</code> cho
              khối bao quanh các item đang render.
            </p>
            <div className="border-t border-slate-200 pt-4 dark:border-white/5">
              <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                Nhiệm vụ cốt lõi:
              </p>
              <p className="mt-1 text-sm leading-relaxed">
                Việc này đảm bảo rằng dù mình chỉ render một nhóm nhỏ item (ví dụ 20/1.000.000), thì
                nhóm đó vẫn luôn được đặt ở đúng vị trí tương ứng với thanh cuộn thật của trình
                duyệt, tạo ra ảo giác về một danh sách dài vô tận mà không gây nặng bộ nhớ.
              </p>
            </div>
          </div>
        </StepItem>

        {/* Step 4 */}
        <StepItem
          step="S.04"
          title="Bước 4: Vòng lặp Render và Tự động hiệu chỉnh (Measure & Cache)"
          accentColor="text-purple-600 dark:text-purple-400"
          glowColor="shadow-purple-500/10"
        >
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                Sau khi đã xác định được dải Index cần render (ví dụ từ 0 đến 20), từ mảng items ban
                đầu nhận vào chúng ta sẽ render trong khoảng Index (0 - 20) ra ui.
              </p>
              <div className="flex items-start gap-4 rounded-2xl border border-blue-100 bg-blue-50/50 p-4 dark:border-white/5 dark:bg-white/5">
                <div className="mt-1 rounded-full bg-blue-500/10 p-2 text-blue-600 dark:text-blue-400">
                  <Cpu className="size-4" />
                </div>
                <p className="text-sm leading-relaxed">
                  Mỗi phần tử render ra lập tức được bọc bởi <b>ResizeObserver</b>. Ngay sau khi
                  trình duyệt vẽ xong, Observer sẽ trả về chiều cao thực và báo về{" "}
                  <code>handleItemResize</code>.
                </p>
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-purple-100 bg-purple-50/30 p-6 dark:border-white/5 dark:bg-white/5">
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 text-xs font-black tracking-widest text-purple-700 uppercase dark:text-purple-400">
                  <Info className="size-3" />
                  Quy trình đồng bộ dữ liệu
                </h4>
                <div className="space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  <p>
                    Ở bước trước để render ra khung xương chúng ta đã tính toán{" "}
                    <b>itemPositions, totalHeight</b>.
                  </p>
                  <ul className="list-disc space-y-2 pl-4 marker:text-purple-400">
                    <li>
                      <b>itemPositions</b> là 1 mảng lưu trữ tọa độ Y bắt đầu của từng item.
                    </li>
                    <li>
                      Ban đầu dự báo thông qua <code>estimatedHeight</code>, sau đó được cập nhật
                      thực tế vào <b>measuredHeights</b>.
                    </li>
                  </ul>

                  <p className="mt-4 rounded-xl bg-purple-100/50 p-4 font-medium text-purple-900 dark:bg-purple-900/30 dark:text-purple-200">
                    Kỹ thuật này giúp vòng lặp render cực kỳ linh hoạt: Khi render xong phần tử nào,
                    nó sẽ &quot;khớp&quot; lại toạ độ Y của phần tử đó và toàn bộ các phần tử phía
                    sau.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-[2rem] bg-slate-900 p-8 text-white">
              <div className="flex items-center gap-3">
                <Code2 className="size-5 text-emerald-400" />
                <h4 className="text-sm font-bold tracking-tight">Vòng lặp tự hiệu chỉnh</h4>
              </div>
              <div className="space-y-4 text-sm leading-relaxed text-slate-400">
                <p>
                  Khi các item render hoàn tất sẽ callback lên update lại <b>measuredHeights</b> và
                  tính toán lại <b>itemPositions</b> và <b>totalHeight</b>.
                </p>
                <div className="h-px bg-white/10" />
                <p className="text-emerald-400 italic">
                  -&gt; Các lần tiếp theo chỉ cần scroll top thay đổi nó sẽ lại đi tính toán lại
                  start item và end items. Nếu start và end thay đổi thì nó sẽ lại đi tính toán lại.
                </p>
              </div>
            </div>
          </div>
        </StepItem>

        {/* Step 5 */}
        <StepItem
          step="S.05"
          title='Bước 5: Kỹ thuật "Overscan" và Sự ổn định của Slice'
          accentColor="text-amber-600 dark:text-amber-400"
          glowColor="shadow-amber-500/10"
        >
          <div className="space-y-5">
            <p className="leading-relaxed">
              Đây là bước tối ưu sống còn để danh sách không bị render lại (re-slice) liên tục, gây
              tốn tài nguyên CPU khi người dùng cuộn từng pixel nhỏ.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-5 dark:border-white/5 dark:bg-white/5">
                <div className="mb-3 flex items-center gap-2 text-amber-700 dark:text-amber-400">
                  <Zap className="size-4" />
                  <b className="text-sm font-black tracking-widest uppercase">
                    Tránh Slice liên tục
                  </b>
                </div>
                <p className="text-sm leading-relaxed">
                  Thay vì chỉ lấy đúng 20 item trong Viewport, mình render dư ra 5-10 item ở cả 2
                  đầu. Khi người dùng cuộn nhẹ, tập hợp item (slice) vẫn giữ nguyên, giúp trình
                  duyệt không phải tính toán lại DOM liên tục.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-5 dark:border-white/5 dark:bg-white/5">
                <div className="mb-3 flex items-center gap-2 text-amber-700 dark:text-amber-400">
                  <Info className="size-4" />
                  <b className="text-sm font-black tracking-widest uppercase">
                    Loại bỏ hiện tượng Trắng
                  </b>
                </div>
                <p className="text-sm leading-relaxed">
                  Lớp đệm đóng vai trò &quot;vùng chờ&quot;. Khi cuộn nhanh, các item tiếp theo đã
                  có mặt sẵn trong DOM, triệt tiêu hoàn toàn hiện tượng &quot;flicker&quot; trắng
                  trang thường thấy ở các giải pháp thô sơ.
                </p>
              </div>
            </div>

            <p className="rounded-xl border-l-4 border-amber-400 bg-amber-50 p-4 text-sm font-medium text-amber-900 dark:bg-amber-900/20 dark:text-amber-300">
              💡 <b>Tư duy chuyên gia:</b> Render dư ít hơn 10 item không ảnh hưởng đến hiệu năng,
              nhưng nó giúp &quot;ổn định hóa&quot; trạng thái của mảng Render, giảm tải cho bộ máy
              tính toán Start/End Index.
            </p>
          </div>
        </StepItem>
      </div>

      {/* References */}
      <div className="rounded-[2.5rem] border border-blue-100 bg-blue-50/30 pt-4 dark:border-blue-500/10 dark:bg-blue-500/5">
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
