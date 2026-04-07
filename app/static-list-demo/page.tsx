"use client";

import React from "react";
import { StaticListDocs } from "@/components/technical-docs";

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

      <div className="mx-auto max-w-2xl space-y-6">
        <h2 className="mb-4 text-sm font-bold tracking-widest text-gray-500 uppercase">
          Team Roster (Limited Data)
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-white/5 dark:bg-zinc-900/40"
            >
              <div
                className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${contact.color} font-bold text-white`}
              >
                {contact.initials}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold">{contact.name}</span>
                <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  {contact.role}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 dark:border-emerald-900/20 dark:bg-emerald-900/10">
          <p className="text-[11px] leading-relaxed text-emerald-700 italic dark:text-emerald-400">
            &quot;Đây là phương pháp ưu tiên khi dataset nhỏ. Don&apos;t make it complex when it
            doesn&apos;t need to be.&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
