"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { LoadMoreObserverDocs } from "@/components/technical-docs";

interface Item {
  id: number;
  name: string;
  description: string;
  price: string;
}

const initialItems: Item[] = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  name: `Simple Item #${i}`,
  description: "Dòng mô tả ngắn gọn cho sản phẩm đơn giản này.",
  price: `${(Math.random() * 100).toFixed(2)}$`,
}));

export default function LoadMoreObserverPage() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  // Sentinel element ref
  const loaderRef = useRef<HTMLDivElement>(null);

  const fetchMoreData = useCallback(() => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const nextId = items.length;
      const newBatch: Item[] = Array.from({ length: 10 }, (_, i) => ({
        id: nextId + i,
        name: `Simple Item #${nextId + i}`,
        description: "Dòng mô tả ngắn gọn cho sản phẩm đơn giản này.",
        price: `${(Math.random() * 100).toFixed(2)}$`,
      }));

      setItems((prev) => [...prev, ...newBatch]);
      setLoading(false);
      
      // Stop after 200 items to simulate "end of list"
      if (items.length + newBatch.length > 200) {
        setHasMore(false);
      }
    }, 1000);
  }, [items.length, loading, hasMore]);

  // Observer Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreData();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [fetchMoreData]);

  return (
    <div className="relative">
      <LoadMoreObserverDocs />

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-zinc-900/40">
        <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-gray-500">
          Standard List Rendering (No Virtualization)
        </h2>
        
        <div className="space-y-4">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition-colors hover:bg-gray-50 dark:border-white/5 dark:hover:bg-white/5"
            >
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 font-bold">
                  {item.id}
                </div>
                <div>
                  <h3 className="text-sm font-bold">{item.name}</h3>
                  <p className="text-xs text-gray-400">{item.description}</p>
                </div>
              </div>
              <div className="text-sm font-bold text-emerald-500">
                {item.price}
              </div>
            </div>
          ))}
        </div>

        {/* Sentinel / Loader */}
        <div 
          ref={loaderRef} 
          className="mt-8 flex flex-col items-center justify-center py-10"
        >
          {loading && (
            <div className="flex flex-col items-center gap-3">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 animate-pulse">
                Fetching Data...
              </span>
            </div>
          )}
          {!hasMore && (
            <div className="rounded-full bg-gray-100 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:bg-zinc-800">
              Bạn đã xem hết 200 sản phẩm
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between px-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
        <span>Current DOM Node count: {items.length * 5} (Est.)</span>
        <span>Total Items: {items.length}</span>
      </div>
    </div>
  );
}
