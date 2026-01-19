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

      <p className="projects-heading">Check out some of my public projects:</p>

      <div className="projects-list">
        <span className="keyword">match</span> title{" "}
        <span className="keyword">with</span>
        <br />
        &nbsp;&nbsp;<span className="punctuation">|</span>{" "}
        <a href="https://github.com/Aditya-PS-05/Codesm">Codesm</a>{" "}
        <span className="arrow">-&gt;</span>{" "}
        <span className="desc">Terminal-based AI coding agent with real-time chat, OAuth, and LSP integration (Python, Rust, Claude API)</span>
        <br />
        &nbsp;&nbsp;<span className="punctuation">|</span>{" "}
        <a href="https://github.com/Aditya-PS-05/Hyprcurl">Hyprcurl</a>{" "}
        <span className="arrow">-&gt;</span>{" "}
        <span className="desc">High-performance async HTTP client library with HTTP/1 &amp; HTTP/2 support, written in Rust</span>
        <br />
        &nbsp;&nbsp;<span className="punctuation">|</span>{" "}
        <a href="https://github.com/Aditya-PS-05/makemore">Makemore</a>{" "}
        <span className="arrow">-&gt;</span>{" "}
        <span className="desc">Character-level language models (MLP, RNN, LSTM, GRU, Transformers) for synthetic text generation</span>
        <br />
        &nbsp;&nbsp;<span className="punctuation">|</span>{" "}
        <a href="https://github.com/Aditya-PS-05/Jotion">Jotion</a>{" "}
        <span className="arrow">-&gt;</span>{" "}
        <span className="desc">Notion-inspired web app with real-time editing and live sync (Next.js, TypeScript, Convex DB)</span>
        <br />
        &nbsp;&nbsp;<span className="punctuation">|</span>{" "}
        <a href="https://github.com/Aditya-PS-05/De-Code">De-Code</a>{" "}
        <span className="arrow">-&gt;</span>{" "}
        <span className="desc">Online coding platform for NIT Trichy with secure DAuth authentication</span>
        <br />
      </div>

      <p className="projects-heading" style={{ marginTop: "2rem" }}>Open source contributions:</p>

      <div className="projects-list">
        &nbsp;&nbsp;<span className="punctuation">|</span>{" "}
        <a href="https://github.com/astral-sh/uv">astral-sh/uv</a>{" "}
        <span className="arrow">-&gt;</span>{" "}
        <span className="desc">10+ merged PRs to the fast Python package manager (Rust)</span>
        <br />
        &nbsp;&nbsp;<span className="punctuation">|</span>{" "}
        <a href="https://github.com/rust-lang/rust">rust-lang/rust</a>{" "}
        <span className="arrow">-&gt;</span>{" "}
        <span className="desc">Contributor to the Rust programming language compiler</span>
        <br />
        &nbsp;&nbsp;<span className="punctuation">|</span>{" "}
        <a href="https://github.com/rust-lang/rust-analyzer">rust-analyzer</a>{" "}
        <span className="arrow">-&gt;</span>{" "}
        <span className="desc">Contributions to the Rust LSP implementation</span>
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
