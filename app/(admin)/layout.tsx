import { AdminSidebar } from "@/components/admin-sidebar"
import Header from "@/components/header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-white">
            <div className="flex flex-col w-full">
                <Header portal />
                <div className="flex gap-3 w-full h-full">
                    <AdminSidebar />
                    <div className="p-3 md:p-5 w-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
