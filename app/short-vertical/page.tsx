"use client";

import React from "react";
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
    <div className="relative space-y-12">
      {/* 🎯 Context Card: Combined Problem & Solution */}
      <div className="overflow-hidden rounded-[2rem] border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent p-10 backdrop-blur-sm dark:border-blue-400/20">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-2xl shadow-blue-500/20">
              <Info className="size-7" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-black tracking-widest text-blue-500 uppercase">Architecture Tier 1</span>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                1.1. Short Vertical (Native Map)
              </h1>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-xs font-black tracking-widest text-slate-900 uppercase dark:text-white">
                <div className="size-1.5 rounded-full bg-blue-500" />
                BÀI TOÁN & NGỮ CẢNH
              </h4>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Bạn đang xây dựng các thành phần UI cơ bản như: <strong>Danh bạ điện thoại, Menu điều hướng, Header Chat, hoặc danh sách thẻ bài (Cards)</strong> với số lượng item cố định và quy mô nhỏ (thường dưới 100 items). 
                <br /><br />
                Thách thức ở đây không nằm ở hiệu năng xử lý của trình duyệt, mà nằm ở việc <strong>quản lý độ phức tạp của Code</strong>. Nhiều lập trình viên thường mắc lỗi &quot;Over-engineering&quot; khi áp dụng ngay Virtualization (Windowing) cho các danh sách này, dẫn đến code bị phình to (ref, offset calculation) mà không mang lại lợi ích thực tế.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-xs font-black tracking-widest text-emerald-600 uppercase">
                <div className="size-1.5 rounded-full bg-emerald-500" />
                CHIẾN LƯỢC GIẢI QUYẾT
              </h4>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Đối với quy mô <strong>Short Scale</strong>, chiến lược tối ưu nhất là sử dụng phương thức <code>.map()</code> nguyên bản của React để render toàn bộ DOM Nodes. 
                <br /><br />
                <strong>Lợi ích cốt lõi:</strong> Trình duyệt hiện đại có khả năng render 100 node trong chưa đầy 2ms. Việc giữ code đơn giản giúp tăng khả năng bảo trì, hỗ trợ SEO nội dung tốt hơn, và đảm bảo các tính năng native của trình duyệt (như Ctrl+F tìm kiếm) hoạt động hoàn hảo mà không cần thêm logic phức tạp.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🚀 The Demo */}
      <div className="space-y-6">
        <header className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-white/5">
          <h2 className="text-xs font-black tracking-[0.2em] text-slate-400 uppercase">
            Native List Rendering
          </h2>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-500 dark:bg-white/5">
            8 ITEMS
          </span>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center gap-4 rounded-3xl border border-slate-100 bg-white/70 p-5 shadow-sm transition-all hover:shadow-lg dark:border-white/5 dark:bg-slate-900/50"
            >
              <div
                className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl shadow-lg ${contact.color} font-black text-white`}
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
    </div>
  );
}
