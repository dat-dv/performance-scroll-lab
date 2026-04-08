"use client";

import React, { useState } from "react";
import { Case1 } from "./cases/Case1";
import { Case2 } from "./cases/Case2";
import { Case3 } from "./cases/Case3";
import { Case4 } from "./cases/Case4";
import { LayoutGroup, motion } from "framer-motion";

const CASES = [
  { id: "case-1", title: "Standard Grid", component: Case1 },
  { id: "case-2", title: "Wide Grid", component: Case2 },
  { id: "case-3", title: "Non-Uniform Height", component: Case3 },
  { id: "case-4", title: "Masonry Layout", component: Case4 },
];

export default function DynamicHeightPage() {
  const [activeTab, setActiveTab] = useState(CASES[0].id);

  const ActiveComponent = CASES.find((c) => c.id === activeTab)?.component || Case1;

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-12">
      {/* Tab Navigation */}
      <div className="z-50 flex justify-center">
        <div className="flex gap-1 rounded-full border border-slate-200 bg-white/80 p-1 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-black/40">
          <LayoutGroup id="case-tabs">
            {CASES.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-2 text-sm font-bold transition-colors ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-tab"
                      className="absolute inset-0 rounded-full bg-blue-50 dark:bg-blue-500/10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{tab.title}</span>
                </button>
              );
            })}
          </LayoutGroup>
        </div>
      </div>

      {/* Case Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <ActiveComponent />
      </motion.div>
    </div>
  );
}
