import { routes } from "@/lib/routes";
import Link from "next/link";
import LogoIcon from "./icons/logo";

function Logo() {
    return (
        <Link href={routes.home} className="flex items-center gap-2 cursor-pointer">
           <LogoIcon />
        </Link>
    )
}

export default Logo