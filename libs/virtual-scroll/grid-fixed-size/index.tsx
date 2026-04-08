"use client";

import React, { useState, useRef, useMemo, useCallback } from "react";
import { IVirtualGridFixedProps } from "./types";

/**
 * Component: VirtualGridFixedSize
 * Giải pháp ảo hóa 2 chiều cho dữ liệu ma trận khổng lồ.
 * Hiệu năng: O(1) truy vấn vị trí hiển thị.
 */
export default function VirtualGridFixedSize<T>({
  data,
  columnWidth,
  rowHeight,
  overscan = 2,
  className,
  style,
  children: renderItem,
  height,
}: IVirtualGridFixedProps<T>) {
  const [scroll, setScroll] = useState({ top: 0, left: 0 });
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Lấy kích thước thực tế của viewport
  React.useEffect(() => {
    if (containerRef.current) {
      setViewport({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    }
  }, []);

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScroll({
      top: e.currentTarget.scrollTop,
      left: e.currentTarget.scrollLeft,
    });
  }, []);

  // Tính toán vùng chỉ số (indices) cần render
  const rowCount = data.length;
  const columnCount = data[0]?.length || 0;

  const range = useMemo(() => {
    // Trục Y (Dọc)
    const startY = Math.max(0, Math.floor(scroll.top / rowHeight) - overscan);
    const endY = Math.min(
      rowCount,
      Math.ceil((scroll.top + viewport.height) / rowHeight) + overscan
    );

    // Trục X (Ngang)
    const startX = Math.max(0, Math.floor(scroll.left / columnWidth) - overscan);
    const endX = Math.min(
      columnCount,
      Math.ceil((scroll.left + viewport.width) / columnWidth) + overscan
    );

    return { startY, endY, startX, endX };
  }, [scroll, viewport, rowHeight, columnWidth, rowCount, columnCount, overscan]);

  const totalWidth = columnCount * columnWidth;
  const totalHeight = rowCount * rowHeight;

  // Tạo dải Item cần render (Sparse Matrix)
  const itemsToRender = [];
  for (let r = range.startY; r < range.endY; r++) {
    for (let c = range.startX; c < range.endX; c++) {
      itemsToRender.push({
        rowIndex: r,
        columnIndex: c,
        item: data[r][c],
      });
    }
  }

  return (
    <div
      ref={containerRef}
      onScroll={onScroll}
      className={`scrollbar-hide relative overflow-auto rounded-3xl ${className || ""}`}
      style={{
        height,
        width: "100%",
        ...style,
      }}
    >
      {/* Phantom Container (X & Y) */}
      <div
        style={{
          width: totalWidth,
          height: totalHeight,
          position: "relative",
          willChange: "transform",
        }}
      >
        {itemsToRender.map(({ item, rowIndex, columnIndex }) => (
          <div
            key={`${rowIndex}-${columnIndex}`}
            className="absolute"
            style={{
              top: rowIndex * rowHeight,
              left: columnIndex * columnWidth,
              width: columnWidth,
              height: rowHeight,
            }}
          >
            {renderItem({ item, rowIndex, columnIndex })}
          </div>
        ))}
      </div>
    </div>
  );
}
