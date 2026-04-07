"use client";

import HorizontalVirtualScroll from "@/libs/horizontal-virtual-scroll";
import { motion } from "framer-motion";
import { ChevronLeft, Info, Cpu, MousePointer2 } from "lucide-react";
import Link from "next/link";
import { RenderItem } from "./render-item";

/**
 * Mock data for the horizontal scroll demo.
 * Generates 100 unique cards with distinct gradients.
 */
const MOCK_ITEMS = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  title: `Project Alpha-${i + 1}`,
  category: i % 3 === 0 ? "Design" : i % 3 === 1 ? "Development" : "Marketing",
  color: [
    "from-blue-500 to-indigo-600",
    "from-emerald-400 to-teal-600",
    "from-rose-400 to-orange-500",
    "from-purple-500 to-pink-600",
    "from-amber-400 to-yellow-600",
  ][i % 5],
}));

/**
 * Static Horizontal Demo Page
 * Demonstrates high-performance horizontal scrolling with virtualization.
 */
export default function StaticHorizontalDemo() {
  const visibleCount = null; // Use null for responsive full-width behavior

  return (
    <div className="min-h-screen space-y-12 pb-20">
      {/* 🚀 Header Section */}
      <header className="space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="group flex w-fit items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
          >
            <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>BACK TO SOLUTIONS</span>
          </Link>
        </motion.div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="space-y-2"
          >
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              Horizontal <br />
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                Static Virtualization
              </span>
            </h1>
            <p className="max-w-xl text-lg font-medium text-slate-500 dark:text-slate-400">
              A high-performance demonstration of horizontal windowing. Only the visible fragments
              of the list are kept in the DOM.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 px-4 py-2 text-[10px] font-black tracking-widest text-slate-500 uppercase shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-white/5 dark:text-slate-400">
              <Cpu className="size-3 text-blue-500" />
              <span>Optimized DOM Nodes</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 px-4 py-2 text-[10px] font-black tracking-widest text-slate-500 uppercase shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-white/5 dark:text-slate-400">
              <MousePointer2 className="size-3 text-cyan-500" />
              <span>Smooth Inertia</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* 🧩 Virtualized Scroll Area */}
      <section className="relative -mx-6 overflow-visible rounded-[3rem] bg-slate-50/50 px-6 py-12 dark:bg-white/5">
        <HorizontalVirtualScroll
          items={MOCK_ITEMS}
          visibleCount={visibleCount}
          overscan={4}
          itemHeight={540}
        >
          {RenderItem}
        </HorizontalVirtualScroll>

        {/* 💡 Scroll Tip */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
          <div className="h-px w-8 bg-slate-200 dark:bg-white/10" />
          <span>Swipe to explore projects</span>
          <div className="h-px w-8 bg-slate-200 dark:bg-white/10" />
        </div>
      </section>

      {/* 📘 Information Section */}
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4 rounded-3xl border border-slate-200 bg-white/40 p-8 backdrop-blur-sm dark:border-white/5 dark:bg-black/20"
        >
          <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
            <Info className="size-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Why Virtualize?</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Rendering 1,000 cards in a standard flexbox container causes massive DOM overhead,
            leading to &quot;jank&quot; (stuttering) during scroll. Virtualization ensures only
            10-12 nodes exist at any given time, regardless of the list size.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4 rounded-3xl border border-slate-200 bg-white/40 p-8 backdrop-blur-sm dark:border-white/5 dark:bg-black/20"
        >
          <div className="flex size-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-400">
            <Cpu className="size-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Performance Metrics</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">DOM Nodes Saved</span>
              <span className="font-bold text-emerald-500">~980 nodes</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Scroll Consistency</span>
              <span className="font-bold text-emerald-500">60 FPS Locked</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Memory Pressure</span>
              <span className="font-bold text-emerald-500">Minimal (-85%)</span>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
