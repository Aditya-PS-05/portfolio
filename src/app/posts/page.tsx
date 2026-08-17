"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import HeaderClient from "@/components/HeaderClient";
import Link from "next/link";
import { useConvexAvailable } from "@/components/providers/convex-provider";

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function ConvexPostsList() {
  const posts = useQuery(api.posts.getPublished);

  if (posts === undefined) {
    return <p className="loading">Loading…</p>;
  }

  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <p>No posts yet.</p>
      </div>
    );
  }

  return (
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
  );
}

export default function PostsPage() {
  const convexAvailable = useConvexAvailable();

  return (
    <>
      <HeaderClient />
      <hr />
      <main className="page">
        <div style={{ padding: "3rem 0 1.5rem" }}>
          <h1 className="posts-heading">Posts</h1>
        </div>

        {convexAvailable ? (
          <ConvexPostsList />
        ) : (
          <div className="empty-state">
            <p>No posts yet.</p>
          </div>
        )}
      </main>
    </>
  );
}
