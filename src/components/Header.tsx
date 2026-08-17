import Link from "next/link";
import LiveStatus from "@/components/LiveStatus";

export default function Header() {
  return (
    <header className="topbar">
      <Link href="/" className="topbar-name">
        Aditya Pratap Singh
      </Link>
      <nav className="topbar-right">
        <Link href="/archive">writing</Link>
        <Link href="/#projects">projects</Link>
        <span className="topbar-divider" />
        <LiveStatus />
      </nav>
    </header>
  );
}
