import fs from "fs";
import path from "path";
import matter from "gray-matter";
import catalog from "@/content/reading-list.json";

export interface ReadingItem {
  id: number;
  cat: string;
  title: string;
  who: string;
  type: string;
  url: string;
  search: string;
  why: string;
  phase: string;
  order: number;
}

export type ReadingStatus = "read" | "reading";

export interface ReadingNote {
  id: number;
  status: ReadingStatus;
  readOn: string; // ISO date
  rating?: number; // optional 1-5
  body: string; // MDX
}

const notesDir = path.join(process.cwd(), "src/content/reading-notes");

/** Notes live in src/content/reading-notes/<id>.mdx. Filename stem is the item id. */
export function getReadingNotes(): Record<number, ReadingNote> {
  if (!fs.existsSync(notesDir)) return {};
  const out: Record<number, ReadingNote> = {};
  for (const f of fs.readdirSync(notesDir)) {
    const m = f.match(/^(\d+)\.mdx$/);
    if (!m) continue;
    const id = Number(m[1]);
    const { data, content } = matter(fs.readFileSync(path.join(notesDir, f), "utf8"));
    out[id] = {
      id,
      status: data.status === "reading" ? "reading" : "read",
      readOn: data.readOn ? String(data.readOn).slice(0, 10) : "",
      rating: typeof data.rating === "number" ? data.rating : undefined,
      body: content.trim(),
    };
  }
  return out;
}

export function getReadingCatalog(): ReadingItem[] {
  return [...(catalog as ReadingItem[])].sort((a, b) => a.order - b.order);
}
