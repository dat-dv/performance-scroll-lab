# The Windowing Lab: Virtualization Architecture 🚀

Dự án nghiên cứu chuyên sâu về UI Performance và Virtualization, giải quyết bài toán tối ưu hóa $N$ nodes khi render các tập dữ liệu cực lớn trên trình duyệt.

## 🎯 Mục tiêu cốt lõi

Triệt tiêu tình trạng lag/crash bằng cách chỉ render các phần tử trong khung nhìn (Viewport), kiểm soát số lượng DOM nodes ổn định bất kể quy mô dữ liệu.

## 🏛️ Hệ thống 5 phần

- **1: Native (Short Scale)** - < 100 items: Dùng `.map()` trực tiếp + CSS Scroll Snap.
- **2: Standard Windowing (Long Vertical)** - 10k - 1M items: Tính toán chiều cao cố định, vị trí tuyệt đối.
- **3: Horizontal Windowing (Long Horizontal)**: Tối ưu cuộn ngang cho dataset lớn.
- **4: Bidirectional Windowing (2D Grid)**: Xử lý ma trận dữ liệu (Spreadsheet/Gallery).
- **5: Composite (Nested Virtualization)**: Lồng ghép cuộn dọc và ngang.

## 💎 4 Trụ cột toán học

- **Không gian ảo**: Tính `totalSize` (width/height) ngay lập tức để giả lập thanh cuộn chuẩn xác.
- **Truy xuất $O(1)$**: Xác định index cần render tức thì bằng phép chia: `scrollTop / itemHeight` (không loop).
- **Vị trí tuyệt đối**: Mapping index vào tọa độ thực tế qua `transform: translate(x, y)` để giữ item đúng vị trí khi cuộn.
- **Math vs Observer**: Ưu tiên **Sync Math** để tính toán vị trí, tránh độ trễ (white flash) của Async IntersectionObserver.

## 🛠️ Tech Stack & Roadmap

- **Stack**: Next.js, Framer Motion, Tailwind CSS, Lucide React.
