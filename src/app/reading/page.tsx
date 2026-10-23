import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import ReadingList from "@/components/ReadingList";
import items from "@/content/reading-list.json";

export const metadata: Metadata = {
  title: "Reading list",
  description:
    "200 papers and posts across ML, alignment, agent foundations and mechanistic interpretability, with what each one is for.",
};

export default function ReadingPage() {
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
            ; the rest fills in the ML and MIRI material it leaves out. One line
            under each item says why it is here. Ticks are saved in your browser
            only.
          </p>
        </div>
        <ReadingList items={items} />
        <p className="post-footer" style={{ border: "none", marginTop: "2rem" }}>
          <Link href="/">← Home</Link>
        </p>
      </main>
    </>
  );
}
