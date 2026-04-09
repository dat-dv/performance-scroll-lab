export function Docs() {
  return (
    <div className="text-foreground/80 max-w-3xl space-y-8 text-sm/relaxed antialiased selection:bg-blue-500/10">
      <div className="border-border-primary bg-foreground/[0.02] hover:bg-foreground/[0.03] rounded-2xl border p-6 shadow-sm transition-all">
        Chúng ta có rất ít bài toán sử dụng riêng Virtualization cho trục ngang, Ví dụ:
        <br /> - Để tạo ra 1 kanban có N cột, mỗi cột có M item, ta sẽ có N * M item (thông thường
        bài toán này người ta sẽ kết hợp với Virtualization cho trục dọc)
        <br /> - Các layout dạng list ngang (carousel, slider) nhưng số lượng item thường không quá
        lớn nên ít khi cần virtualization
        <br /> - TV Channels hoặc các layout nhiều row, mỗi row scroll ngang (thường sẽ tách thành
        nhiều scroll container thay vì virtual toàn bộ theo trục ngang)
        <br />
        <br />
        - lý do là vì số lượng phần tử theo chiều ngang trong UI thường bị giới hạn bởi viewport
        (không quá lớn như chiều dọc)
        <br />
        - ngoài ra, việc xử lý scroll ngang thường phức tạp hơn (sticky column, sync scroll, nhiều
        container)
        <br />
        - vì vậy trong thực tế, horizontal virtualization thường chỉ xuất hiện khi số lượng column
        rất lớn (ví dụ timeline, data grid)
        <br />
        <br />- bản chất của bài toán vẫn là chỉ render các column nằm trong viewport thay vì toàn
        bộ danh sách
      </div>
    </div>
  );
}
