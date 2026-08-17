import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import { getContent, getContentList } from "@/lib/content";
import { auth, isAdmin } from "@/lib/auth";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const notes = getContentList("notes", true);
  return notes.map((note) => ({ slug: note.slug }));
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const canViewPrivate = isAdmin(session?.user?.email);
  const note = getContent("notes", slug);

  if (!note || (note.private && !canViewPrivate)) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="page">
        <article style={{ maxWidth: 720, margin: "0 auto", paddingTop: "3rem" }}>
          <header className="post-header">
            <h1>{note.title}</h1>
            <p className="meta">
              {new Date(note.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {note.private && <span className="private-badge" style={{ marginLeft: "0.5rem" }}>private</span>}
            </p>
          </header>

          <div className="post-content">
            <MDXRemote
              source={note.content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>

          <footer className="post-footer">
            <Link href="/notes">← Notes</Link>
          </footer>
        </article>
      </main>
    </>
  );
}
