"use client";

import React from "react";
import { TechnicalDeepDive } from "@/components/technical-deep-dive";
import { CodeBlock } from "@/components/code-block";
import { MOCK_CARDS, Card } from "./shared";
import ShowcaseLayout from "@/components/show-case-layout";
import { BookOpen, PlayCircle } from "lucide-react";

export function Case2() {
  const tabs = [
    {
      label: "Technical Docs",
      value: "docs",
      icon: <BookOpen className="size-4" />,
      children: (
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Case 2: Wide Grid (Horizontal Scroll)
            </h2>
            <p className="max-w-2xl text-slate-500 dark:text-slate-400">
              Trong trường hợp này chúng ta muốn hiển thị scroll do không muốn giới hạn chiều rộng của
              container
              <br />- Trường hợp chỉ có 1 dòng nhưng mà width của các item là như nhau ta có thể sử
              auto-cols-[300px] để set lúc này nó sẽ tràn layout có thể scrolll x nhưng mà sẽ chỉ có 1
              row
              <br />- Trường hợp chúng ta muốn nhiều raw nhưng mà vẫn có thể scroll x thì ta có thể sử
              dụng grid-cols-[repeat(15,300px)] nhưng mà trong trường hợp chúng ta đang sử dụng
              items-start nên sẽ thấy height không bằng nhau
              <br />- Có nhiều trường hợp khác nữa nhưng chúng ta đang nhắm đến ``SHORT GRID DYNAMIC
              HEIGHT FIXED WIDTH``
            </p>
          </div>
          <TechnicalDeepDive
            mainTitle="Technical Deep Dive"
            points={[
              {
                title: "Overflow Management",
                description:
                  "Kết hợp overflow-x-auto và chiều rộng cố định (hoặc min-width) để ép scroll.",
                colorClass: "text-purple-500",
              },
              {
                title: "Fixed Aspect",
                description: "Giữ cho Card không bị bóp nghẹt khi màn hình thu nhỏ.",
                colorClass: "text-pink-500",
              },
            ]}
          />
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              Implementation
            </h4>
            <CodeBlock
              code={`// Card Sub-component\nconst Card = ({ card }) => (\n  <motion.div \n    whileHover={{ y: -4 }}\n    className="flex flex-col rounded-3xl border border-slate-200/60 bg-white/70 p-6 backdrop-blur-xl"\n  >\n    <div className="flex justify-between mb-6">\n      <span className="text-2xl">{card.icon}</span>\n      <span className="text-[10px] font-bold uppercase">{card.category}</span>\n    </div>\n    <h4 className="font-bold text-lg text-slate-900 dark:text-white">{card.title}</h4>\n    <p className="text-sm text-slate-500">{card.description}</p>\n  </motion.div>\n);\n\n// Main Container (Single Row Horizontal Scroll)\n<div className="rounded-3xl border border-slate-200 bg-white dark:border-white/5 dark:bg-white/5 overflow-hidden">\n  <div className="p-8">\n    <div className="overflow-x-auto pb-4 custom-scrollbar">\n      <div className="grid grid-flow-col auto-cols-[300px] gap-4 items-start">\n        {MOCK_CARDS.map((card) => (\n          <Card key={card.id} card={card} />\n        ))}\n      </div>\n    </div>\n  </div>\n</div>`}
            />
          </div>
        </div>
      ),
    },
    {
      label: "Live Demo",
      value: "demo",
      icon: <PlayCircle className="size-4" />,
      children: (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-white/5">
          <div className="p-8">
            <div className="custom-scrollbar overflow-x-auto pb-4">
              <div className="grid grid-cols-[repeat(15,300px)] items-start gap-4 pb-2">
                {MOCK_CARDS.map((card) => (
                  <Card key={card.id} card={card} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return <ShowcaseLayout tabs={tabs} />;
}
