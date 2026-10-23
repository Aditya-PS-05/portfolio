"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { ReadingItem } from "@/lib/reading";

type Meta = { status: "read" | "reading"; readOn: string; rating?: number };

export default function ReadingList({
  items,
  meta,
  notes,
}: {
  items: ReadingItem[];
  meta: Record<number, Meta>;
  notes: Record<number, ReactNode>;
}) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const cats = useMemo(() => Array.from(new Set(items.map((i) => i.cat))), [items]);
  const q = query.trim().toLowerCase();
  const readCount = items.filter((i) => meta[i.id]?.status === "read").length;
  const readingCount = items.filter((i) => meta[i.id]?.status === "reading").length;

  function visible(i: ReadingItem) {
    const st = meta[i.id]?.status;
    if (filter === "unread" && st === "read") return false;
    if (filter === "read" && !st) return false;
    if (cat && cat !== i.cat) return false;
    if (q && !`${i.title} ${i.who} ${i.why}`.toLowerCase().includes(q)) return false;
    return true;
  }

  return (
    <div className="reading">
      <div className="reading-bar">
        <div className="reading-row">
          <input
            id="reading-search"
            type="search"
            placeholder="Search titles, authors, notes"
            aria-label="Search the reading list"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {(["all", "unread", "read"] as const).map((f) => (
            <button
              key={f}
              type="button"
              className="reading-chip"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="reading-row">
          <button type="button" className="reading-chip" aria-pressed={cat === null} onClick={() => setCat(null)}>
            All sections
          </button>
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              className="reading-chip"
              aria-pressed={cat === c}
              onClick={() => setCat(cat === c ? null : c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="reading-progress">
          <span>
            {readCount} / {items.length} read
            {readingCount > 0 ? `, ${readingCount} in progress` : ""}
          </span>
          <div className="reading-track">
            <div className="reading-fill" style={{ width: `${(100 * readCount) / items.length}%` }} />
          </div>
        </div>
      </div>

      {cats.map((c) => {
        const sub = items.filter((i) => i.cat === c && visible(i));
        if (sub.length === 0) return null;
        const total = items.filter((i) => i.cat === c).length;
        const read = items.filter((i) => i.cat === c && meta[i.id]?.status === "read").length;
        return (
          <section key={c} className="reading-section">
            <h2>
              {c} <span className="reading-n">{read}/{total}</span>
            </h2>
            <ol>
              {sub.map((i) => {
                const m = meta[i.id];
                const note = notes[i.id];
                return (
                  <li key={i.id} className={m?.status === "read" ? "done" : m?.status === "reading" ? "reading-now" : undefined}>
                    <span className="reading-mark" aria-hidden="true">
                      {m?.status === "read" ? "✓" : m?.status === "reading" ? "…" : ""}
                    </span>
                    <div>
                      <div className="reading-title">
                        <span className="reading-num">{String(i.id).padStart(3, "0")}</span>
                        <a href={i.url} target="_blank" rel="noopener noreferrer">
                          {i.title}
                        </a>
                      </div>
                      <div className="reading-meta">
                        <span>{i.who}</span>
                        <span className="reading-type">{i.type}</span>
                        {i.url !== i.search && (
                          <a href={i.search} target="_blank" rel="noopener noreferrer">
                            search
                          </a>
                        )}
                        {m?.readOn && (
                          <span className="reading-date">
                            {m.status === "reading" ? "started" : "read"} {m.readOn}
                            {m.rating ? ` · ${"★".repeat(m.rating)}` : ""}
                          </span>
                        )}
                      </div>
                      <div className="reading-why">{i.why}</div>
                      {note && (
                        <details className="reading-note">
                          <summary>My notes</summary>
                          <div className="post-content">{note}</div>
                        </details>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
