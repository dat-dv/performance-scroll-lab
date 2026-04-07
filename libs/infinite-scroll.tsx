"use client";

import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
  ReactNode,
  ElementType,
  HTMLAttributes,
} from "react";

export interface InfiniteScrollProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  element?: ElementType;
  hasMore?: boolean;
  initialLoad?: boolean;
  isReverse?: boolean;
  loader?: ReactNode;
  loadMore: (page: number) => void;
  pageStart?: number;
  getScrollParent?: () => HTMLElement | null;
  threshold?: number;
  useCapture?: boolean;
  useWindow?: boolean;
}

const InfiniteScroll = forwardRef<HTMLElement, InfiniteScrollProps>(
  (
    {
      children,
      element = "div",
      hasMore = false,
      initialLoad = true,
      isReverse = false,
      loader,
      loadMore,
      pageStart = 0,
      getScrollParent,
      threshold = 250,
      useCapture = false,
      useWindow = true,
      className,
      ...rest
    },
    forwardedRef
  ) => {
    const scrollComponent = useRef<HTMLElement | null>(null);
    const pageLoaded = useRef(pageStart);
    const loadMoreInProgress = useRef(false);
    const beforeScrollHeight = useRef(0);
    const beforeScrollTop = useRef(0);

    useImperativeHandle(forwardedRef, () => scrollComponent.current as HTMLElement);

    const isPassiveSupported = useMemo(() => {
      if (typeof window === "undefined") return false;
      let passive = false;
      try {
        const options: AddEventListenerOptions = {
          get passive() {
            passive = true;
            return true;
          },
        };
        const noop = () => {};
        window.addEventListener("test", noop, options);
        window.removeEventListener("test", noop, options);
      } catch (e) {}
      return passive;
    }, []);

    const eventOptions = useMemo<AddEventListenerOptions | boolean>(() => {
      if (isPassiveSupported) {
        return { capture: useCapture, passive: true };
      }
      return useCapture;
    }, [isPassiveSupported, useCapture]);

    const getParentElement = useCallback(
      (el: HTMLElement | null): HTMLElement | null => {
        const scrollParent = getScrollParent?.();
        if (scrollParent != null) return scrollParent;
        return el ? el.parentElement : null;
      },
      [getScrollParent]
    );

    const calculateTopPosition = useCallback((el: HTMLElement | null): number => {
      if (!el) return 0;
      const offsetParent = el.offsetParent;
      return (
        el.offsetTop +
        calculateTopPosition(offsetParent instanceof HTMLElement ? offsetParent : null)
      );
    }, []);

    const calculateOffset = useCallback(
      (el: HTMLElement | null, scrollTop: number) => {
        if (!el) return 0;
        return calculateTopPosition(el) + (el.offsetHeight - scrollTop - window.innerHeight);
      },
      [calculateTopPosition]
    );

    const scrollListener = useCallback(() => {
      const el = scrollComponent.current;
      if (!el || !hasMore) return;

      const parentNode = getParentElement(el);
      if (!parentNode && !useWindow) return;

      let offset: number;
      if (useWindow) {
        const doc = document.documentElement || document.body.parentNode || document.body;
        const scrollTop =
          window.scrollY !== undefined ? window.scrollY : (doc as HTMLElement).scrollTop;

        if (isReverse) {
          offset = scrollTop;
        } else {
          offset = calculateOffset(el, scrollTop);
        }
      } else if (isReverse) {
        offset = (parentNode as HTMLElement).scrollTop;
      } else {
        offset =
          el.scrollHeight -
          (parentNode as HTMLElement).scrollTop -
          (parentNode as HTMLElement).clientHeight;
      }

      // Trigger loadMore if we pass the threshold and the element is visible
      if (offset < Number(threshold) && el.offsetParent !== null) {
        if (parentNode) {
          beforeScrollHeight.current = parentNode.scrollHeight;
          beforeScrollTop.current = parentNode.scrollTop;
        }

        if (typeof loadMore === "function" && !loadMoreInProgress.current) {
          loadMoreInProgress.current = true;
          loadMore((pageLoaded.current += 1));
        }
      }
    }, [hasMore, getParentElement, useWindow, isReverse, calculateOffset, threshold, loadMore]);

    const mousewheelListener = useCallback(
      (e: Event) => {
        if (!(e instanceof WheelEvent)) return;
        if (e.deltaY === 1 && !isPassiveSupported) {
          e.preventDefault();
        }
      },
      [isPassiveSupported]
    );

    // Reset progress flag whenever new children are provided, indicating a data update
    useEffect(() => {
      loadMoreInProgress.current = false;
    }, [children]);

    // Attach scroll and resize listeners on mount and dependency change
    useEffect(() => {
      const parent = getParentElement(scrollComponent.current);
      if (!hasMore || (!parent && !useWindow)) return;

      const target: EventTarget = useWindow ? window : (parent as HTMLElement);

      target.addEventListener("wheel", mousewheelListener, eventOptions);
      target.addEventListener("scroll", scrollListener as EventListener, eventOptions);
      target.addEventListener("resize", scrollListener as EventListener, eventOptions);

      if (initialLoad) {
        scrollListener();
      }

      return () => {
        target.removeEventListener("wheel", mousewheelListener, eventOptions);
        target.removeEventListener("scroll", scrollListener as EventListener, eventOptions);
        target.removeEventListener("resize", scrollListener as EventListener, eventOptions);
      };
    }, [
      hasMore,
      useWindow,
      initialLoad,
      scrollListener,
      mousewheelListener,
      eventOptions,
      getParentElement,
    ]);

    // Handle reverse scroll positioning to maintain focal point
    useEffect(() => {
      if (isReverse && loadMoreInProgress.current) {
        const parent = getParentElement(scrollComponent.current);
        if (parent && "scrollTop" in parent) {
          const parentEl = parent as HTMLElement;
          parentEl.scrollTop =
            parentEl.scrollHeight - beforeScrollHeight.current + beforeScrollTop.current;
        }
      }
    }, [children, isReverse, getParentElement]);

    const containerProps = {
      ...rest,
      className: className,
    };

    const DynamicElement = element as React.ElementType;

    return (
      <DynamicElement
        {...containerProps}
        ref={(node: HTMLElement | null) => {
          scrollComponent.current = node;
        }}
      >
        {isReverse && loader}
        {children}
        {!isReverse && loader}
      </DynamicElement>
    );
  }
);

InfiniteScroll.displayName = "InfiniteScroll";

export default InfiniteScroll;
