import Link from "next/link";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import { getContentList } from "@/lib/content";
import { auth, isAdmin } from "@/lib/auth";

export default async function NotesPage() {
  const session = await auth();
  
  if (!session) {
    redirect("/");
  }

  const includePrivate = isAdmin(session?.user?.email);
  const notes = getContentList("notes", includePrivate);

  return (
    <>
      <Header />
      <main className="page">
        <h1 className="posts-heading" style={{ marginTop: "3rem" }}>
          Notes
        </h1>

        {notes.length > 0 ? (
          <ul className="posts-list">
            {notes.map((note) => (
              <li key={note.slug}>
                <Link href={`/notes/${note.slug}`}>{note.title}</Link>
                {note.private && <span className="private-badge">private</span>}
                <span className="date">
                  {new Date(note.date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-state">No notes yet.</p>
        )}

        <p className="post-footer" style={{ border: "none", marginTop: "2rem" }}>
          <Link href="/">← Home</Link>
        </p>
      </main>
    </>
  );
}
