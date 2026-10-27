'use client';
import { Activity, Boxes, Globe2, LayoutDashboard } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const nav = [
    { label: 'Overview', icon: LayoutDashboard, href: "/overview" },
    { label: 'Medicines', icon: Activity, href: "/medicines" },
    { label: 'Categories', icon: Boxes, href: "/categories" },
    { label: 'Languages', icon: Globe2, href: "/languages" },
];
export function AdminSidebar() {
    const pathName = usePathname()

    return <div className="hidden lg:flex min-h-[90dvh] h-full w-60 shrink-0 flex-col border-r border-slate-200 bg-[#f8fcfa] px-4 py-5">
        <div className="space-y-1">
            {nav.map(({ label, href, icon: Icon }) =>
                <Link key={label} href={href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium ${pathName === href ? 'border-l-[3px] border-brand bg-emerald-100/70 text-brand' : 'text-slate-600 hover:bg-slate-100'}`}>
                    <Icon size={19} />
                    {label}
                </Link>
            )}
        </div>
    </div>
}
