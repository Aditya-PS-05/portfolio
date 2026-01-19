import Link from "next/link";
import { auth, signIn, signOut } from "@/lib/auth";

export default async function Header() {
  const session = await auth();

  return (
    <header className="site-header">
      <h1 className="site-title">
        <Link href="/">Aditya Pratap Singh</Link>
      </h1>
      <div className="code-nav">
        <span className="keyword">type</span>{" "}
        <span className="type">blog</span>{" "}
        <span className="punctuation">=</span>{" "}
        <span className="constructor">Post</span>{" "}
        <span className="keyword">of</span>{" "}
        <span className="punctuation">(</span>
        <span className="string">string</span>{" "}
        <span className="punctuation">*</span>{" "}
        <span className="type">blog</span>
        <span className="punctuation">)</span>{" "}
        <span className="punctuation">|</span>{" "}
        <Link href="/">Home</Link>{" "}
        <span className="punctuation">|</span>{" "}
        <Link href="/archive">Archive</Link>
        {session && (
          <>
            {" "}
            <span className="punctuation">|</span>{" "}
            <Link href="/notes">Notes</Link>
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
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
              className="inline"
            >
              <button type="submit" className="link-button">
                Sign out
              </button>
            </form>
          </>
        ) : (
          <>
            {" "}
            ⋅{" "}
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
              className="inline"
            >
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
