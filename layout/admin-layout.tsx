"use client"
import { AdminSidebar } from "@/components/admin-sidebar"
import Header from "@/components/header"
import { Menu } from "lucide-react"
import { useState } from "react"

function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="min-h-screen bg-white">
            <div className="flex flex-col w-full">
                <Header portal />
                <div>
                    <div className="flex px-4 py-3 lg:hidden">
                        <button
                            type="button"
                            onClick={() => setIsOpen(true)}
                            aria-label="Open navigation menu"
                            aria-expanded={isOpen}
                            aria-controls="mobile-admin-sidebar"
                            className="inline-flex h-fit items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-100"
                        >
                            <Menu size={22} />
                        </button>
                    </div>
                </div>
                <div className="flex gap-3 w-full h-full">
                    <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
                    <div className="p-3 md:p-5 w-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLayout