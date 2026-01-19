"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import HeaderClient from "@/components/HeaderClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostsPage() {
  const posts = useQuery(api.posts.getPublished);
  const createPost = useMutation(api.posts.create);
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreatePost = async () => {
    setIsCreating(true);
    try {
      const postId = await createPost({ title: "Untitled" });
      router.push(`/editor/posts/${postId}`);
    } finally {
      setIsCreating(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <HeaderClient />
      <hr />
      <main className="posts-page">
        <div className="posts-page-header">
          <h1>Posts</h1>
          <button
            onClick={handleCreatePost}
            disabled={isCreating}
            className="create-post-btn"
          >
            {isCreating ? "Creating..." : "+ Create New Post"}
          </button>
        </div>

        {posts === undefined && <p className="loading">Loading...</p>}

        {posts && posts.length === 0 && (
          <div className="empty-state">
            <p>No posts yet.</p>
            <p className="empty-hint">Click the button above to create your first post.</p>
          </div>
        )}

        {posts && posts.length > 0 && (
          <ul className="posts-list">
            {posts.map((post) => (
              <li key={post._id}>
                <Link href={`/posts/${post.slug || post._id}`}>
                  {post.icon && <span className="post-icon">{post.icon}</span>}
                  {post.title}
                </Link>
                <span className="date">{formatDate(post.createdAt)}</span>
              </li>
            ))}
          </ul>
        )}


      </main>

      <style jsx>{`
        .posts-page {
          max-width: 800px;
          margin: 0 auto;
        }
        .posts-page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .posts-page-header h1 {
          font-size: 2rem;
          font-weight: 600;
        }
        .create-post-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.95rem;
          color: #666;
          padding: 0;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .create-post-btn:hover {
          color: #333;
        }
        .create-post-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .loading {
          text-align: center;
          color: #666;
          padding: 2rem;
        }
        .empty-state {
          text-align: center;
          padding: 3rem;
          background: #f9f9f9;
          border-radius: 8px;
        }
        .empty-state p {
          margin: 0;
        }
        .empty-hint {
          color: #888;
          font-size: 0.9rem;
          margin-top: 0.5rem !important;
        }
        .post-icon {
          margin-right: 0.5rem;
        }
        .back-link {
          margin-top: 2rem;
        }
      `}</style>
    </>
  );
}
