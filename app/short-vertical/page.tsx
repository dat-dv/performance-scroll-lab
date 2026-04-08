"use client";

import React from "react";
import { StaticListDocs } from "@/components/technical-docs";
import { Info } from "lucide-react";

interface Contact {
  id: number;
  name: string;
  role: string;
  initials: string;
  color: string;
}

const contacts: Contact[] = [
  { id: 1, name: "Lebron James", role: "Forward", initials: "LJ", color: "bg-blue-500" },
  { id: 2, name: "Stephen Curry", role: "Guard", initials: "SC", color: "bg-amber-500" },
  { id: 3, name: "Kevin Durant", role: "Forward", initials: "KD", color: "bg-rose-500" },
  {
    id: 4,
    name: "Giannis Antetokounmpo",
    role: "Forward",
    initials: "GA",
    color: "bg-emerald-500",
  },
  { id: 5, name: "Nikola Jokic", role: "Center", initials: "NJ", color: "bg-indigo-500" },
  { id: 6, name: "Luka Doncic", role: "Guard", initials: "LD", color: "bg-purple-500" },
  { id: 7, name: "Joel Embiid", role: "Center", initials: "JE", color: "bg-orange-500" },
  { id: 8, name: "Jayson Tatum", role: "Forward", initials: "JT", color: "bg-cyan-500" },
];

export default function StaticListDemo() {
  return (
    <div className="relative">
      <StaticListDocs />

        <div className="flex flex-col gap-6">
          <header className="flex flex-col gap-2">
            <h2 className="text-sm font-bold tracking-[0.2em] text-slate-500 uppercase dark:text-slate-400">
              Native Map Rendering (Scale: Short)
            </h2>
            <p className="text-sm font-medium text-slate-500 italic">
              Khi dữ liệu ít (&lt; 100 items), phương pháp nhanh nhất và hiệu quả nhất là render trực tiếp.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center gap-4 rounded-3xl border border-slate-100 bg-white/70 p-5 shadow-sm transition-all hover:shadow-lg dark:border-white/5 dark:bg-slate-900/50"
              >
                <div
                  className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl shadow-xl ${contact.color} font-black text-white`}
                >
                  {contact.initials}
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                    {contact.name}
                  </span>
                  <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase dark:text-slate-400">
                    {contact.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-blue-500/10 bg-blue-500/5 p-8 dark:border-blue-400/10 dark:bg-blue-400/5">
          <div className="flex flex-col gap-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500 text-white">
              <Info className="size-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Tại sao không dùng Virtualization ở đây?
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Virtualization thêm một lớp logic cồng kềnh (tính toán chiều cao, bù trừ scroll offset). Đối với 
              chiến lược <strong>Mặc định (Short Scale)</strong>, trình duyệt có thể render 100 items 
              trong &lt; 2ms. Hãy giữ code đơn giản với <code>.map()</code>.
            </p>
          </div>
        </div>
    </div>
  );
}
