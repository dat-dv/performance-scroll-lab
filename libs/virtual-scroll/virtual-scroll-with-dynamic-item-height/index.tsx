"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { TVirtualScrollDynamicHeightProps } from "./types";

const DEFAULT_ITEM_HEIGHT = 50;
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

function VirtualScrollDynamicHeight<T>({
  items,
  estimatedHeight = DEFAULT_ITEM_HEIGHT,
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
  console.log("scrollTop", scrollTop);
  console.log("viewportHeight", viewportHeight);
  // Chế độ Window Scroll được bật nếu người dùng không truyền containerHeight cố định
  const isWindowScrollMode = containerHeight === 0;

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
      const height = measuredHeights[i] ?? estimatedHeight;
      positions[i] = currentTotal;
      currentTotal += height;
    }
    return { itemPositions: positions, totalHeight: currentTotal };
  }, [items.length, measuredHeights, estimatedHeight]);

  console.log("itemPositions", itemPositions);
  console.log("totalHeight", totalHeight);

  useEffect(() => {
    if (containerRef.current) {
      setViewportHeight(containerRef.current.clientHeight);
    }
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // Chỉ thực hiện nếu không phải window scroll
    if (isWindowScrollMode) return;
    setScrollTop(e.currentTarget.scrollTop);
  };

  // Window scroll logic chỉ thực hiện effect khi là window scroll
  useEffect(() => {
    if (!isWindowScrollMode) return;
    console.log("isWindowScrollMode", isWindowScrollMode);

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
  }, [isWindowScrollMode]);

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
      const height = measuredHeights[mid] ?? estimatedHeight;
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

  // 1. rawStartIndex: Tìm index chính xác của item nằm ngay tại mép trên của khung nhìn (O(log n))
  const rawStartIndex = findStartIndex(scrollTop);

  // 2. startIndex: Index thực tế sẽ render, được lùi lại một khoảng 'overscan' (vùng đệm)
  // Việc lùi lại giúp chuẩn bị trước các item phía trên để khi cuộn ngược lên không bị thấy vùng trắng.
  // Math.max(0, ...) để đảm bảo index không bao giờ bị âm.
  const startIndex = Math.max(0, rawStartIndex - overscan);

  /**
   * Find the last visible index based on viewport height.
   */
  const findEndIndex = (startIdx: number, viewportHeight: number) => {
    const endPos = scrollTop + (viewportHeight || 600); // 600px default if no height detected yet
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
        height: isWindowScrollMode ? "auto" : (style?.height ?? containerHeight),
        overflowY: isWindowScrollMode ? "visible" : "auto",
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
