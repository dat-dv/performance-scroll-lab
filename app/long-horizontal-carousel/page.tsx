"use client";

import HorizontalVirtualScroll from "@/libs/horizontal-virtual-scroll";
import { ChevronLeft, Info, Cpu } from "lucide-react";
import Link from "next/link";

/**
 * Mock data for the static demo.
 */
const MOCK_ITEMS = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  title: `Static Card #${i + 1}`,
  color: [
    "from-blue-500 to-indigo-600",
    "from-emerald-400 to-teal-600",
    "from-rose-400 to-orange-500",
  ][i % 3],
}));

/**
 * Static Horizontal Example
 * Simply renders 100 items with no dynamic loading.
 */
export default function StaticHorizontalDemo() {
  return (
    <div className="min-h-screen space-y-12 pb-20">
      <header className="space-y-4">
        <Link
          href="/"
          className="flex w-fit items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600"
        >
          <ChevronLeft className="size-4" />
          <span>BACK TO SOLUTIONS</span>
        </Link>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Static <span className="text-blue-600">Windowing</span>
        </h1>
        <p className="max-w-xl text-lg font-medium text-slate-500 dark:text-slate-400">
          A truly static demonstration of 100 pre-generated horizontal items.
        </p>
      </header>

      <section className="relative -mx-6 rounded-[3rem] bg-slate-50/50 px-6 py-12 dark:bg-white/5">
        <HorizontalVirtualScroll items={MOCK_ITEMS} overscan={5}>
          {({ item }) => (
            <div className="flex size-full items-center justify-center p-4">
              <div className={`flex h-80 w-full max-w-sm flex-col items-center justify-center rounded-[2.5rem] bg-gradient-to-br p-8 text-center font-bold text-white shadow-xl ${item.color}`}>
                <div className="mb-2 text-[10px] tracking-widest uppercase opacity-70">
                  Static Index
                </div>
                <div className="text-3xl tracking-tight">{item.title}</div>
                <div className="mt-4 rounded-full bg-white/20 px-4 py-1 text-sm">
                  ID: {item.id}
                </div>
              </div>
            </div>
          )}
        </HorizontalVirtualScroll>
      </section>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4 rounded-3xl border border-slate-200 p-8 dark:border-white/5">
          <Info className="size-6 text-blue-500" />
          <h2 className="text-xl font-bold">No Side-Effects</h2>
          <p className="text-slate-500">
            This demo uses a fixed local array. No state updates or network simulations occur during the scrolling process.
          </p>
        </div>
        <div className="space-y-4 rounded-3xl border border-slate-200 p-8 dark:border-white/5">
          <Cpu className="size-6 text-emerald-500" />
          <h2 className="text-xl font-bold">Predictive Slicing</h2>
          <p className="text-slate-500">
            Since the length is known and static, viewport slicing is highly predictable and has nearly zero overhead.
          </p>
        </div>
      </div>
    </div>
  );
}
