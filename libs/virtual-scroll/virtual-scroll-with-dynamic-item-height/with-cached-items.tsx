"use client";

import React, { useState, useEffect, useRef } from "react";
import { TVirtualScrollDynamicHeightProps } from "./types";

function withCachedItems<T>(
  WrappedComponent: React.ComponentType<TVirtualScrollDynamicHeightProps<T>>
) {
  return function WithCachedItems(props: TVirtualScrollDynamicHeightProps<T>) {
    console.log("[HOC] withCachedItems rerender");
    // Khi đã đo xong, truyền itemHeight vào WrappedComponent
    return <WrappedComponent {...props} />;
  };
}

export default withCachedItems;
