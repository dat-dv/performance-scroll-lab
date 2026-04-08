"use client";

import React, { createContext, useContext, useMemo, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { CaseScale, CaseDirection, CaseItemSize } from "@/components/case-card";

interface FilterContextType {
  scale: CaseScale;
  direction: CaseDirection;
  itemSize: CaseItemSize;
  updateFilters: (newFilters: {
    scale?: CaseScale;
    direction?: CaseDirection;
    itemSize?: CaseItemSize;
  }) => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // 1. Derive state from URL or fallback to 'all'
  const scale = (searchParams.get("scale") as CaseScale) || "all";
  const direction = (searchParams.get("direction") as CaseDirection) || "all";
  const itemSize = (searchParams.get("itemSize") as CaseItemSize) || "all";

  // 2. Handler to update URL params (Source of Truth)
  const updateFilters = useCallback(
    (newFilters: { scale?: CaseScale; direction?: CaseDirection; itemSize?: CaseItemSize }) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newFilters.scale) params.set("scale", newFilters.scale);
      if (newFilters.direction) params.set("direction", newFilters.direction);
      if (newFilters.itemSize) params.set("itemSize", newFilters.itemSize);

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const resetFilters = useCallback(() => {
    const params = new URLSearchParams();
    params.set("scale", "all");
    params.set("direction", "all");
    params.set("itemSize", "all");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router]);

  const value = useMemo(
    () => ({
      scale,
      direction,
      itemSize,
      updateFilters,
      resetFilters,
    }),
    [scale, direction, itemSize, updateFilters, resetFilters]
  );

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export function useCaseFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useCaseFilters must be used within a FilterProvider");
  }
  return context;
}
