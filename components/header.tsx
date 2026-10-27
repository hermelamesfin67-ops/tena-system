"use client";
import { cn } from "cn";
import Logo from "./logo";
import { ChevronRight } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";

export default function Header({ portal = false }: { portal?: boolean }) {
  const router = useRouter()
  const { data: session } = useSession()
  return (
    <header
      className={cn("flex items-center justify-between gap-4 sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur px-4 py-2 w-full",
        !portal && "max-w-7xl mx-auto"
      )}
    >
      <Logo />
      {session ?
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />} className={"bg-none! focus:bg-none! focus:border-none! border-none! flex items-center gap-3 cursor-pointer"}>
            <div className="flex items-center gap-3 px-2">
              <div className="flex h-10 w-10 border uppercase items-center justify-center rounded-full bg-brand text-sm font-semibold">
                {session?.user?.user?.username?.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800 capitalize">{session?.user?.user?.username}</p>
                <p className="text-xs text-slate-500 uppercase">{session?.user?.user?.role}</p>
              </div><ChevronRight size={17} className="text-slate-400" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href={routes.overview}>Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                router.replace(routes.home)
                signOut({ redirect: false })
              }}>Logout</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        : <Link href={routes.signIn}><Button>Login</Button></Link>
      }
    </header>
  );
}