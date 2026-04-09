"use client";

import React, { useRef, useEffect } from "react";
import { IMeasuredItemHorizontalProps } from "./types";

export const MeasuredItemHorizontal = ({
  index,
  onResize,
  children,
}: IMeasuredItemHorizontalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        // Lấy borderBox để có chiều rộng chính xác nhất bao gồm padding/border
        const width = entry.borderBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;
        if (width > 0) {
          onResize(index, width);
        }
      }
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index, onResize]);

  return (
    <div ref={ref} className="h-full">
      {children}
    </div>
  );
};
