import { ReactNode, CSSProperties } from "react";

export interface THorizontalVirtualScrollDynamicProps<T> {
  items: T[];
  estimatedWidth: number;
  overscan?: number;
  className?: string;
  style?: CSSProperties;
  itemHeight?: string | number;
  children: (props: { item: T; index: number }) => ReactNode;
  onEndReached?: () => void;
  isLoadingMore?: boolean;
  hasNext?: boolean;
}

export interface IMeasuredItemHorizontalProps {
  index: number;
  onResize: (index: number, width: number) => void;
  children: ReactNode;
}
