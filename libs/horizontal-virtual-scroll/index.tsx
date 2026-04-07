"use client";

import React, { useState, useRef, useCallback, useMemo, useEffect } from "react";
import withLoaderSize from "./with-loader-width";

export interface HorizontalVirtualScrollProps<T> {
  items: T[];
  itemWidth: number;
  visibleCount?: number | null;
  overscan?: number;
  onEndReached?: () => void;
  isLoadingMore?: boolean;
  className?: string;
  itemHeight?: string | number;
  children: (props: { index: number; item: T }) => React.ReactNode;
}

/**
 * Raw Horizontal Virtual Scroll Component
 * Used when you want to provide itemWidth manually and avoid HOC measurement.
 */
export function HorizontalVirtualScroll<T>({
  items,
  itemWidth,
  visibleCount,
  overscan = 5,
  onEndReached,
  isLoadingMore,
  className,
  itemHeight = 400,
  children,
}: HorizontalVirtualScrollProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget) {
      setScrollLeft(e.currentTarget.scrollLeft);
    }
  }, []);

  const { startIndex, endIndex } = useMemo(() => {
    // If no visibleCount, estimate based on a standard 1200px viewport
    const count = visibleCount || 6;
    const safeWidth = itemWidth || 320;
    const start = Math.floor(scrollLeft / safeWidth);
    const end = Math.min(items.length, start + count + overscan);
    const finalStart = Math.max(0, start - overscan);
    return { startIndex: finalStart, endIndex: end };
  }, [scrollLeft, itemWidth, visibleCount, overscan, items.length]);

  useEffect(() => {
    if (onEndReached && !isLoadingMore && endIndex >= items.length - 2) {
      onEndReached();
    }
  }, [endIndex, items.length, onEndReached, isLoadingMore]);

  const visibleItems = items.slice(startIndex, endIndex);
  const totalWidth = items.length * itemWidth;
  const offsetX = startIndex * itemWidth;

  console.log("visibleItems", visibleItems, startIndex);

  return (
    <div
      ref={containerRef}
      onScroll={onScroll}
      className={`scrollbar-hide relative overflow-x-auto overflow-y-hidden ${className || ""}`}
      style={{
        ...(visibleCount ? { width: visibleCount * itemWidth } : { width: "100%" }),
        height: itemHeight,
      }}
    >
      <div style={{ width: totalWidth, height: "100%", position: "relative" }}>
        <div
          className="absolute top-0 left-0 flex h-full"
          style={{
            transform: `translateX(${offsetX}px)`,
            willChange: "transform",
          }}
        >
          {visibleItems.map((item, i) => {
            const actualIndex = startIndex + i;
            return (
              <div key={actualIndex} style={{ width: itemWidth, height: "100%", flexShrink: 0 }}>
                {children({ index: actualIndex, item })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default withLoaderSize(HorizontalVirtualScroll);
