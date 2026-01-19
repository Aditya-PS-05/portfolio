import Link from "next/link";
import Header from "@/components/Header";
import { getContentList } from "@/lib/content";
import { auth, isAdmin } from "@/lib/auth";

export default async function ArchivePage() {
  const session = await auth();
  const includePrivate = isAdmin(session?.user?.email);
  const posts = getContentList("posts", includePrivate);

  const postsByYear = posts.reduce(
    (acc, post) => {
      const year = new Date(post.date).getFullYear().toString();
      if (!acc[year]) acc[year] = [];
      acc[year].push(post);
      return acc;
    },
    {} as Record<string, typeof posts>
  );

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <>
      <Header />
      <hr />

      <h1 style={{ fontSize: "1.75rem", fontWeight: "normal", marginBottom: "1rem" }}>
        Archive
      </h1>

      {years.length > 0 ? (
        years.map((year) => (
          <div key={year}>
            <h2 className="archive-year">{year}</h2>
            <ul className="posts-list">
              {postsByYear[year].map((post) => (
                <li key={post.slug}>
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                  <span className="date">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  {post.private && <span className="private-badge">private</span>}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No posts yet.</p>
      )}

      <p style={{ marginTop: "2rem" }}>
        <Link href="/">← Home</Link>
      </p>
    </>
  );
}
