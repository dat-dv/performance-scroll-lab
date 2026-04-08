"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, PlayCircle } from "lucide-react";
import { GridFixedDocs } from "./docs";
import { LaboratoryDemoHeader } from "@/components/laboratory-demo-header";
import { TabButton } from "@/components/tab-button";

const MOCK_ICONS = Array.from({ length: 150 }, (_, i) => ({
  id: i + 1,
  emoji: ["🚀", "✨", "🔥", "🌈", "🛡️", "📦", "🧩", "⚡"][i % 8],
  label: `Item ${i + 1}`,
}));

export default function FixedHeightFixedWidthPage() {
  const [activeTab, setActiveTab] = useState<"demo" | "docs">("docs");

  return (
    <main className="">
      <div className="mb-12 space-y-8">
        {/* 🧭 Local Navigation */}
        <div className="flex w-fit items-center gap-1 rounded-2xl border border-slate-200 bg-slate-50/50 p-1.5 dark:border-white/5 dark:bg-white/5">
          <TabButton
            active={activeTab === "demo"}
            onClick={() => setActiveTab("demo")}
            icon={<PlayCircle className="size-4" />}
            label="Live Demo"
          />
          <TabButton
            active={activeTab === "docs"}
            onClick={() => setActiveTab("docs")}
            icon={<BookOpen className="size-4" />}
            label="Technical Docs"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "demo" ? (
              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-white/5 dark:bg-white/5">
                <LaboratoryDemoHeader
                  title="3.1. Live Demo: Fixed Size Grid"
                  description="150 Items • Native CSS Grid • Aspect Square"
                  badgeText="Uniform Layout"
                />
                <div className="p-8">
                  <div className="custom-scrollbar grid max-h-[500px] grid-cols-4 gap-4 overflow-y-auto pr-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
                    {MOCK_ICONS.map((item) => (
                      <div
                        key={item.id}
                        className="group/item flex aspect-square flex-col items-center justify-center rounded-2xl border border-slate-100 bg-slate-50/50 transition-all hover:border-blue-400 hover:bg-white hover:shadow-xl dark:border-white/5 dark:bg-white/5 dark:hover:border-blue-500/30"
                      >
                        <span className="text-2xl transition-transform group-hover/item:scale-125">
                          {item.emoji}
                        </span>
                        <span className="mt-2 text-[8px] font-bold tracking-tighter text-slate-400 uppercase">
                          ID: {item.id}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <GridFixedDocs />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
