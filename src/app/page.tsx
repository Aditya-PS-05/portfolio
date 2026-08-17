import Image from "next/image";
import Header from "@/components/Header";
import { getContentList } from "@/lib/content";

const PROJECTS = [
  {
    name: "Sunny",
    href: "https://sunny.adityaps.work",
    desc: "Private, on-device skin lesion tracker — fine-tuned VLM, 93% smaller, fully offline",
  },
  {
    name: "AgentReplay",
    href: "https://agentreplay.adityaps.work",
    desc: "Turns production AI-agent failures into verified pull requests",
  },
  {
    name: "Codesm",
    href: "https://codesm.adityaps.work",
    desc: "Multi-agent LLM coding system, up to 10 subagents across 4 providers",
  },
  {
    name: "Audex",
    href: "https://tryaudex.adityaps.work",
    desc: "Sub-500ms scoped cloud credentials for AI agents",
  },
];

export default function Home() {
  const posts = getContentList("posts").slice(0, 4);

  return (
    <>
      <Header />
      <main className="page">
        <section className="hero">
          <div className="hero-bio">
            <p>Hey, I&rsquo;m Aditya — welcome to my corner of the internet.</p>
            <p className="muted">
              I build ML systems that live under real constraints: a phone&rsquo;s
              memory, a sandboxed microVM, a compiler&rsquo;s diagnostic pass.
              Sometimes I just fix crashes in Rust for fun.
            </p>

            <div className="summary-label">Summary</div>
            <ul className="summary-list">
              <li>
                Currently <strong>Technical Lead, AI Engineering</strong> at
                HCLTech, building agent infrastructure for a Bank of Ireland
                engagement
              </li>
              <li>
                Previously, AI Developer at{" "}
                <a href="https://runitup.ai">Runitup</a>, shipping the
                ad-generation pipeline in Rust
              </li>
              <li>
                Contribute upstream to{" "}
                <a href="https://github.com/rust-lang/rust/pulls?q=is%3Apr+is%3Amerged+author%3AAditya-PS-05">
                  rust-lang/rust
                </a>
                ,{" "}
                <a href="https://github.com/rust-lang/rust-analyzer/pulls?q=is%3Apr+is%3Amerged+author%3AAditya-PS-05">
                  rust-analyzer
                </a>{" "}
                and{" "}
                <a href="https://github.com/astral-sh/uv/pulls?q=is%3Apr+is%3Amerged+author%3AAditya-PS-05">
                  astral-sh/uv
                </a>{" "}
                🦀
              </li>
              <li>
                B.Tech in Mechanical Engineering at NIT Tiruchirappalli,
                2022–2026
              </li>
              <li>Based in India</li>
            </ul>

            <div className="social-row">
              <a href="mailto:adipras1407@gmail.com" aria-label="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 6-10 7L2 6" />
                </svg>
              </a>
              <a href="https://github.com/Aditya-PS-05" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55v-2.14c-3.17.69-3.84-1.36-3.84-1.36-.52-1.3-1.27-1.65-1.27-1.65-1.04-.71.08-.7.08-.7 1.14.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.05-.12-.29-.5-1.46.11-3.05 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47 3.14-1.16 3.14-1.16.61 1.59.23 2.76.11 3.05.73.79 1.17 1.81 1.17 3.05 0 4.37-2.67 5.33-5.21 5.62.41.36.77 1.05.77 2.13v3.16c0 .3.21.66.79.55A11.04 11.04 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5Z" />
                </svg>
              </a>
              <a href="https://twitter.com/0xAditya_pratap" aria-label="X / Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.9 1.6h3.3l-7.2 8.2 8.5 11.2h-6.6L11.5 13l-6 7.9H2.2l7.7-8.8L1.7 1.6h6.8l4.7 6.2 5.7-6.2Zm-1.2 17.5h1.8L7.4 3.5H5.5l12.2 15.6Z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/aditya-pratap-singh-952a8820a/"
                aria-label="LinkedIn"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
                </svg>
              </a>
              <span className="divider" />
              <a className="now-status" href="https://agentreplay.adityaps.work">
                <span className="pulse" />
                Currently shipping AgentReplay ↗
              </a>
            </div>
          </div>

          <div className="hero-avatar">
            <Image
              src="/avatar.png"
              alt="Aditya Pratap Singh"
              width={1023}
              height={1537}
              priority
            />
          </div>
        </section>

        <section className="split" id="projects">
          <div>
            <div className="split-label">Projects</div>
            <div className="item-list">
              {PROJECTS.map((p) => (
                <div className="item-row" key={p.name}>
                  <div>
                    <a className="item-name" href={p.href}>
                      {p.name} ↗
                    </a>
                    <div className="item-desc">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="split-label">Writing</div>
            {posts.length > 0 ? (
              <>
                <div className="writing-list">
                  {posts.map((post) => (
                    <a key={post.slug} href={`/posts/${post.slug}`}>
                      {post.title}
                    </a>
                  ))}
                </div>
                <p className="split-more">
                  <a href="/archive">all posts ↗</a>
                </p>
              </>
            ) : (
              <p className="writing-empty">I am too lazy to write :&apos;)</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
