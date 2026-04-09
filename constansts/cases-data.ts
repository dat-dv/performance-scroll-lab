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
    title: "1. Small Dataset / Vertical / Fixed Height",
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
    title: "2. Small Dataset / Horizontal / Fixed Width",
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
    title: "3.1. Small Dataset / Grid / Fixed Size",
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
    title: "3.2. Small Dataset / Grid / Dynamic Width",
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
    title: "3.3. Small Dataset / Grid / Dynamic Height",
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
    title: "3.4. Small Dataset / Grid / Dynamic Axis",
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
    title: "4. Huge Dataset / Vertical / Fixed Height",
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
    title: "5. Huge Dataset / Vertical / Dynamic Height",
    description: "Ảo hóa cho item có nội dung co giãn. Dùng ResizeObserver.",
    recommendation: "Linh hoạt cho: Social Feed, Chat Threads, News Gallery.",
    href: "/long-vertical-item-dynamic-height",
    sourcePath: "app/long-vertical-item-dynamic-height/page.tsx",
    scale: "long",
    direction: "vertical",
    itemSize: "dynamic",
    isDone: true,
  },

  // --- TIER 3: LONG SCALE (VIRTUAL HORIZONTAL) ---
  {
    id: "6",
    title: "6. Huge Dataset / Horizontal / Fixed Width",
    description: "Tối ưu hóa cuộn ngang cho các dataset lớn với item cố định.",
    recommendation: "Giữ DOM gọn nhẹ. Áp dụng cho: Timelines, Carousels lớn.",
    href: "/long-horizontal-fixed",
    sourcePath: "app/long-horizontal-fixed/page.tsx",
    scale: "long",
    direction: "horizontal",
    itemSize: "fixed",
    isDone: true,
  },
  {
    id: "7",
    title: "7. Huge Dataset / Horizontal / Dynamic Width",
    description: "Tối ưu cuộn ngang cho item có chiều rộng thay đổi liên tục.",
    recommendation: "Scaling logic. Áp dụng cho: Financial Charts, Tag Clouds.",
    href: "/long-horizontal-dynamic",
    sourcePath: "app/long-horizontal-dynamic/page.tsx",
    scale: "long",
    direction: "horizontal",
    itemSize: "dynamic",
    isDone: true,
  },

  // --- TIER 4: 2D GRID (VIRTUAL GRID) ---
  {
    id: "8",
    title: "8. Huge Dataset / 2D Grid / Fixed Size",
    description: "Virtual scroll 2D cho các item có kích thước cố định.",
    recommendation: "O(1) 2D mapping. Áp dụng cho: Spreadsheets, Heatmaps.",
    href: "/long-2d-item-fixed-width-height",
    sourcePath: "app/long-2d-item-fixed-width-height/page.tsx",
    scale: "long",
    direction: "bidirectional",
    itemSize: "fixed",
    isDone: true,
  },
];
