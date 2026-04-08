"use client";

import React from "react";
import VirtualScrollWithFixedItemHeight from "@/libs/virtual-scroll-with-fixed-item-height";
import { LongVerticalItemFixedHeightDocs } from "./docs";
import { LaboratoryDemoHeader } from "@/components/laboratory-demo-header";
import { Code } from "lucide-react";
import { GIT_REPO } from "../constansts/config";

export interface Item {
  index: number;
  name: string;
}

const ITEMS: Item[] = Array.from({ length: 100000 }, (_, i) => ({
  index: i,
  name: `Database Record #${i + 1} — Production Log`,
}));

export default function LongVerticalItemFixedHeightPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pb-20">
        <div className="mx-auto max-w-5xl px-6 pt-12">
          {/* Header & Local Source Badge */}
          <div className="mb-6 flex items-center gap-2">
            <a
              href={GIT_REPO + "app/long-vertical-item-fixed-height/page.tsx"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 opacity-40 transition-opacity hover:text-blue-500 hover:opacity-100"
            >
              <Code className="size-3" />
              <span className="font-mono text-[10px] font-bold tracking-tight">
                app/long-vertical-item-fixed-height/page.tsx
              </span>
            </a>
          </div>

          <LongVerticalItemFixedHeightDocs />

          {/* 2. Live Demo Section */}
          <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-white/5 dark:bg-white/5">
            <LaboratoryDemoHeader
              description={`${ITEMS.length.toLocaleString()} Items • Fixed Height Virtualization`}
            />

            <div className="h-[600px]">
              <VirtualScrollWithFixedItemHeight items={ITEMS}>
                {({ item }) => (
                  <div className="flex h-[50px] items-center border-b border-slate-100 px-8 transition-colors hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/5">
                    <div className="flex items-center gap-4">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-slate-100 font-mono text-xs font-bold text-slate-500 dark:bg-white/5">
                        #{item.index}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {item.name}
                        </span>
                        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                          Record System Access
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </VirtualScrollWithFixedItemHeight>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
