"use client";

import React from "react";
import { Docs } from "./docs";
import { LaboratoryDemoHeader } from "@/components/laboratory-demo-header";

const MOCK_TAGS = [
  "React", "TypeScript", "Next.js", "Tailwind", "Framer Motion", "Performance", 
  "Optimization", "Virtualization", "Windowing", "Laboratory", "Frontend Architecture", 
  "UI/UX Design", "Web Vitals", "JavaScript", "DeepMind", "Antigravity", "Coding",
  "Agentic", "Intelligence", "Scalability", "Infrastructure", "Deployment"
].flatMap(tag => Array.from({ length: 4 }, (_, i) => `${tag} #${i + 1}`));

export default function FixedHeightDynamicWidthPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pb-20">
        <div className="mx-auto max-w-5xl px-6 pt-12">
          <Docs />

          <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-white/5 dark:bg-white/5">
            <LaboratoryDemoHeader
              title="3.2. Live Demo: Tag Cloud"
              description="80+ Items • Native Flexbox Wrap • Dynamic Width"
              badgeText="Flow Layout"
            />

            <div className="p-8">
              <div className="flex flex-wrap gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
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
        </div>
      </main>
    </div>
  );
}
