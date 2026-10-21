"use client";
import { AiOutlineMedicineBox } from "react-icons/ai";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-xl font-bold text-white">
            <AiOutlineMedicineBox />
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            TenaTech
          </span>
        </div>
      </div>
    </header>
  );
}