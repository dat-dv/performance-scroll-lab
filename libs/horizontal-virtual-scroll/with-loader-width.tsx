"use client";

import React, { useState, useEffect, useRef } from "react";
import { HorizontalVirtualScrollProps } from ".";

/**
 * HOC withLoaderWidth
 * Automatically calculates item width based on the first element's size.
 */
function withLoaderWidth<T>(
  WrappedComponent: React.ComponentType<HorizontalVirtualScrollProps<T>>
) {
  return function WithLoaderWidth<P extends T>(
    props: Omit<HorizontalVirtualScrollProps<P>, "itemWidth">
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sampleItemRef = useRef<HTMLDivElement>(null);
    const [itemWidth, setItemWidth] = useState<number | null>(null);

    useEffect(() => {
      if (sampleItemRef.current && itemWidth === null) {
        setItemWidth(sampleItemRef.current.offsetWidth);
      }
    }, [itemWidth]);

    if (itemWidth === null) {
      // Render 1 item mẫu ẩn để đo width
      const firstItem = props.items[0];
      if (!firstItem) return null;

      return (
        <div ref={containerRef} style={{ width: "fit-content", opacity: 0, pointerEvents: "none", position: "absolute" }}>
          <div ref={sampleItemRef} style={{ display: "inline-block" }}>
            {props.children({ index: 0, item: firstItem })}
          </div>
        </div>
      );
    }

    // Khi đã đo xong, truyền itemWidth vào WrappedComponent
    return (
      <WrappedComponent
        {...(props as unknown as HorizontalVirtualScrollProps<T>)}
        itemWidth={itemWidth}
      />
    );
  };
}

export default withLoaderWidth;
