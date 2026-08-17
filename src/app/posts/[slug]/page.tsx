import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import { getContent, getContentList } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getContentList("posts");
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getContent("posts", slug);

  if (!post || post.private) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="page">
        <article style={{ maxWidth: 720, margin: "0 auto", paddingTop: "3rem" }}>
          <header className="post-header">
            <h1>{post.title}</h1>
            <p className="meta">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {post.private && <span className="private-badge" style={{ marginLeft: "0.5rem" }}>private</span>}
            </p>
          </header>

          <div className="post-content">
            <MDXRemote
              source={post.content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>

          <footer className="post-footer">
            <Link href="/">← Home</Link>
          </footer>
        </article>
      </main>
    </>
  );
}
