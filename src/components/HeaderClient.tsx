"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function HeaderClient() {
  const { data: session } = useSession();

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
        <Link href="/archive">Posts</Link>{" "}
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
            <button onClick={() => signOut()} className="link-button">
              Sign out
            </button>
          </>
        ) : (
          <>
            {" "}
            ⋅{" "}
            <button onClick={() => signIn("github")} className="link-button">
              Sign in
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
