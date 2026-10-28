
'use client';

import {
    Activity,
    Boxes,
    Globe2,
    LayoutDashboard,
    X,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { routes } from '@/lib/routes';

const nav = [
    { label: 'Overview', icon: LayoutDashboard, href: routes.overview },
    { label: 'Medicines', icon: Activity, href: routes.medicines },
    { label: 'Categories', icon: Boxes, href: routes.category },
    { label: 'Languages', icon: Globe2, href: routes.languages },
];

const NavLinks = ({ pathName, setIsOpen, mobile = false }: { pathName: string, setIsOpen: (arg: boolean) => void, mobile?: boolean }) => (
    <div className="space-y-1">
        {nav.map(({ label, href, icon: Icon }) => {
            const isActive = pathName?.includes(href);

            return (
                <Link
                    key={label}
                    href={href}
                    onClick={() => mobile && setIsOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${isActive
                        ? 'border-l-[3px] border-brand bg-emerald-100/70 text-brand'
                        : 'text-slate-600 hover:bg-slate-100'
                        }`}
                >
                    <Icon size={19} />
                    {label}
                </Link>
            );
        })}
    </div>
);

type Props = {
    isOpen: boolean, setIsOpen: (arg: boolean) => void
}
export function AdminSidebar({ isOpen, setIsOpen }: Props) {
    const pathName = usePathname();

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden h-full min-h-[90dvh] w-60 shrink-0 flex-col border-r border-slate-200 bg-[#f8fcfa] px-4 py-5 lg:flex">
                <NavLinks pathName={pathName} setIsOpen={setIsOpen} />
            </aside>

            {/* Mobile overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${isOpen
                    ? 'visible opacity-100'
                    : 'invisible opacity-0'
                    }`}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            />

            {/* Mobile slide-out sidebar */}
            <aside
                id="mobile-admin-sidebar"
                aria-label="Mobile admin navigation"
                aria-hidden={!isOpen}
                className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-slate-200 bg-[#f8fcfa] px-4 py-5 shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="mb-6 flex items-center justify-end">
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close navigation menu"
                        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                    >
                        <X size={21} />
                    </button>
                </div>

                <NavLinks mobile setIsOpen={setIsOpen} pathName={pathName} />
            </aside>
        </>
    );
}
