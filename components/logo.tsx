import { routes } from "@/lib/routes";
import Link from "next/link";
import { AiOutlineMedicineBox } from "react-icons/ai";

function Logo() {
    return (
        <Link href={routes.home} className="flex items-center gap-2 cursor-pointer">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-xl font-bold text-white">
                <AiOutlineMedicineBox />
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900">
                TenaTech
            </span>
        </Link>
    )
}

export default Logo