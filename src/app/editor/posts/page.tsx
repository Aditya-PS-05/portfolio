"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import HeaderClient from "@/components/HeaderClient";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PostsEditorPage() {
  const posts = useQuery(api.posts.getAll);
  const createPost = useMutation(api.posts.create);
  const archivePost = useMutation(api.posts.archive);
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      const postId = await createPost({ title: "Untitled" });
      router.push(`/editor/posts/${postId}`);
    } finally {
      setIsCreating(false);
    }
  };

  const handleArchive = async (id: Id<"posts">) => {
    await archivePost({ id });
  };

  return (
    <>
      <HeaderClient />
      <hr />
      <main className="posts-editor">
        <div className="posts-header">
          <h1>My Posts</h1>
          <button
            onClick={handleCreate}
            disabled={isCreating}
            className="create-btn"
          >
            {isCreating ? "Creating..." : "+ New Post"}
          </button>
        </div>

        {posts === undefined && <p>Loading...</p>}

        {posts && posts.length === 0 && (
          <p className="empty-state">No posts yet. Create your first post!</p>
        )}

        {posts && posts.length > 0 && (
          <ul className="posts-list">
            {posts.map((post) => (
              <li key={post._id} className="post-item">
                <Link href={`/editor/posts/${post._id}`} className="post-link">
                  <span className="post-icon">{post.icon || "📄"}</span>
                  <span className="post-title">{post.title}</span>
                  {post.isPublished && (
                    <span className="published-badge">Published</span>
                  )}
                </Link>
                <div className="post-actions">
                  <button
                    onClick={() => handleArchive(post._id)}
                    className="archive-btn"
                  >
                    Archive
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      <style jsx>{`
        .posts-editor {
          max-width: 800px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        .posts-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .create-btn {
          padding: 0.5rem 1rem;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .create-btn:disabled {
          opacity: 0.5;
        }
        .posts-list {
          list-style: none;
          padding: 0;
        }
        .post-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border: 1px solid #eee;
          border-radius: 8px;
          margin-bottom: 0.5rem;
        }
        .post-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: inherit;
          flex: 1;
        }
        .post-icon {
          font-size: 1.2rem;
        }
        .published-badge {
          font-size: 0.75rem;
          padding: 0.2rem 0.5rem;
          background: #10b981;
          color: white;
          border-radius: 4px;
        }
        .archive-btn {
          padding: 0.25rem 0.5rem;
          background: transparent;
          border: 1px solid #ccc;
          border-radius: 4px;
          cursor: pointer;
        }
        .empty-state {
          text-align: center;
          color: #666;
          padding: 2rem;
        }
      `}</style>
    </>
  );
}
