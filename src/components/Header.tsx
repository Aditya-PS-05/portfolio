import Link from "next/link";
import { auth } from "@/lib/auth";
import { signInAction, signOutAction } from "@/lib/actions";

export default async function Header() {
  const session = await auth();

  return (
    <header className="site-header">
      <h1 className="site-title">
        <Link href="/">Aditya Pratap Singh</Link>
      </h1>
      <div className="code-nav">
        <Link href="/">Home</Link>{" "}
        <span className="punctuation">|</span>{" "}
        <Link href="/notes">Notes</Link>{" "}
        <span className="punctuation">|</span>{" "}
        <Link href="/posts">Posts</Link>{" "}
        <span className="punctuation">|</span>{" "}
        <Link href="/archive">Archive</Link>
        {session && (
          <>
            {" "}
            <span className="punctuation">|</span>{" "}
            <Link href="/editor">Editor</Link>
          </>
        )}
      </div>
      <nav className="social-links">
        <a href="mailto:adipras1407@gmail.com">Email</a> ⋅{" "}
        <a href="https://github.com/Aditya-PS-05">GitHub</a> ⋅{" "}
        <a href="https://twitter.com/0xAditya_pratap">Twitter</a>
        {session ? (
          <>
            {" "}
            ⋅{" "}
            <form action={signOutAction} className="inline">
              <button type="submit" className="link-button">
                Sign out
              </button>
            </form>
          </>
        ) : (
          <>
            {" "}
            ⋅{" "}
            <form action={signInAction} className="inline">
              <button type="submit" className="link-button">
                Sign in
              </button>
            </form>
          </>
        )}
      </nav>
    </header>
  );
}
