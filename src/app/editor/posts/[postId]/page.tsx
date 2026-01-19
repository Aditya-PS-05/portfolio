"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import HeaderClient from "@/components/HeaderClient";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import OutlinerEditor from "@/components/OutlinerEditor";

export default function PostEditorPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.postId as Id<"posts">;

  const post = useQuery(api.posts.getById, { postId });
  const updatePost = useMutation(api.posts.update);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content || "");
      setSlug(post.slug || "");
      setExcerpt(post.excerpt || "");
      setIsPublished(post.isPublished);
    }
  }, [post]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updatePost({
        id: postId,
        title,
        content,
        slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
        excerpt,
        isPublished,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleContentChange = (data: unknown[]) => {
    setContent(JSON.stringify(data));
  };

  if (post === undefined) {
    return (
      <>
        <HeaderClient />
        <hr />
        <main className="post-editor">
          <p>Loading...</p>
        </main>
      </>
    );
  }

  if (post === null) {
    return (
      <>
        <HeaderClient />
        <hr />
        <main className="post-editor">
          <p>Post not found</p>
        </main>
      </>
    );
  }

  const parsedContent = content
    ? (() => {
        try {
          return JSON.parse(content);
        } catch {
          return undefined;
        }
      })()
    : undefined;

  return (
    <>
      <HeaderClient />
      <hr />
      <main className="post-editor">
        <div className="editor-header">
          <button onClick={() => router.push("/editor/posts")} className="back-btn">
            ← Back to posts
          </button>
          <div className="editor-actions">
            <label className="publish-toggle">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
              />
              Published
            </label>
            <button onClick={handleSave} disabled={isSaving} className="save-btn">
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        <div className="editor-meta">
          <label>
            Slug:
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="url-friendly-slug"
            />
          </label>
          <label>
            Excerpt:
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description for previews"
              rows={2}
            />
          </label>
        </div>

        <OutlinerEditor
          title={title}
          onTitleChange={setTitle}
          initialData={parsedContent}
          onChange={handleContentChange}
        />
      </main>

      <style jsx>{`
        .post-editor {
          max-width: 900px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        .editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .back-btn {
          padding: 0.5rem 1rem;
          background: transparent;
          border: 1px solid #ccc;
          border-radius: 4px;
          cursor: pointer;
        }
        .editor-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .publish-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .save-btn {
          padding: 0.5rem 1rem;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .save-btn:disabled {
          opacity: 0.5;
        }
        .editor-meta {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: #f9f9f9;
          border-radius: 8px;
        }
        .editor-meta label {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          font-size: 0.875rem;
          color: #666;
        }
        .editor-meta input,
        .editor-meta textarea {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
      `}</style>
    </>
  );
}
