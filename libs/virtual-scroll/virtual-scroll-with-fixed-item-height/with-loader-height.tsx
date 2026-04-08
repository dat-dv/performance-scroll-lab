"use client";

import React, { useState, useEffect, useRef } from "react";
import { TVirtualScrollProps } from "./types";

function withLoaderHeight<T>(WrappedComponent: React.ComponentType<TVirtualScrollProps<T>>) {
  return function WithLoaderHeight<P extends T>(props: Omit<TVirtualScrollProps<P>, "itemHeight">) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sampleItemRef = useRef<HTMLDivElement>(null);
    const [itemHeight, setItemHeight] = useState<number | null>(null);

    useEffect(() => {
      if (sampleItemRef.current && !itemHeight) {
        setItemHeight(sampleItemRef.current.offsetHeight);
      }
    }, [itemHeight]);

    if (itemHeight === null) {
      // Render 1 item mẫu để đo height
      const firstItem = props.items[0];
      if (!firstItem) return null;
      return (
        <div ref={containerRef} style={{ width: "100%", opacity: 0 }}>
          <div ref={sampleItemRef}>{props.children({ index: 0, item: firstItem })}</div>
        </div>
      );
    }

    console.log("[HOC] withLoaderHeight rerender");

    // Khi đã đo xong, truyền itemHeight vào WrappedComponent
    return (
      <WrappedComponent {...(props as unknown as TVirtualScrollProps<T>)} itemHeight={itemHeight} />
    );
  };
}

export default withLoaderHeight;
