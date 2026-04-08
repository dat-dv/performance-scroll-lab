import { ReactNode, CSSProperties } from "react";

export interface THorizontalVirtualScrollDynamicProps<T> {
  /** Danh sách dữ liệu */
  items: T[];
  /** Chiều rộng ước tính ban đầu (Forecasting) */
  estimatedWidth: number;
  /** Buffer render ở 2 đầu */
  overscan?: number;
  /** Class CSS cho container */
  className?: string;
  /** Style cho container */
  style?: CSSProperties;
  /** Chiều cao của khung cuộn (ngang) */
  itemHeight?: string | number;
  /** Hàm render từng item */
  children: (props: { item: T; index: number }) => ReactNode;
  /** Sự kiện tải thêm */
  onEndReached?: () => void;
  isLoadingMore?: boolean;
  hasNext?: boolean;
}

export interface IMeasuredItemHorizontalProps {
  index: number;
  onResize: (index: number, width: number) => void;
  children: ReactNode;
}
