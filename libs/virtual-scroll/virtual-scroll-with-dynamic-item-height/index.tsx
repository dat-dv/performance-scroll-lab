"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { TVirtualScrollDynamicHeightProps } from "./types";

const DEFAULT_ITEM_HEIGHT = 50;
const DEFAULT_OVERSCAN = 5;

/**
 * Thành phần MeasuredItem:
 * Tự động đo chiều cao thực tế của từng phần tử bằng ResizeObserver
 * và báo cáo kết quả về cho component cha để tính toán lại tọa độ.
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

/**
 * Component Virtual Scroll hỗ trợ item có chiều cao không cố định (Dynamic Height).
 * Sử dụng thuật toán Tìm kiếm nhị phân để tối ưu hiệu suất render.
 */
function VirtualScrollDynamicHeight<T>({
  items,
  estimatedHeight = DEFAULT_ITEM_HEIGHT,
  className,
  style,
  children,
  overscan = DEFAULT_OVERSCAN,
  onEndReached,
  isLoadingMore,
  hasNext = true,
  containerHeight = 0,
}: TVirtualScrollDynamicHeightProps<T>) {
  const [scrollTop, setScrollTop] = useState(0); // Vị trí cuộn hiện tại (relative to container)
  const [viewportHeight, setViewportHeight] = useState(0); // Chiều cao vùng hiển thị của trình duyệt

  // Nếu không truyền containerHeight thì mặc định là chế độ cuộn theo Window
  const isWindowScrollMode = containerHeight === 0;

  // Cache chiều cao thực tế của từng item sau khi đã render: { [index]: height }
  const [measuredHeights, setMeasuredHeights] = useState<Record<number, number>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const lastTriggeredLength = useRef(0); // Dùng để tránh gọi onEndReached nhiều lần cho cùng một tập dữ liệu

  /**
   * Tính toán Offset Cache (Prefix Sums):
   * itemPositions[i] lưu tọa độ Y bắt đầu của item thứ i.
   * totalHeight là tổng chiều cao giả lập cho toàn bộ danh sách (dùng để set chiều cao cho phantom container).
   */
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

  // Khởi tạo chiều cao viewport ban đầu
  useEffect(() => {
    if (containerRef.current) {
      setViewportHeight(containerRef.current.clientHeight);
    }
  }, []);

  // Xử lý sự kiện cuộn nội bộ (trong container có height cố định)
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isWindowScrollMode) return;
    setScrollTop(e.currentTarget.scrollTop);
  };

  /**
   * Logic xử lý cuộn toàn trang (Window Scroll):
   * Cần tính toán độ lệch (offsetTop) của Container so với đỉnh trang
   * để biết chính xác vị trí scrollTop tương đối.
   */
  useEffect(() => {
    if (!isWindowScrollMode) return;

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
   * Truy vấn vị trí bằng Binary Search (O(log n)):
   * Tìm index của item đầu tiên xuất hiện trong vùng scrollTop.
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

  /**
   * QUAN TRỌNG: Tính toán dải Index cần render
   */

  // 1. rawStartIndex: Index chính xác nằm ngay mép trên khung nhìn
  const rawStartIndex = findStartIndex(scrollTop);

  // 2. startIndex: Index render thực tế (đã lùi lại vùng đệm overscan bên trên)
  // Giúp khi người dùng cuộn ngược lên không bị thấy khoảng trắng (flicker)
  const startIndex = Math.max(0, rawStartIndex - overscan);

  /**
   * 3. findEndIndex: Tìm index cuối cùng hiển thị dựa trên chiều cao khung nhìn.
   * Kết quả sẽ được cộng thêm overscan vùng đệm bên dưới.
   */
  const findEndIndex = (startIdx: number, vHeight: number) => {
    const endPos = scrollTop + vHeight;
    let i = startIdx;
    while (i < items.length && itemPositions[i] < endPos) {
      i++;
    }
    return Math.min(items.length, i + overscan);
  };

  // Xác định chiều cao viewport thực tế để tính toán endIndex
  const activeViewportHeight = isWindowScrollMode ? viewportHeight : containerHeight;
  const endIndex = findEndIndex(rawStartIndex, activeViewportHeight);

  /**
   * Cập nhật cache chiều cao khi MeasuredItem báo cáo kích thước thực tế mới.
   */
  const handleItemResize = useCallback((index: number, height: number) => {
    setMeasuredHeights((prev) => {
      if (prev[index] === height) return prev;
      return { ...prev, [index]: height };
    });
  }, []);

  /**
   * Logic Infinite Scroll:
   * Tự động gọi API tải thêm khi người dùng cuộn gần đến cuối danh sách (cách threshold đơn vị).
   */
  useEffect(() => {
    const threshold = 4; // Điểm kích hoạt tải thêm (cách cuối 4 phần tử)
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
      {/* Phantom Container: Dùng để giả lập tổng chiều cao của toàn bộ danh sách */}
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
                top: itemPositions[absoluteIndex], // Đặt item vào đúng tọa độ Y từ cache
                left: 0,
                right: 0,
              }}
            >
              {/* Bọc item trong MeasuredItem để lấy chiều cao thực sau khi render */}
              <MeasuredItem index={absoluteIndex} onResize={handleItemResize}>
                {children({ index: absoluteIndex, item })}
              </MeasuredItem>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VirtualScrollDynamicHeight;
