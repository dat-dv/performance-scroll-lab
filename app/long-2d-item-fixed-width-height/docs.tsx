export default function Docs() {
  return (
    <div className="text-foreground/80 max-w-3xl space-y-8 text-sm/relaxed antialiased selection:bg-blue-500/10">
      <div className="border-border-primary bg-foreground/[0.02] hover:bg-foreground/[0.03] rounded-2xl border p-6 shadow-sm transition-all">
        Chúng ta có rất nhiều bài toán 2D Grid, Ví dụ:
        <br /> - Schedule Timeline (Theo trục OX là thời gian, trục OY là danh sách công việc, đề
        mục) - chỉ có 2 scroll (1 dọc, 1 ngang)
        <br /> - TV Channels (Trục OX là danh sách nội dung theo timeline, trục OY là các channels
        khác nhau) - có 1 scroll dọc và mỗi row (channel) có scroll ngang độc lập
        <br /> - Kanban board dạng grid (nhiều cột + nhiều hàng, có thể scroll vô hạn) - có 1 scroll
        ngang và mỗi column có scroll dọc riêng (nested scroll)
        <br /> - Ngoài ra có các trường hợp phức tạp hơn như sticky header, footer, sidebar hoặc các
        layout dạng schedule có một số cột/fixed column luôn hiển thị khi scroll
        <br /> - Ngoài ra có trường hợp mỗi cell chỉ đóng vai trò làm grid nền, còn data (event) sẽ
        được render dạng absolute theo thời gian (ví dụ schedule timeline, event kéo dài nhiều slot)
      </div>
      <div className="border-border-primary bg-foreground/[0.02] hover:bg-foreground/[0.03] rounded-2xl border p-6 shadow-sm transition-all">
        Để thực hiện 2D grid với scroll dọc + ngang, có fetch thêm data (cả 2 phía hoặc chỉ ngang)
        <br />
        về ý tưởng thì sẽ có 2 bài toán cần giải:
        <br />
        1. dùng window scroll
        <br />
        2. dùng container scroll
        <br />
        ở đây mình đi theo hướng container scroll cho đỡ phức tạp
        <br />- đầu tiên, data structure của items sẽ không phải array nữa mà là Map&lt;`row-col`,
        Item&gt;, mỗi key đại diện cho 1 cell trong grid
        <br />
        - Item là dữ liệu của cell (id và các field cần thiết tuỳ business)
        <br />
        - cách này giúp mình truy cập O(1), không bị phụ thuộc vào kích thước data và không bị ảnh
        hưởng khi prepend/append
        <br />
        - tiếp theo, mình cần xác định được window hiển thị (startRow, endRow, startCol, endCol)
        <br />
        - từ scrollTop và scrollLeft sẽ tính ra row/col hiện tại bằng math (không cần loop)
        <br />
        - ví dụ: mỗi row cao 50px, scrollTop = 260 thì row = Math.floor(260 / 50) = 5
        <br />
        - tương tự: mỗi col rộng 100px, scrollLeft = 230 thì col = Math.floor(230 / 100) = 2
        <br />
        - từ row/col hiện tại + kích thước viewport sẽ suy ra được vùng cần render
        <br />
        - từ đó render ra các cell trong window, cell nào chưa có data thì coi như đang loading
        <br />
      </div>
    </div>
  );
}
