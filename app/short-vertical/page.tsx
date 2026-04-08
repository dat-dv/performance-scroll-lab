"use client";

import React from "react";
import { ShortVerticalDocs } from "./docs";
import { LaboratoryDemoHeader } from "@/components/laboratory-demo-header";

interface Contact {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

const MOCK_CONTACTS: Contact[] = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  name: `User ${i + 1}`,
  role: ["Engineer", "Designer", "Product", "Quality"][i % 4],
  avatar: `https://i.pravatar.cc/150?u=${i}`,
}));

export default function ShortVerticalPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pb-20">
        <div className="mx-auto max-w-5xl px-6 pt-12">
          {/* 1. Technical Documentation Section */}
          <ShortVerticalDocs />

          {/* 2. Live Demo Section */}
          <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-white/5 dark:bg-white/5">
            <LaboratoryDemoHeader
              description={`${MOCK_CONTACTS.length} Items • Contacts List Rendering`}
            />

            <div className="p-1">
              <div className="custom-scrollbar max-h-[500px] overflow-y-auto px-7 py-7">
                <div className="flex flex-col gap-3">
                  {MOCK_CONTACTS.map((item) => (
                    <div
                      key={item.id}
                      className="group/item flex items-center justify-between rounded-2xl border border-transparent bg-slate-50/50 p-4 transition-all hover:border-slate-200 hover:bg-white hover:shadow-sm dark:bg-white/5 dark:hover:border-white/10 dark:hover:bg-white/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.avatar}
                            alt={item.name}
                            className="size-12 rounded-xl object-cover ring-2 ring-white transition-transform group-hover/item:scale-105 dark:ring-slate-900"
                          />
                          <div className="absolute -top-1 -right-1 size-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {item.name}
                          </span>
                          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            {item.role}
                          </span>
                        </div>
                      </div>
                      <button className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition-all hover:bg-slate-900 hover:text-white dark:border-white/10 dark:text-slate-400 dark:hover:bg-white dark:hover:text-slate-900">
                        View Profile
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
