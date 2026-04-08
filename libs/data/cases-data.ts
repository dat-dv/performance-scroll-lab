export type CaseScale = "short" | "long" | "all";
export type CaseDirection = "vertical" | "horizontal" | "bidirectional" | "all";
export type CaseItemSize = "fixed" | "dynamic" | "all";

export interface RenderCase {
  id: string;
  title: string;
  description: string;
  recommendation: string;
  href: string;
  sourcePath: string;
  scale: CaseScale;
  direction: CaseDirection;
  itemSize: CaseItemSize;
  isDone: boolean;
}

export const cases: RenderCase[] = [
  // --- TIER 1: NATIVE (SHORT SCALE) ---
  {
    id: "1",
    title: "1. Short Vertical (Native Map)",
    description: "Render toàn bộ danh sách nhỏ (<100 items) bằng native .map()",
    recommendation: "Hiệu năng DOM. Áp dụng cho: Contacts, Navigation Menu, Sidebar.",
    href: "/short-vertical",
    sourcePath: "app/short-vertical/page.tsx",
    scale: "short",
    direction: "vertical",
    itemSize: "all",
    isDone: true,
  },
  {
    id: "2",
    title: "2. Short Horizontal (Native Map)",
    description: "Cuộn ngang native cho các danh sách nhỏ không cần ảo hóa.",
    recommendation: "Native Scrollbar. Áp dụng cho: Story Bar, Category Chips, Tabs.",
    href: "/short-horizontal",
    sourcePath: "app/short-horizontal/page.tsx",
    scale: "short",
    direction: "horizontal",
    itemSize: "all",
    isDone: true,
  },
  {
    id: "3.1",
    title: "3.1. Short 2D Grid (Fixed H - Fixed W)",
    description: "Layout 2D đồng nhất tuyệt đối cho icon hoặc các phần tử cố định.",
    recommendation: "Native Grid. Áp dụng cho: App Launcher, Media Gallery.",
    href: "/short-grid-fixed-height-fixed-width",
    sourcePath: "app/short-grid-fixed-height-fixed-width/page.tsx",
    scale: "short",
    direction: "bidirectional",
    itemSize: "fixed",
    isDone: true,
  },
  {
    id: "3.2",
    title: "3.2. Short 2D Grid (Fixed H - Dynamic W)",
    description: "Item height cố định, width co giãn theo nội dung (Tag Cloud style).",
    recommendation: "Flex Wrap. Áp dụng cho: Category Chips, Badge Lists.",
    href: "/short-grid-fixed-height-dynamic-width",
    sourcePath: "app/short-grid-fixed-height-dynamic-width/page.tsx",
    scale: "short",
    direction: "bidirectional",
    itemSize: "dynamic",
    isDone: true,
  },
  {
    id: "3.3",
    title: "3.3. Short 2D Grid (Dynamic H - Fixed W)",
    description: "Width cố định theo cột, height tự giãn theo nội dung (Card style).",
    recommendation: "CSS Grid Stretch. Áp dụng cho: Product Grids, News Feed.",
    href: "/short-grid-dynamic-height-fixed-width",
    sourcePath: "app/short-grid-dynamic-height-fixed-width/page.tsx",
    scale: "short",
    direction: "bidirectional",
    itemSize: "dynamic",
    isDone: true,
  },
  {
    id: "3.4",
    title: "3.4. Short 2D Grid (Dynamic H - Dynamic W)",
    description: "Cả 2 chiều đều co giãn linh hoạt, tạo cấu trúc Mosaic/Masonry.",
    recommendation: "CSS Columns. Áp dụng cho: Pinterest Style, Photo Feed.",
    href: "/short-grid-dynamic-height-dynamic-width",
    sourcePath: "app/short-grid-dynamic-height-dynamic-width/page.tsx",
    scale: "short",
    direction: "bidirectional",
    itemSize: "dynamic",
    isDone: true,
  },

  // --- TIER 2: LONG SCALE (VIRTUAL VERTICAL) ---
  {
    id: "4",
    title: "4. Long Vertical (Item Fixed Height)",
    description: "Ảo hóa tối ưu cho 100k+ items với chiều cao cố định. O(1) access.",
    recommendation: "Sync Math logic. Áp dụng cho: Large Directories, Audit Logs.",
    href: "/long-vertical-item-fixed-height",
    sourcePath: "app/long-vertical-item-fixed-height/page.tsx",
    scale: "long",
    direction: "vertical",
    itemSize: "fixed",
    isDone: true,
  },
  {
    id: "5",
    title: "5. Long Vertical (Item Dynamic Height)",
    description: "Ảo hóa cho item có nội dung co giãn. Dùng ResizeObserver.",
    recommendation: "Linh hoạt cho: Social Feed, Chat Threads, News Gallery.",
    href: "/long-vertical-item-dynamic-height",
    sourcePath: "app/long-vertical-item-dynamic-height/page.tsx",
    scale: "long",
    direction: "vertical",
    itemSize: "dynamic",
    isDone: false,
  },

  // --- TIER 3: LONG SCALE (VIRTUAL HORIZONTAL) ---
  {
    id: "6",
    title: "6. Long Horizontal (Item Fixed Width)",
    description: "Tối ưu hóa cuộn ngang cho các dataset lớn với item cố định.",
    recommendation: "Giữ DOM gọn nhẹ. Áp dụng cho: Timelines, Carousels lớn.",
    href: "/long-horizontal-fixed",
    sourcePath: "app/long-horizontal-fixed/page.tsx",
    scale: "long",
    direction: "horizontal",
    itemSize: "fixed",
    isDone: false,
  },
  {
    id: "7",
    title: "7. Long Horizontal (Item Dynamic Width)",
    description: "Tối ưu cuộn ngang cho item có chiều rộng thay đổi liên tục.",
    recommendation: "Scaling logic. Áp dụng cho: Financial Charts, Tag Clouds.",
    href: "/long-horizontal-dynamic",
    sourcePath: "app/long-horizontal-dynamic/page.tsx",
    scale: "long",
    direction: "horizontal",
    itemSize: "dynamic",
    isDone: false,
  },

  // --- TIER 4: 2D GRID (VIRTUAL GRID) ---
  {
    id: "8",
    title: "8. 2D Grid (Fixed Item Size)",
    description: "Ảo hóa 2 chiều (X & Y) cho các ma trận dữ liệu khổng lồ.",
    recommendation: "O(1) 2D mapping. Áp dụng cho: Spreadsheets, Heatmaps.",
    href: "/grid-fixed",
    sourcePath: "app/grid-fixed/page.tsx",
    scale: "all",
    direction: "bidirectional",
    itemSize: "fixed",
    isDone: false,
  },
  {
    id: "9",
    title: "9. 2D Grid (Dynamic Item Size)",
    description: "Ảo hóa 2 chiều cho các item có kích thước không đồng đều.",
    recommendation: "Masonry virtualization. Áp dụng cho: Pro Photo Gallery.",
    href: "/grid-dynamic",
    sourcePath: "app/grid-dynamic/page.tsx",
    scale: "all",
    direction: "bidirectional",
    itemSize: "dynamic",
    isDone: false,
  },

  // --- TIER 5: COMPOSITE PATTERNS ---
  {
    id: "10",
    title: "10. Infinite Loading (Paginated)",
    description: "Kết hợp Virtualization với cơ chế tải dữ liệu Header/Pagination.",
    recommendation: "Lazy loading. Áp dụng cho: Infinite Wall, Shop Catalogs.",
    href: "/infinite-loading",
    sourcePath: "app/infinite-loading/page.tsx",
    scale: "all",
    direction: "vertical",
    itemSize: "all",
    isDone: false,
  },
  {
    id: "12",
    title: "12. Nested Virtualization (Netflix Pattern)",
    description: "Cấu trúc lồng ghép: Virtual List dọc chứa nhiều Virtual List ngang.",
    recommendation: "Ultimate UX. Áp dụng cho: Netflix Lobby, App Store Home.",
    href: "/nested-virtualization",
    sourcePath: "app/nested-virtualization/page.tsx",
    scale: "all",
    direction: "bidirectional",
    itemSize: "all",
    isDone: false,
  },
];
