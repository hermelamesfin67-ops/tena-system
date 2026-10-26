"use client"
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import MainLayout from "../layout/main-layout";

export default function AppProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}): React.ReactNode {
  return (
    <SessionProvider session={session}>
      <MainLayout>
        {children}
      </MainLayout>
    </SessionProvider>
  );
}
