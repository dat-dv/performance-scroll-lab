import { RenderCase } from "@/components/case-card";

/**
 * Architectural Patterns for Virtualization.
 * Focused on the "How" (Height Logic) rather than the "What" (UI Content).
 */
export const cases: RenderCase[] = [
  // --- PATTERN 1: NATIVE RENDERING (SHORT SCALE) ---
  {
    title: "1. Short Vertical (Native Map)",
    description: "Render mảng nhỏ trực tiếp vào DOM. Không cần xử lý scroll phức tạp.",
    recommendation: "Đơn giản nhất. Áp dụng cho: Roster, Menu, Chat Header.",
    href: "/short-vertical",
    scale: "short",
    direction: "vertical",
    itemSize: "all",
  },
  {
    title: "2. Short Horizontal (Native Map)",
    description: "Cuộn ngang mảng nhỏ sử dụng CSS Scroll Snap.",
    recommendation: ".map() + snap-x. Áp dụng cho: Tab Bar, Story Circle.",
    href: "/short-horizontal",
    scale: "short",
    direction: "horizontal",
    itemSize: "all",
  },
  {
    title: "3. Short 2D Grid (Native Map)",
    description: "Grid 2 chiều đơn giản cho dashboard hoặc gallery nhỏ.",
    recommendation: "CSS Grid Layout. Áp dụng cho: App Launcher, Card Grid.",
    href: "/short-2d-grid",
    scale: "short",
    direction: "bidirectional",
    itemSize: "all",
  },

  // --- PATTERN 2: VIRTUAL WINDOWING (LONG SCALE) ---
  {
    title: "4. Long Vertical (Item Fixed Height)",
    description: "Ảo hóa tối ưu cho 100k+ items với chiều cao cố định. Hỗ trợ Infinite Load (Tải thêm).",
    recommendation: "Tối ưu nhất cho Table, VirtualSelect (10k items), TreeView, Roster dài.",
    href: "/long-vertical-item-fixed-height",
    scale: "long",
    direction: "vertical",
    itemSize: "fixed",
  },
  {
    title: "5. Long Vertical (Item Dynamic Height)",
    description: "Ảo hóa cho item có nội dung co giãn. Tích hợp Infinite Load và ResizeObserver.",
    recommendation: "Linh hoạt cho: Social Feed, Chat Threads (Reverse), News Gallery.",
    href: "/long-vertical-item-dynamic-height",
    scale: "long",
    direction: "vertical",
    itemSize: "dynamic",
  },
  {
    title: "6. Long 2D Grid (Fixed Virtualization)",
    description: "Ảo hóa 2 chiều đồng thời (X/Y) cho dữ liệu dạng lưới khổng lồ.",
    recommendation: "Xử lý hàng triệu cell. Áp dụng cho: Spreadsheet (Excel), Kanban, Gantt.",
    href: "/long-2d-grid",
    scale: "long",
    direction: "bidirectional",
    itemSize: "all",
  },
  {
    title: "7. Long Horizontal (Fixed Virtualization)",
    description: "Tối ưu hóa cuộn ngang cho các dataset lớn theo chiều rộng.",
    recommendation: "Giữ DOM gọn nhẹ. Áp dụng cho: Timelines, Large Horizontal Dashboards.",
    href: "/long-horizontal",
    scale: "long",
    direction: "horizontal",
    itemSize: "fixed",
  },
];
