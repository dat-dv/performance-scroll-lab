import React from "react";

export type TVirtualScrollProps<T> = {
  items: T[];
  itemHeight?: number;
  visibleCount?: number;
  className?: string;
  style?: React.CSSProperties;
  overscan?: number;
  onEndReached?: () => void;
  isLoadingMore?: boolean;
  children: ({ index, item }: { index: number; item: T }) => React.ReactNode;
};
