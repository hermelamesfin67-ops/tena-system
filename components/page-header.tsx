import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import { cn } from "cn";
import React from "react";

export type PageHeaderTypes = {
    children?: React.ReactNode
    breadcrumb?: { name: string | null; href?: string }[];
};

export default function PageHeader({
    children,
    breadcrumb,
}: React.PropsWithChildren<PageHeaderTypes>) {
    return (
        <div className="flex flex-col sm:flex-row justify-between w-full">
            <ul className="flex items-center gap-1">
                <Link
                    href={"/overview"}
                    className={cn("text-sm bg-primary/5 p-1 rounded-full")}
                >
                    <HomeIcon />
                </Link>
                <FaAngleRight className="text-[#CBD5E1]" />
                {breadcrumb?.map((item, i) => (
                    <div key={item.name} className="flex items-center gap-2">
                        {item.name && item.href ? (
                            <Link
                                href={item.href || ""}
                                className={cn(
                                    "text-sm bg-[#F8FAFC] rounded-full px-3 py-1",
                                )}
                            >
                                {item.name}
                            </Link>
                        ) : <div
                            className={cn(
                                "text-sm rounded-full px-3 py-1 text-primary bg-[#f7fff6]",
                            )}
                        >
                            {item.name}
                        </div>}
                        {i + 1 < breadcrumb?.length ? (
                            <FaAngleRight className="text-[#CBD5E1]" />
                        ) : null}
                    </div>
                ))}
            </ul>
            {children}
        </div>
    );
}
