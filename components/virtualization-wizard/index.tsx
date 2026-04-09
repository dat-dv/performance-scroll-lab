"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Maximize2,
  Minimize2,
  Columns,
  Rows,
  MoveHorizontal,
  LayoutList,
  Layers,
  ChevronUp,
  ChevronDown,
  Settings2,
} from "lucide-react";

import { useCaseFilters } from "@/context/filter-context";
import { CaseScale, CaseDirection, CaseItemSize } from "@/libs/data/cases-data";
import { FilterChip } from "../wizard/FilterChip";
import { FilterGroup } from "../wizard/FilterGroup";

/**
 * Strategy Wizard - Modularized layout.
 * Now a zero-prop component fueled by FilterContext.
 */
export function VirtualizationWizard() {
  const { scale, direction, itemSize, updateFilters } = useCaseFilters();

  const [isCollapsed, setIsCollapsed] = useState(false);

  // Toggle handlers that update the global Context/URL
  const toggleScale = (val: CaseScale) => {
    updateFilters({ scale: scale === val ? "all" : val });
  };

  const toggleDirection = (val: CaseDirection) => {
    updateFilters({ direction: direction === val ? "all" : val });
  };

  const toggleItemSize = (val: CaseItemSize) => {
    updateFilters({ itemSize: itemSize === val ? "all" : val });
  };

  const setScaleAll = () => updateFilters({ scale: "all" });
  const setDirectionAll = () => updateFilters({ direction: "all" });
  const setItemSizeAll = () => updateFilters({ itemSize: "all" });

  return (
    <div className="relative">
      {/* 🛠 Config Toggle */}
      <div className="mb-4 flex items-center justify-between px-1">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="group flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50/50 py-1.5 pr-4 pl-2 text-[10px] font-black tracking-widest text-slate-500 transition-all hover:bg-slate-200/50 hover:text-slate-900 dark:border-white/5 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:text-slate-100"
        >
          <div className="flex size-5 items-center justify-center rounded-full bg-slate-200 text-slate-500 transition-colors group-hover:bg-blue-500 group-hover:text-white dark:bg-slate-800 dark:text-slate-400">
            {isCollapsed ? <ChevronDown className="size-3" /> : <ChevronUp className="size-3" />}
          </div>
          {isCollapsed ? "ẨN BỘ LỌC (OFF)" : "BỘ LỌC (ON)"}
        </button>

        {!isCollapsed && (
          <div className="hidden items-center gap-2 text-[9px] font-black tracking-widest text-slate-400 uppercase sm:flex dark:text-slate-600">
            <Settings2 className="size-3" />
            Selection Wizard
          </div>
        )}
      </div>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            className="overflow-hidden"
          >
            <div className="mb-2 flex flex-wrap items-start gap-x-12 gap-y-8 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl ring-1 shadow-black/5 ring-slate-200 backdrop-blur-3xl dark:border-white/10 dark:bg-black/20 dark:shadow-black/40 dark:ring-white/5">
              {/* 1. Scale Group */}
              <FilterGroup label="1. QUY MÔ (SCALE)">
                <div className="flex items-center gap-1.5">
                  <FilterChip
                    active={scale === "all"}
                    onClick={setScaleAll}
                    icon={<Layers className="size-3" />}
                    label="Tất cả"
                  />
                  <FilterChip
                    active={scale === "short"}
                    onClick={() => toggleScale("short")}
                    icon={<Minimize2 className="size-3" />}
                    label="Ít Items"
                  />
                  <FilterChip
                    active={scale === "long"}
                    onClick={() => toggleScale("long")}
                    icon={<Maximize2 className="size-3" />}
                    label="Nhiều Items"
                  />
                </div>
              </FilterGroup>

              {/* 2. Direction Group */}
              <FilterGroup label="2. HƯỚNG CUỘN (SCROLL)">
                <div className="flex items-center gap-1.5">
                  <FilterChip
                    active={direction === "all"}
                    onClick={setDirectionAll}
                    icon={<Layers className="size-3" />}
                    label="Tất cả"
                  />
                  <FilterChip
                    active={direction === "vertical"}
                    onClick={() => toggleDirection("vertical")}
                    icon={<Rows className="size-3" />}
                    label="Cuộn Dọc"
                  />
                  <FilterChip
                    active={direction === "horizontal"}
                    onClick={() => toggleDirection("horizontal")}
                    icon={<Columns className="size-3" />}
                    label="Cuộn Ngang"
                  />
                  <FilterChip
                    active={direction === "bidirectional"}
                    onClick={() => toggleDirection("bidirectional")}
                    icon={<MoveHorizontal className="size-3" />}
                    label="Ngang + Dọc"
                  />
                </div>
              </FilterGroup>

              {/* 3. Item Size Group - Now strictly conditional and NO internal divider to avoid misalignment */}
              <AnimatePresence mode="popLayout">
                {scale === "long" && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <FilterGroup label="3. KÍCH ITEMS (ITEM WIDTH & HEIGHT)">
                      <div className="flex items-center gap-1.5">
                        <FilterChip
                          active={itemSize === "all"}
                          onClick={setItemSizeAll}
                          icon={<Layers className="size-3" />}
                          label="Tất cả"
                        />
                        <FilterChip
                          active={itemSize === "fixed"}
                          onClick={() => toggleItemSize("fixed")}
                          icon={<LayoutList className="size-3" />}
                          label="Cố định"
                        />
                        <FilterChip
                          active={itemSize === "dynamic"}
                          onClick={() => toggleItemSize("dynamic")}
                          icon={<Layers className="size-3" />}
                          label="Không cố định"
                        />
                      </div>
                    </FilterGroup>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
