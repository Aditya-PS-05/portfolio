import Link from "next/link";
import { auth } from "@/lib/auth";
import { signInAction, signOutAction } from "@/lib/actions";
import LiveStatus from "@/components/LiveStatus";

export default async function Header() {
  const session = await auth();

  return (
    <header className="topbar">
      <Link href="/" className="topbar-name">
        Aditya Pratap Singh
      </Link>
      <nav className="topbar-right">
        <Link href="/archive">writing</Link>
        <Link href="/#projects">projects</Link>
        {session && (
          <form action={signOutAction} className="inline">
            <button type="submit" className="link-button">
              sign out
            </button>
          </form>
        )}
        <span className="topbar-divider" />
        <LiveStatus />
      </nav>
    </header>
  );
}
