"use client";

import { useMemo, useState, useSyncExternalStore } from "react";

export interface ReadingItem {
  id: number;
  cat: string;
  title: string;
  who: string;
  type: string;
  url: string;
  search: string;
  why: string;
}

const KEY = "reading200.done";
type Done = Record<number, boolean>;
const EMPTY: Done = {};

// A tiny external store over localStorage, so React reads it with
// useSyncExternalStore instead of setting state inside an effect.
const listeners = new Set<() => void>();
let memory: Done = EMPTY;
let lastRaw: string | null = null;

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot(): Done {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return memory; // storage unavailable: page still works, nothing is remembered
  }
  if (raw !== lastRaw) {
    lastRaw = raw;
    try {
      memory = raw ? (JSON.parse(raw) as Done) : EMPTY;
    } catch {
      memory = EMPTY;
    }
  }
  return memory;
}

function getServerSnapshot(): Done {
  return EMPTY;
}

function writeDone(next: Done) {
  memory = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

export default function ReadingList({ items }: { items: ReadingItem[] }) {
  const done = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [hideDone, setHideDone] = useState(false);

  function toggle(id: number, value: boolean) {
    writeDone({ ...done, [id]: value });
  }

  const cats = useMemo(() => Array.from(new Set(items.map((i) => i.cat))), [items]);
  const q = query.trim().toLowerCase();
  const readCount = items.filter((i) => done[i.id]).length;

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
          <button
            type="button"
            className="reading-chip"
            aria-pressed={hideDone}
            onClick={() => setHideDone((v) => !v)}
          >
            Hide read
          </button>
        </div>
        <div className="reading-row">
          <button
            type="button"
            className="reading-chip"
            aria-pressed={cat === null}
            onClick={() => setCat(null)}
          >
            All
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
          </span>
          <div className="reading-track">
            <div
              className="reading-fill"
              style={{ width: `${(100 * readCount) / items.length}%` }}
            />
          </div>
        </div>
      </div>

      {cats.map((c) => {
        if (cat && cat !== c) return null;
        const sub = items.filter(
          (i) =>
            i.cat === c &&
            (!q || `${i.title} ${i.who} ${i.why}`.toLowerCase().includes(q)) &&
            !(hideDone && done[i.id])
        );
        if (sub.length === 0) return null;
        const total = items.filter((i) => i.cat === c).length;
        const read = items.filter((i) => i.cat === c && done[i.id]).length;
        return (
          <section key={c} className="reading-section">
            <h2>
              {c} <span className="reading-n">{read}/{total}</span>
            </h2>
            <ol>
              {sub.map((i) => (
                <li key={i.id} className={done[i.id] ? "done" : undefined}>
                  <input
                    type="checkbox"
                    id={`r${i.id}`}
                    checked={!!done[i.id]}
                    onChange={(e) => toggle(i.id, e.target.checked)}
                    aria-label={`Mark read: ${i.title}`}
                  />
                  <div>
                    <div className="reading-title">
                      <label htmlFor={`r${i.id}`} className="reading-num">
                        {String(i.id).padStart(3, "0")}
                      </label>
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
                    </div>
                    <div className="reading-why">{i.why}</div>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
