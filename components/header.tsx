"use client";

import { cn } from "cn";
import Logo from "./logo";
import { ChevronRight } from "lucide-react";

export default function Header({ portal = false }: { portal?: boolean }) {
  return (
    <header
      className={cn("flex items-center justify-between gap-4 sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur px-4 py-2",
        !portal && "max-w-7xl mx-auto"
      )}
    >
      <div>
        <Logo />
      </div>
      <div className="flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-xs font-semibold">
          CA
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-800">Content Admin</p>
          <p className="text-xs text-slate-500">Administrator</p>
        </div><ChevronRight size={17} className="text-slate-400" />
      </div>
    </header>
  );
}