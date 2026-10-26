import { AiOutlineMedicineBox } from "react-icons/ai";

function Logo() {
    return (
        <div className="flex items-center gap-2 cursor-pointer">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-xl font-bold text-white">
                <AiOutlineMedicineBox />
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900">
                TenaTech
            </span>
        </div>
    )
}

export default Logo