import React from "react";

export type TVirtualScrollDynamicHeightProps<T> = {
  items: T[];
  estimatedHeight?: number;
  className?: string;
  style?: React.CSSProperties;
  overscan?: number;
  onEndReached?: () => void;
  isLoadingMore?: boolean;
  containerHeight?: number;
  useWindowScroll?: boolean;
  children: ({ index, item }: { index: number; item: T }) => React.ReactNode;
  hasNext?: boolean;
};
