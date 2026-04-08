export interface RenderCase {
  title: string;
  description: string;
  recommendation: string;
  href: string;
  scale: "short" | "long" | "all";
  direction: "vertical" | "horizontal" | "bidirectional" | "all";
  itemSize: "fixed" | "dynamic" | "all";
  isDone: boolean;
}

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
    isDone: true,
  },
  {
    title: "2. Short Horizontal (Native Map)",
    description: "Cuộn ngang mảng nhỏ sử dụng CSS Scroll Snap.",
    recommendation: ".map() + snap-x. Áp dụng cho: Tab Bar, Story Circle.",
    href: "/short-horizontal",
    scale: "short",
    direction: "horizontal",
    itemSize: "all",
    isDone: true,
  },
  {
    title: "3. Short 2D Grid (Native Map)",
    description: "Grid 2 chiều đơn giản cho dashboard hoặc gallery nhỏ.",
    recommendation: "CSS Grid Layout. Áp dụng cho: App Launcher, Card Grid.",
    href: "/short-2d-grid",
    scale: "short",
    direction: "bidirectional",
    itemSize: "all",
    isDone: true,
  },

  // --- TIER 2: LONG SCALE (VIRTUAL VERTICAL) ---
  {
    title: "4. Long Vertical (Item Fixed Height)",
    description:
      "Ảo hóa tối ưu cho 100k+ items với chiều cao cố định. Hỗ trợ Infinite Load (Tải thêm).",
    recommendation: "Tối ưu nhất cho Table, VirtualSelect (10k items), TreeView.",
    href: "/long-vertical-item-fixed-height",
    scale: "long",
    direction: "vertical",
    itemSize: "fixed",
    isDone: true,
  },
  {
    title: "5. Long Vertical (Item Dynamic Height)",
    description: "Ảo hóa cho item có nội dung co giãn. Tích hợp Infinite Load và ResizeObserver.",
    recommendation: "Linh hoạt cho: Social Feed, Chat Threads (Reverse), News Gallery.",
    href: "/long-vertical-item-dynamic-height",
    scale: "long",
    direction: "vertical",
    itemSize: "dynamic",
    isDone: false,
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
    isDone: false,
  },
  {
    title: "7. Long Horizontal (Item Dynamic Width)",
    description: "Ảo hóa cuộn ngang cho các item có chiều rộng không đồng nhất.",
    recommendation:
      "Cần ResizeObserver cho chiều ngang. Áp dụng cho: Dynamic Tag Clouds, Galleries.",
    href: "/long-horizontal-item-dynamic-width",
    scale: "long",
    direction: "horizontal",
    itemSize: "dynamic",
    isDone: false,
  },

  // --- TIER 4: LONG SCALE (VIRTUAL 2D GRID) ---
  {
    title: "8. Long 2D Grid (Fixed Width & Height)",
    description: "Lưới 2D đồng nhất hoàn toàn. Hiệu năng cao nhất cho Cell Rendering.",
    recommendation: "Zero-calculation. Áp dụng cho: Icon Browser, Photo Gallery (Square).",
    href: "/long-2d-grid-fixed",
    scale: "long",
    direction: "bidirectional",
    itemSize: "fixed",
    isDone: false,
  },
  {
    title: "9. Long 2D Grid (Fixed Width, Dynamic Height)",
    description: "Lưới có số cột cố định nhưng chiều cao mỗi item thay đổi theo nội dung.",
    recommendation: "Masonry-like. Áp dụng cho: Pinterest Layout, Instagram-style Feed.",
    href: "/long-2d-grid-fixed-width-dynamic-height",
    scale: "long",
    direction: "bidirectional",
    itemSize: "dynamic",
    isDone: false,
  },
  {
    title: "10. Long 2D Grid (Fixed Height, Dynamic Width)",
    description: "Lưới có chiều cao hàng cố định nhưng chiều rộng các cột thay đổi.",
    recommendation: "Gantt/Timeline style. Áp dụng cho: Calendar, Schedule Planner.",
    href: "/long-2d-grid-fixed-height-dynamic-width",
    scale: "long",
    direction: "bidirectional",
    itemSize: "dynamic",
    isDone: false,
  },
  {
    title: "11. Long 2D Grid (Dynamic Width & Height)",
    description: "Toàn bộ kích thước ô dữ liệu đều co giãn linh hoạt (Full Matrix).",
    recommendation: "Matrix complex. Áp dụng cho: Full Spreadsheet (Excel), Kanban Boards.",
    href: "/long-2d-grid-dynamic",
    scale: "long",
    direction: "bidirectional",
    itemSize: "dynamic",
    isDone: false,
  },

  // --- TIER 5: COMPOSITE (NESTED) ---
  {
    title: "12. Long Composite (Nested Virtualization)",
    description: "Kết hợp Nested: Dọc (Dynamic Height cho Row) + Ngang (Fixed Width cho Item).",
    recommendation: "Pinnacle of Performance. Áp dụng cho: Netflix Home, App Store.",
    href: "/long-composite-nested",
    scale: "long",
    direction: "bidirectional",
    itemSize: "all",
    isDone: false,
  },
];
