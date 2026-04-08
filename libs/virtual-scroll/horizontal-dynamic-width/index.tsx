"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { THorizontalVirtualScrollDynamicProps } from "./types";
import { MeasuredItemHorizontal } from "./measured-item";

const DEFAULT_ESTIMATED_WIDTH = 300;
const DEFAULT_OVERSCAN = 5;

/**
 * Component: HorizontalVirtualScrollDynamic
 * Giải pháp tối ưu nhất cho danh sách ngang có chiều rộng Item không cố định.
 * Sử dụng Prefix Sums + Binary Search + ResizeObserver.
 */
export default function HorizontalVirtualScrollDynamic<T>({
  items,
  estimatedWidth = DEFAULT_ESTIMATED_WIDTH,
  overscan = DEFAULT_OVERSCAN,
  className,
  style,
  itemHeight = 400,
  children,
  onEndReached,
  isLoadingMore,
  hasNext = true,
}: THorizontalVirtualScrollDynamicProps<T>) {
  const [scrollLeft, setScrollLeft] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  // Cache lưu trữ chiều rộng thực tế đã đo được
  const [measuredWidths, setMeasuredWidths] = useState<Record<number, number>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const lastTriggeredLength = useRef(0);

  // Lấy chiều rộng khung nhìn
  useEffect(() => {
    if (containerRef.current) {
      setViewportWidth(containerRef.current.clientWidth);
    }
    const handleResize = () => {
      if (containerRef.current) setViewportWidth(containerRef.current.clientWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * Tính toán Offset Cache (Prefix Sums):
   * itemPositions[i] lưu tọa độ X bắt đầu của item thứ i.
   */
  const { itemPositions, totalWidth } = useMemo(() => {
    const positions = new Array(items.length);
    let currentX = 0;
    for (let i = 0; i < items.length; i++) {
      const width = measuredWidths[i] ?? estimatedWidth;
      positions[i] = currentX;
      currentX += width;
    }
    return { itemPositions: positions, totalWidth: currentX };
  }, [items.length, measuredWidths, estimatedWidth]);

  /**
   * Thuật toán Binary Search (O(log n)):
   * Tìm item đầu tiên xuất hiện trong viewport dựa trên scrollLeft.
   */
  const findStartIndex = (left: number) => {
    let low = 0;
    let high = itemPositions.length - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (itemPositions[mid] <= left) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return Math.max(0, high);
  };

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleItemResize = useCallback((index: number, width: number) => {
    setMeasuredWidths((prev) => {
      if (prev[index] === width) return prev;
      return { ...prev, [index]: width };
    });
  }, []);

  // Tính toán vùng hiển thị thực tế
  const rawStartIndex = findStartIndex(scrollLeft);
  const startIndex = Math.max(0, rawStartIndex - overscan);

  // Tìm endIndex: duyệt từ startIndex cho đến khi vượt quá viewportWidth
  let temporaryEndIndex = rawStartIndex;
  while (
    temporaryEndIndex < items.length &&
    itemPositions[temporaryEndIndex] < scrollLeft + viewportWidth
  ) {
    temporaryEndIndex++;
  }
  const endIndex = Math.min(items.length, temporaryEndIndex + overscan);

  // Logic Infinite Scroll
  useEffect(() => {
    const threshold = 5;
    if (onEndReached && !isLoadingMore && endIndex >= items.length - threshold && hasNext) {
      if (lastTriggeredLength.current !== items.length) {
        onEndReached();
        lastTriggeredLength.current = items.length;
      }
    }
  }, [endIndex, items.length, onEndReached, isLoadingMore, hasNext]);

  return (
    <div
      ref={containerRef}
      onScroll={onScroll}
      className={`scrollbar-hide relative overflow-x-auto overflow-y-hidden ${className || ""}`}
      style={{
        width: "100%",
        height: itemHeight,
        ...style,
      }}
    >
      {/* Phantom Width */}
      <div style={{ width: totalWidth, height: "100%", position: "relative" }}>
        {items.slice(startIndex, endIndex).map((item, index) => {
          const absoluteIndex = startIndex + index;
          return (
            <div
              key={absoluteIndex}
              style={{
                position: "absolute",
                left: itemPositions[absoluteIndex], // Tọa độ X từ cache
                top: 0,
                bottom: 0,
                height: "100%",
              }}
            >
              <MeasuredItemHorizontal index={absoluteIndex} onResize={handleItemResize}>
                {children({ item, index: absoluteIndex })}
              </MeasuredItemHorizontal>
            </div>
          );
        })}
      </div>
    </div>
  );
}
