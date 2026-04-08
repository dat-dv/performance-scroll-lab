import { RenderCase } from "@/components/case-card";

/**
 * Architectural Patterns for Virtualization.
 * Ordered by: Scale -> Direction -> Item Complexity.
 */
export const cases: RenderCase[] = [
  // --- TIER 1: SHORT SCALE (NATIVE) ---
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

  // --- TIER 2: LONG SCALE (VIRTUAL VERTICAL) ---
  {
    title: "4. Long Vertical (Item Fixed Height)",
    description: "Ảo hóa tối ưu cho 100k+ items với chiều cao cố định. Hỗ trợ Infinite Load (Tải thêm).",
    recommendation: "Tối ưu nhất cho Table, VirtualSelect (10k items), TreeView.",
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

  // --- TIER 3: LONG SCALE (VIRTUAL HORIZONTAL) ---
  {
    title: "6. Long Horizontal (Item Fixed Width)",
    description: "Tối ưu hóa cuộn ngang cho các dataset lớn với chiều rộng item cố định.",
    recommendation: "Giữ DOM gọn nhẹ. Áp dụng cho: Timelines, Product Carousels đồng nhất.",
    href: "/long-horizontal",
    scale: "long",
    direction: "horizontal",
    itemSize: "fixed",
  },
  {
    title: "7. Long Horizontal (Item Dynamic Width)",
    description: "Ảo hóa cuộn ngang cho các item có chiều rộng không đồng nhất.",
    recommendation: "Cần ResizeObserver cho chiều ngang. Áp dụng cho: Dynamic Tag Clouds, Multi-aspect ratio Galleries.",
    href: "/long-horizontal-item-dynamic-width",
    scale: "long",
    direction: "horizontal",
    itemSize: "dynamic",
  },

  // --- TIER 4: LONG SCALE (VIRTUAL 2D GRID) ---
  {
    title: "8. Long 2D Grid (Item Fixed Size)",
    description: "Ảo hóa 2 chiều đồng thời (X/Y) cho lưới các item có kích thước đồng nhất.",
    recommendation: "Xử lý hàng triệu cell. Áp dụng cho: Photo Gallery khổng lồ, Icon Grid.",
    href: "/long-2d-grid",
    scale: "long",
    direction: "bidirectional",
    itemSize: "fixed",
  },
  {
    title: "9. Long 2D Grid (Item Dynamic Size)",
    description: "Lưới 2 chiều với chiều cao hàng hoặc chiều rộng cột thay đổi.",
    recommendation: "Phức tạp nhất (Matrix measuring). Áp dụng cho: Spreadsheet (Excel), Kanban, Gantt.",
    href: "/long-2d-grid-item-dynamic-size",
    scale: "long",
    direction: "bidirectional",
    itemSize: "dynamic",
  },
];
