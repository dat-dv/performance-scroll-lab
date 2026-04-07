"use client";

import React, { useState, useEffect } from "react";
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

import { CaseScale, CaseDirection, CaseItemSize } from "./case-card";
import { FilterGroup } from "./wizard/FilterGroup";
import { FilterChip } from "./wizard/FilterChip";

interface WizardProps {
  onFilterChange: (filters: {
    scale: CaseScale;
    direction: CaseDirection;
    itemSize: CaseItemSize;
  }) => void;
}

/**
 * Enhanced Wizard UI.
 * Fixed alignment for Group 3 and light mode contrast.
 */
export function VirtualizationWizard({ onFilterChange }: WizardProps) {
  const [scale, setScale] = useState<CaseScale>("long");
  const [direction, setDirection] = useState<CaseDirection>("vertical");
  const [itemSize, setItemSize] = useState<CaseItemSize>("fixed");
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Sync state to parent
  useEffect(() => {
    onFilterChange({ scale, direction, itemSize });
  }, [scale, direction, itemSize, onFilterChange]);

  const toggleScale = (val: CaseScale) => setScale(scale === val ? "all" : val);
  const toggleDirection = (val: CaseDirection) => setDirection(direction === val ? "all" : val);
  const toggleItemSize = (val: CaseItemSize) => setItemSize(itemSize === val ? "all" : val);

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
          {isCollapsed ? "CẤU HÌNH BỘ LỌC (OFF)" : "THIẾT LẬP CHIẾN LƯỢC (ON)"}
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
                    onClick={() => setScale("all")}
                    icon={<Layers className="size-3" />}
                    label="All"
                  />
                  <FilterChip
                    active={scale === "short"}
                    onClick={() => toggleScale("short")}
                    icon={<Minimize2 className="size-3" />}
                    label="Short"
                  />
                  <FilterChip
                    active={scale === "long"}
                    onClick={() => toggleScale("long")}
                    icon={<Maximize2 className="size-3" />}
                    label="Long"
                  />
                </div>
              </FilterGroup>

              {/* 2. Direction Group */}
              <FilterGroup label="2. HƯỚNG CUỘN (SCROLL)">
                <div className="flex items-center gap-1.5">
                  <FilterChip
                    active={direction === "all"}
                    onClick={() => setDirection("all")}
                    icon={<Layers className="size-3" />}
                    label="All"
                  />
                  <FilterChip
                    active={direction === "vertical"}
                    onClick={() => toggleDirection("vertical")}
                    icon={<Rows className="size-3" />}
                    label="Vertical"
                  />
                  <FilterChip
                    active={direction === "horizontal"}
                    onClick={() => toggleDirection("horizontal")}
                    icon={<Columns className="size-3" />}
                    label="Horizontal"
                  />
                  <FilterChip
                    active={direction === "bidirectional"}
                    onClick={() => toggleDirection("bidirectional")}
                    icon={<MoveHorizontal className="size-3" />}
                    label="2D Grid"
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
                    <FilterGroup label="3. KÍCH THƯỚC (LAYOUT)">
                      <div className="flex items-center gap-1.5">
                        <FilterChip
                          active={itemSize === "all"}
                          onClick={() => setItemSize("all")}
                          icon={<Layers className="size-3" />}
                          label="All"
                        />
                        <FilterChip
                          active={itemSize === "fixed"}
                          onClick={() => toggleItemSize("fixed")}
                          icon={<LayoutList className="size-3" />}
                          label="Fixed"
                        />
                        <FilterChip
                          active={itemSize === "dynamic"}
                          onClick={() => toggleItemSize("dynamic")}
                          icon={<Layers className="size-3" />}
                          label="Dynamic"
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
