"use client";

import React from "react";
import { TechnicalDeepDive } from "@/components/technical-deep-dive";
import { CodeBlock } from "@/components/code-block";
import { MOCK_CARDS, Card } from "./shared";

export function Case4() {
  return (
    <section id="case-4" className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Case 4: Masonry Layout (CSS Columns)
        </h2>
        <p className="max-w-2xl text-slate-500 dark:text-slate-400">
          - Các tình huống trước ta sử dụng grid-cols-3, grid-cols-4, grid-cols-6 để chia cột nhưng
          nó có hạn chế items-stretch tuy nhiên nếu tắt đi bằng item-start thì nó sẽ có những khoảng
          trống giữa các row nhìn rất xấu.
          <br /> - Vậy chúng ta sẽ tiếp cận bằng cách khác không dùng grid nữa mà dùng columns kết
          hợp với bread inside avoid để cho đẹp hơn. bằng cách dùng columns-1, columns-2, columns-3
          tức là ở desktop nó sẽ cố gắng render để được 3 dòng (tức là 3 items trên 1 columns), còn
          lại nó sẽ đẩy sang column tiếp
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-white/5">
        <div className="p-8">
          <div className="custom-scrollbar max-h-[800px] columns-1 gap-4 overflow-y-auto pr-2 sm:columns-2 lg:columns-3">
            {MOCK_CARDS.map((card, i) => (
              <Card
                key={card.id}
                card={card}
                extraClass={`mb-4 break-inside-avoid ${i === 0 ? "h-[900px] backdrop-blur-none!" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <TechnicalDeepDive
          mainTitle="Technical Deep Dive"
          points={[
            {
              title: "Multi-column Flow",
              description: "Nội dung tràn từ cột này sang cột khác thay vì ép theo hàng.",
              colorClass: "text-indigo-500",
            },
            {
              title: "Break Avoidance",
              description: "Sử dụng break-inside-avoid để ngăn Card bị cắt đôi giữa 2 cột.",
              colorClass: "text-violet-500",
            },
          ]}
        />
        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
            Implementation
          </h4>
          <CodeBlock
            code={`// Card Sub-component\nconst Card = ({ card, extraClass }) => (\n  <motion.div \n    whileHover={{ y: -4 }}\n    className={\`flex flex-col rounded-3xl border border-slate-200/60 bg-white/70 p-6 backdrop-blur-xl ${"$"}{extraClass}\`}\n  >\n    <div className="flex justify-between mb-6">\n      <span className="text-2xl">{card.icon}</span>\n      <span className="text-[10px] font-bold uppercase">{card.category}</span>\n    </div>\n    <h4 className="font-bold text-lg text-slate-900 dark:text-white">{card.title}</h4>\n    <p className="text-sm text-slate-500">{card.description}</p>\n  </motion.div>\n);\n\n// Main Container\n<div className="rounded-3xl border border-slate-200 bg-white dark:border-white/5 dark:bg-white/5 overflow-hidden">\n  <div className="p-8">\n    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">\n      {MOCK_CARDS.map((card, i) => (\n        <Card\n          key={card.id}\n          card={card}\n          extraClass={\`mb-4 break-inside-avoid ${"$"}{i === 0 ? "h-[900px] backdrop-blur-none!" : ""}\`}\n        />\n      ))}\n    </div>\n  </div>\n</div>`}
          />
        </div>
      </div>
    </section>
  );
}
