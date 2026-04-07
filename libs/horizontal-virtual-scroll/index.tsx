"use client";

import React, { useState, useRef, useCallback, useMemo, useEffect } from "react";

export interface HorizontalVirtualScrollProps<T> {
  items: T[];
  itemWidth: number;
  visibleCount: number;
  overscan?: number;
  onEndReached?: () => void;
  isLoadingMore?: boolean;
  children: (props: { index: number; item: T }) => React.ReactNode;
}

/**
 * Horizontal Virtual Scroll Component
 * High performance virtualization for horizontal lists with fixed item widths.
 */
export default function HorizontalVirtualScroll<T>({
  items,
  itemWidth,
  visibleCount,
  overscan = 5,
  onEndReached,
  isLoadingMore,
  children,
}: HorizontalVirtualScrollProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const lastTriggeredLength = useRef(0);

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollLeft(e.currentTarget.scrollLeft);
  }, []);

  // Calculate range of items to render
  const { startIndex, endIndex } = useMemo(() => {
    const start = Math.floor(scrollLeft / itemWidth);
    const end = Math.min(items.length, start + visibleCount + overscan);
    const finalStart = Math.max(0, start - overscan);

    return { startIndex: finalStart, endIndex: end };
  }, [scrollLeft, itemWidth, visibleCount, overscan, items.length]);

  // Trigger onEndReached when approaching the end
  useEffect(() => {
    if (onEndReached && !isLoadingMore && endIndex >= items.length - 2) {
      if (lastTriggeredLength.current !== items.length) {
        onEndReached();
        lastTriggeredLength.current = items.length;
      }
    }
  }, [endIndex, items.length, onEndReached, isLoadingMore]);

  const visibleItems = items.slice(startIndex, endIndex);

  // Total horizontal width
  const totalWidth = items.length * itemWidth;
  // Offset to shift the container to the right position
  const offsetX = startIndex * itemWidth;

  return (
    <div
      ref={containerRef}
      onScroll={onScroll}
      className="scrollbar-hide relative overflow-x-auto overflow-y-hidden"
      style={{ width: visibleCount * itemWidth }}
    >
      {/* Sizer: Simulates total width */}
      <div style={{ width: totalWidth, height: "100%", position: "relative" }}>
        {/* Render Container: Moves with scroll */}
        <div
          className="flex h-full"
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

export { default as withLoaderWidth } from "./with-loader-width";
