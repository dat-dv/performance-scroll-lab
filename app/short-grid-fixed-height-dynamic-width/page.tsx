"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, PlayCircle } from "lucide-react";
import { Docs } from "./docs";
import { LaboratoryDemoHeader } from "@/components/laboratory-demo-header";
import { TabButton } from "@/components/tab-button";

const MOCK_TAGS = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind",
  "Framer Motion",
  "Performance",
  "Optimization",
  "Virtualization",
  "Windowing",
  "Laboratory",
  "Frontend Architecture",
  "UI/UX Design",
  "Web Vitals",
  "JavaScript",
  "DeepMind",
  "Antigravity",
  "Coding",
  "Agentic",
  "Intelligence",
  "Scalability",
  "Infrastructure",
  "Deployment",
].flatMap((tag) => Array.from({ length: 4 }, (_, i) => `${tag} #${i + 1}`));

export default function FixedHeightDynamicWidthPage() {
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
                  title="3.2. Live Demo: Tag Cloud"
                  description="80+ Items • Native Flexbox Wrap • Dynamic Width"
                  badgeText="Flow Layout"
                />
                <div className="p-8">
                  <div className="custom-scrollbar flex max-h-[400px] flex-wrap gap-2 overflow-y-auto pr-2">
                    {MOCK_TAGS.map((tag, i) => (
                      <div
                        key={i}
                        className="flex h-9 items-center rounded-full border border-slate-100 bg-slate-50/50 px-4 text-xs font-bold text-slate-700 transition-all hover:border-blue-400 hover:bg-white hover:text-blue-600 dark:border-white/5 dark:bg-white/5 dark:hover:border-blue-500/30 dark:hover:text-blue-400"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Docs />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
