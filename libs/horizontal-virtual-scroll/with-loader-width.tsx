"use client";

import React, { useState, useEffect, useRef } from "react";
import { HorizontalVirtualScrollProps } from ".";

/**
 * HOC withLoaderWidth
 * Automatically calculates item width based on the first element's size.
 */
function withLoaderSize<T>(WrappedComponent: React.ComponentType<HorizontalVirtualScrollProps<T>>) {
  return function WithLoaderSize<P>(
    props: Omit<HorizontalVirtualScrollProps<P>, "itemWidth"> & { itemWidth?: number }
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sampleItemRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState<{ width: number; height: number } | null>(null);

    useEffect(() => {
      if (sampleItemRef.current && size === null) {
        setSize({
          width: sampleItemRef.current.offsetWidth,
          height: sampleItemRef.current.offsetHeight,
        });
      }
    }, [size]);

    if (size === null && !props.itemWidth) {
      // Render 1 item mẫu ẩn để đo width
      const firstItem = props.items[0];
      if (!firstItem) return null;

      return (
        <div
          ref={containerRef}
          style={{
            width: "fit-content",
            opacity: 0,
            pointerEvents: "none",
            position: "absolute",
          }}
        >
          <div ref={sampleItemRef} style={{ display: "inline-block" }}>
            {props.children({ index: 0, item: firstItem })}
          </div>
        </div>
      );
    }

    // Khi đã đo xong, truyền size vào WrappedComponent như default values
    const itemWidth = props.itemWidth ?? size?.width ?? 0;
    const itemHeight = props.itemHeight ?? size?.height;

    return (
      <WrappedComponent
        {...(props as unknown as HorizontalVirtualScrollProps<T>)}
        {...(itemWidth > 0 ? { itemWidth } : {})}
        {...(itemHeight ? { itemHeight } : {})}
      />
    );
  };
}

export default withLoaderSize;
