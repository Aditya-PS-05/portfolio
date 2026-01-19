import Link from "next/link";
import Header from "@/components/Header";
import { getContentList } from "@/lib/content";
import { auth, isAdmin } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  const includePrivate = isAdmin(session?.user?.email);
  const posts = getContentList("posts", includePrivate).slice(0, 5);

  return (
    <>
      <Header />
      <hr />

      <div className="bio">
        <p>
          <strong>Open source Rust programmer</strong> contributing to{" "}
          <a href="https://github.com/astral-sh/uv">Astral-sh/uv</a> and{" "}
          <a href="https://github.com/rust-lang/rust">Rust-Lang/Rust</a>.
        </p>
        <p>
          Currently: Full Stack Developer at{" "}
          <a href="https://runitup.ai">HAQQ Studios</a>, Frontend at Journim. CS
          undergrad.
        </p>
        <p>I write about Rust, open source, and full-stack development.</p>
      </div>

      <p className="projects-heading">Check out some of my contributions:</p>

      <div className="projects-list">
        <span className="keyword">match</span> contribution{" "}
        <span className="keyword">with</span>
        <br />
        &nbsp;&nbsp;<span className="punctuation">|</span>{" "}
        <a href="https://github.com/astral-sh/uv/pull/8226">uv#8226</a>{" "}
        <span className="arrow">-&gt;</span>{" "}
        <span className="desc">Avoid writing duplicate index URLs</span>
        <br />
        &nbsp;&nbsp;<span className="punctuation">|</span>{" "}
        <a href="https://github.com/astral-sh/uv/pull/8215">uv#8215</a>{" "}
        <span className="arrow">-&gt;</span>{" "}
        <span className="desc">Improve color env vars and CLI options</span>
        <br />
        &nbsp;&nbsp;<span className="punctuation">|</span>{" "}
        <a href="https://github.com/astral-sh/uv/pull/7387">uv#7387</a>{" "}
        <span className="arrow">-&gt;</span>{" "}
        <span className="desc">Add support for pip-supported file extensions</span>
        <br />
        &nbsp;&nbsp;<span className="punctuation">|</span>{" "}
        <a href="https://github.com/rust-lang/rust/pull/135406">rust#135406</a>{" "}
        <span className="arrow">-&gt;</span>{" "}
        <span className="desc">Update unstable lint docs</span>
        <br />
      </div>

      <section className="posts-section">
        <h2>Recent posts:</h2>
        {posts.length > 0 ? (
          <ul className="posts-list">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                <span className="date">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                {post.private && <span className="private-badge">private</span>}
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts yet.</p>
        )}
        <p>
          <Link href="/archive">View all posts →</Link>
        </p>
      </section>
    </>
  );
}
