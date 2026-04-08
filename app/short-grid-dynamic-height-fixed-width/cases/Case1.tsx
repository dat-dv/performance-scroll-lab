"use client";

import React from "react";
import { TechnicalDeepDive } from "@/components/technical-deep-dive";
import { CodeBlock } from "@/components/code-block";
import { MOCK_CARDS, Card } from "./shared";

export function Case1() {
  return (
    <section id="case-1" className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Case 1: Standard Grid (Stretch)
        </h2>
        <p className="max-w-2xl text-slate-500 dark:text-slate-400">
          Grid đơn giản chỉ cần quy định về layout container: grid-col-3, grid-col-4, grid-col-6
          (tức là sẽ có bấy nhiêu cột)
          <br />- Khi đó chúng ta map ra nó sẽ render item theo vị trí từ trái qua phải và trên
          xuống dưới
          <br />- Vì layout sẽ có những card dài ngắn nên chúng ta cần stretch item thông qua
          align-items: stretch để cho đẹp sẽ được ui như bên dưới (mặc định tailwind grid)
          <br />- Nếu không có item stretch thì trông sẽ rất xấu
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-white/5">
        <div className="p-8">
          <div className="custom-scrollbar grid max-h-[600px] grid-cols-1 gap-4 overflow-y-auto pr-2 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_CARDS.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <TechnicalDeepDive
          mainTitle="Technical Deep Dive"
          points={[
            {
              title: "Align Items: Stretch",
              description:
                "Cơ chế mặc định của Grid giúp các đáy card luôn nằm trên một đường thẳng ngang.",
              colorClass: "text-blue-500",
            },
            {
              title: "Intrinsic Sizing",
              description: "Hàng (Row) sẽ lấy kích thước của item cao nhất bên trong nó.",
              colorClass: "text-emerald-500",
            },
          ]}
        />
        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
            Implementation
          </h4>
          <CodeBlock
            code={`// Card Sub-component\nconst Card = ({ card }) => (\n  <motion.div \n    whileHover={{ y: -4 }}\n    className="flex flex-col rounded-3xl border border-slate-200/60 bg-white/70 p-6 backdrop-blur-xl"\n  >\n    <div className="flex justify-between mb-6">\n      <span className="text-2xl">{card.icon}</span>\n      <span className="text-[10px] font-bold uppercase">{card.category}</span>\n    </div>\n    <h4 className="font-bold text-lg text-slate-900 dark:text-white">{card.title}</h4>\n    <p className="text-sm text-slate-500">{card.description}</p>\n  </motion.div>\n);\n\n// Main Container\n<div className="rounded-3xl border border-slate-200 bg-white dark:border-white/5 dark:bg-white/5 overflow-hidden">\n  <div className="p-8">\n    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pr-2 custom-scrollbar">\n      {MOCK_CARDS.map((card) => (\n        <Card key={card.id} card={card} />\n      ))}\n    </div>\n  </div>\n</div>`}
          />
        </div>
      </div>
    </section>
  );
}
