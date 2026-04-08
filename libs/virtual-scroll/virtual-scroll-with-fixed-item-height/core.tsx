"use client";

import React, { useState, useRef, useEffect } from "react";
import { TVirtualScrollProps } from "./types";

const DEFAULT_ITEM_HEIGHT = 30;
const DEFAULT_VISIBLE_COUNT = 20;
const DEFAULT_OVERSCAN = 10;

function VirtualScroll<T>({
  items,
  itemHeight = DEFAULT_ITEM_HEIGHT,
  visibleCount = DEFAULT_VISIBLE_COUNT,
  className,
  style,
  children,
  overscan = DEFAULT_OVERSCAN,
  onEndReached,
  isLoadingMore,
}: TVirtualScrollProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTriggeredLength = useRef(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(items.length, startIndex + visibleCount + overscan * 2);

  useEffect(() => {
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

export default VirtualScroll;
