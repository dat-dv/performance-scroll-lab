/**
 * TechnicalIntro Component
 * Renders a structured explanation of the challenges and solutions for large list performance.
 */
export function TechnicalIntro() {
  return (
    <div className="mb-10">
      <h1 className="text-xl font-bold tracking-tight tracking-widest text-gray-900 uppercase dark:text-white">
        Virtualized List (HOC)
      </h1>
      <div className="mt-4 max-w-4xl text-sm leading-relaxed text-gray-500">
        <div className="mb-6">
          <span className="flex items-center gap-2 font-bold text-red-600 dark:text-red-500">
            🔴 Thách thức:
          </span>
          <ul className="mt-2 ml-2 list-inside list-disc space-y-1">
            <li>
              <strong>Quá tải DOM:</strong> Render hàng nghìn phần tử cùng lúc khiến trình duyệt
              giật lag và tiêu tốn nhiều RAM.
            </li>
            <li>
              <strong>Chi phí xử lý cao:</strong> Các thao tác tính toán layout, reflow và repaint
              trở nên rất tốn kém.
            </li>
            <li>
              <strong>Hạn chế thiết bị:</strong> Hiệu năng giảm sâu trên các thiết bị cấu hình yếu
              hoặc mobile.
            </li>
          </ul>
        </div>

        <div>
          <span className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-500">
            🟢 Giải pháp (Virtual Scroll):
          </span>
          <ul className="mt-2 ml-2 list-inside list-disc space-y-1">
            <li>
              <strong>Render theo Viewport:</strong> Chỉ hiển thị những phần tử thực sự nằm trong
              tầm mắt người dùng.
            </li>
            <li>
              <strong>Tối ưu bộ nhớ:</strong> Giảm đáng kể số lượng DOM nodes, giúp trải nghiệm mượt
              mà hơn.
            </li>
            <li>
              <strong>Khả năng mở rộng:</strong> Nền tảng để xây dựng timeline, bảng dữ liệu lớn
              hoặc infinite scroll hiệu quả.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
