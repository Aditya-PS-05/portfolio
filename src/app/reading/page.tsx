import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import ReadingList from "@/components/ReadingList";
import { getReadingCatalog, getReadingNotes } from "@/lib/reading";

export const metadata: Metadata = {
  title: "Reading list",
  description:
    "200 papers and posts across ML, alignment, agent foundations and mechanistic interpretability, with what each one is for and my notes on the ones I have read.",
};

export default function ReadingPage() {
  const items = getReadingCatalog();
  const notes = getReadingNotes();

  // Render each note's MDX on the server; the client list only places the nodes.
  const noteNodes: Record<number, ReactNode> = {};
  const noteMeta: Record<number, { status: "read" | "reading"; readOn: string; rating?: number }> = {};
  for (const n of Object.values(notes)) {
    noteMeta[n.id] = { status: n.status, readOn: n.readOn, rating: n.rating };
    if (n.body) {
      noteNodes[n.id] = (
        <MDXRemote source={n.body} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      );
    }
  }

  return (
    <>
      <Header />
      <main className="page">
        <div className="reading-intro">
          <h1 className="posts-heading" style={{ marginTop: "3rem" }}>
            Reading list
          </h1>
          <p className="muted">
            200 papers and posts I am working through: ML foundations, scaling,
            post-training, mechanistic interpretability, alignment, agent
            foundations and strategy. The alignment half follows{" "}
            <a href="https://vkrakovna.wordpress.com/ai-safety-resources/">
              Victoria Krakovna&rsquo;s resources list
            </a>
            ; the rest fills in the ML and MIRI material it leaves out. They are arranged in
            ten phases in the order I plan to read them, dependency first, with
            a line under each item on why it is here. Items I have finished carry the
            date and my notes.
          </p>
        </div>
        <ReadingList items={items} meta={noteMeta} notes={noteNodes} />
        <p className="post-footer" style={{ border: "none", marginTop: "2rem" }}>
          <Link href="/">← Home</Link>
        </p>
      </main>
    </>
  );
}
