#!/usr/bin/env node
// Mark a reading-list item as read and open a note for it.
//   pnpm read 42                -> creates src/content/reading-notes/42.mdx (status: read, today's date)
//   pnpm read 42 --reading      -> status: reading (in progress)
//   pnpm read                   -> prints the unread items, lowest id first
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(fs.readFileSync(path.join(root, "src/content/reading-list.json"), "utf8")).sort((a, b) => a.order - b.order);
const notesDir = path.join(root, "src/content/reading-notes");
fs.mkdirSync(notesDir, { recursive: true });

const [, , idArg, ...flags] = process.argv;
if (!idArg) {
  const have = new Set(fs.readdirSync(notesDir).map((f) => Number(f.replace(".mdx", ""))));
  const unread = catalog.filter((i) => !have.has(i.id));
  console.log(`${catalog.length - unread.length} read, ${unread.length} to go. Next up:\n`);
  for (const i of unread.slice(0, 15)) console.log(`  id ${String(i.id).padStart(3, "0")}  #${String(i.order).padStart(3, "0")}  ${i.title}  (${i.phase})`);
  console.log(`\nMark one with: pnpm read <id>`);
  process.exit(0);
}

const id = Number(idArg);
const item = catalog.find((i) => i.id === id);
if (!item) {
  console.error(`No item with id ${idArg}. Run "pnpm read" to list ids.`);
  process.exit(1);
}
const file = path.join(notesDir, `${id}.mdx`);
if (fs.existsSync(file)) {
  console.log(`Note already exists: ${path.relative(root, file)}`);
  process.exit(0);
}
const status = flags.includes("--reading") ? "reading" : "read";
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  file,
  `---
# ${item.title} — ${item.who}
status: ${status}
readOn: "${today}"
# rating: 4
---

`
);
console.log(`Created ${path.relative(root, file)}  (${item.title})`);
console.log(`Write your note below the frontmatter, then commit and push.`);
