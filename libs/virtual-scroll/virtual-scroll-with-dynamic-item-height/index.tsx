"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { TVirtualScrollDynamicHeightProps } from "./types";

const DEFAULT_ITEM_HEIGHT = 50;
const DEFAULT_VISIBLE_COUNT = 10;
const DEFAULT_OVERSCAN = 5;

/**
 * Thành phần đo lường: Tự động đo chiều cao thực tế của từng phần tử
 * và báo về cho cha để cập nhật bản đồ vị trí.
 */
function MeasuredItem({
  children,
  onResize,
  index,
}: {
  children: React.ReactNode;
  onResize: (index: number, height: number) => void;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.borderBoxSize[0]?.blockSize || entry.contentRect.height;
        if (height > 0) {
          onResize(index, height);
        }
      }
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index, onResize]);

  return <div ref={ref}>{children}</div>;
}
MeasuredItem.displayName = "MeasuredItem";

function VirtualScrollDynamicHeight<T>({
  items,
  itemHeight = DEFAULT_ITEM_HEIGHT,
  visibleCount = DEFAULT_VISIBLE_COUNT,
  className,
  style,
  children: renderItem,
  overscan = DEFAULT_OVERSCAN,
  onEndReached,
  isLoadingMore,
  hasNext = true,
  containerHeight = 0,
}: TVirtualScrollDynamicHeightProps<T>) {
  const [scrollTop, setScrollTop] = useState(0); // Vị trí cuộn hiện tại
  const [viewportHeight, setViewportHeight] = useState(0); // Chiều cao khung nhìn thấy

  // Chế độ Window Scroll được bật nếu người dùng không truyền containerHeight cố định
  const useWindowScroll = containerHeight === 0;

  // Cache chiều cao của từng item đã được đo: { [index]: height }
  const [measuredHeights, setMeasuredHeights] = useState<Record<number, number>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const lastTriggeredLength = useRef(0);

  // Tính toán vị trí Y tuyệt đối của từng item (Prefix Sums)
  // itemPositions[i] là tọa độ Y mà item thứ i sẽ bắt đầu
  const { itemPositions, totalHeight } = useMemo(() => {
    const positions = new Array(items.length);
    let currentTotal = 0;
    for (let i = 0; i < items.length; i++) {
      const height = measuredHeights[i] ?? itemHeight;
      positions[i] = currentTotal;
      currentTotal += height;
    }
    return { itemPositions: positions, totalHeight: currentTotal };
  }, [items.length, measuredHeights, itemHeight]);

  useEffect(() => {
    if (containerRef.current) {
      setViewportHeight(containerRef.current.clientHeight);
    }
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!useWindowScroll) {
      setScrollTop(e.currentTarget.scrollTop);
    }
  };

  // Window scroll logic
  useEffect(() => {
    if (!useWindowScroll) return;

    const handleWindowScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const currentScrollY = window.scrollY;

      // offsetTop: Khoảng cách từ đỉnh trang đến điểm bắt đầu của component
      const offsetTop = rect.top + currentScrollY;

      // scrollTop: Lượng dữ liệu đã bị cuộn qua tính từ đầu component
      setScrollTop(Math.max(0, currentScrollY - offsetTop));
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    window.addEventListener("resize", handleWindowScroll);
    handleWindowScroll();

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      window.removeEventListener("resize", handleWindowScroll);
    };
  }, [useWindowScroll]);

  /**
   * Tìm index của item đầu tiên cần render bằng Tìm kiếm nhị phân (O(log n)).
   * Giúp ứng dụng mượt mà ngay cả khi có hàng trăm ngàn item.
   */
  const findStartIndex = (scrollPos: number) => {
    let start = 0;
    let end = items.length - 1;
    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      const pos = itemPositions[mid];
      const height = measuredHeights[mid] ?? itemHeight;
      if (pos <= scrollPos && pos + height > scrollPos) {
        return mid;
      }
      if (pos < scrollPos) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
    return Math.max(0, start - 1);
  };

  const rawStartIndex = findStartIndex(scrollTop);
  const startIndex = Math.max(0, rawStartIndex - overscan);

  /**
   * Find the last visible index based on viewport height.
   */
  const findEndIndex = (startIdx: number, viewportHeight: number) => {
    const endPos = scrollTop + (viewportHeight || visibleCount * itemHeight);
    let i = startIdx;
    while (i < items.length && itemPositions[i] < endPos) {
      i++;
    }
    return Math.min(items.length, i + overscan);
  };

  // Determine which height to use for viewport calculation
  const activeViewportHeight = containerHeight > 0 ? containerHeight : viewportHeight;
  const endIndex = findEndIndex(rawStartIndex, activeViewportHeight);

  /**
   * Cập nhật cache chiều cao khi MeasuredItem báo cáo kích thước mới.
   */
  const handleItemResize = useCallback((index: number, height: number) => {
    setMeasuredHeights((prev) => {
      if (prev[index] === height) return prev;
      return { ...prev, [index]: height };
    });
  }, []);

  // Logic Infinite Scroll: Tự động tải thêm khi cuộn gần đến cuối
  useEffect(() => {
    if (onEndReached && !isLoadingMore && endIndex >= items.length - 2 && hasNext) {
      if (lastTriggeredLength.current !== items.length) {
        onEndReached();
        lastTriggeredLength.current = items.length;
      }
    }
  }, [endIndex, items.length, onEndReached, isLoadingMore, hasNext]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={className}
      style={{
        height: useWindowScroll ? "auto" : (style?.height ?? visibleCount * itemHeight),
        overflowY: useWindowScroll ? "visible" : "auto",
        position: "relative",
        WebkitOverflowScrolling: "touch",
        ...style,
      }}
    >
      <div
        style={{
          height: totalHeight,
          position: "relative",
          width: "100%",
        }}
      >
        {items.slice(startIndex, endIndex).map((item, index) => {
          const absoluteIndex = startIndex + index;
          return (
            <div
              key={absoluteIndex}
              style={{
                position: "absolute",
                top: itemPositions[absoluteIndex],
                left: 0,
                right: 0,
              }}
            >
              <MeasuredItem index={absoluteIndex} onResize={handleItemResize}>
                {renderItem({ index: absoluteIndex, item })}
              </MeasuredItem>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VirtualScrollDynamicHeight;
