"use client";

import React, { useState, useRef, JSX } from "react";
import withLoaderHeight from "./with-loader-height";

const DEFAULT_ITEM_HEIGHT = 30;
const DEFAULT_VISIBLE_COUNT = 20;
// Render extra items above and below the visible window to prevent
// whitespace flicker during fast scrolling in either direction.
const DEFAULT_OVERSCAN = 10;

export type TVirtualScrollWithFixedItemHeightProps<T> = {
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

function VirtualScrollWithFixedItemHeight<T>({
  items,
  itemHeight = DEFAULT_ITEM_HEIGHT,
  visibleCount = DEFAULT_VISIBLE_COUNT,
  className,
  style,
  children,
  overscan = DEFAULT_OVERSCAN,
  onEndReached,
  isLoadingMore,
}: TVirtualScrollWithFixedItemHeightProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTriggeredLength = useRef(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(items.length, startIndex + visibleCount + overscan * 2);

  // Trigger onEndReached when approaching the bottom
  React.useEffect(() => {
    if (onEndReached && !isLoadingMore && endIndex >= items.length - 2) {
      if (lastTriggeredLength.current !== items.length) {
        onEndReached();
        lastTriggeredLength.current = items.length;
      }
    }
  }, [endIndex, items.length, onEndReached, isLoadingMore]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={className}
      style={{
        height: visibleCount * itemHeight,
        overflowY: "auto",
        position: "relative",
        ...style,
      }}
    >
      <div
        style={{
          height: items.length * itemHeight,
          position: "relative",
          width: "100%",
        }}
      >
        {items.slice(startIndex, endIndex).map((item, index) => {
          const absoluteIndex = startIndex + index;
          return (
            // Use absoluteIndex as key — it's stable relative to the full
            // items array, unlike the local slice index.
            <div
              key={absoluteIndex}
              style={{
                position: "absolute",
                top: absoluteIndex * itemHeight,
                left: 0,
                right: 0,
                height: itemHeight,
              }}
            >
              {children({ index: absoluteIndex, item })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default withLoaderHeight(VirtualScrollWithFixedItemHeight);
