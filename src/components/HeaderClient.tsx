"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import LiveStatus from "@/components/LiveStatus";

export default function HeaderClient() {
  const { data: session } = useSession();

  return (
    <header className="topbar">
      <Link href="/" className="topbar-name">
        Aditya Pratap Singh
      </Link>
      <nav className="topbar-right">
        <Link href="/archive">writing</Link>
        <Link href="/#projects">projects</Link>
        {session && (
          <button onClick={() => signOut()} className="link-button">
            sign out
          </button>
        )}
        <span className="topbar-divider" />
        <LiveStatus />
      </nav>
    </header>
  );
}
