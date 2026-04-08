"use client";
import { AnimatePresence, motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import React, { useState } from "react";
import { ComingSoon } from "../coming-soon";
import { TabButton } from "../tab-button";

const ShowcaseLayout = ({
  tabs,
}: {
  tabs: {
    label: string;
    value: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
  }[];
}) => {
  const [activeTabValue, setActiveTabValue] = useState(tabs?.[0]?.value);
  const activeTab = tabs?.find((t) => t.value === activeTabValue) || tabs?.[0];

  return (
    <main className="">
      <div className="mb-12 space-y-8">
        <div className="flex w-fit items-center gap-1 rounded-2xl border border-slate-200 bg-slate-50/50 p-1.5 dark:border-white/5 dark:bg-white/5">
          {tabs?.map((tab) => (
            <TabButton
              key={tab.value}
              active={tab.value === activeTabValue}
              onClick={() => setActiveTabValue(tab.value)}
              icon={tab.icon || <PlayCircle className="size-4" />}
              label={tab.label}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabValue}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab?.children}
            {!activeTabValue && <ComingSoon title="" />}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
};

export default ShowcaseLayout;
