"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import HeaderClient from "@/components/HeaderClient";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import PostToolbar from "@/components/PostToolbar";

const NotionEditor = dynamic(() => import("@/components/NotionEditor"), {
  ssr: false,
  loading: () => <div className="editor-loading">Loading editor...</div>,
});

export default function PostEditorPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.postId as Id<"posts">;

  const post = useQuery(api.posts.getById, { postId });
  const updatePost = useMutation(api.posts.update);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [icon, setIcon] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (post && !isInitialized) {
      setTitle(post.title);
      setContent(post.content || "");
      setIcon(post.icon || "");
      setCoverImage(post.coverImage || "");
      setIsPublished(post.isPublished);
      setIsInitialized(true);
    }
  }, [post, isInitialized]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updatePost({
        id: postId,
        title: title || "Untitled",
        content,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
        icon: icon || undefined,
        coverImage: coverImage || undefined,
        isPublished,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleIconChange = (newIcon: string) => {
    setIcon(newIcon);
  };

  const handleCoverImageChange = (newCoverImage: string) => {
    setCoverImage(newCoverImage);
  };

  const initialContent = useMemo(() => {
    if (!content) return undefined;
    try {
      JSON.parse(content);
      return content;
    } catch {
      return undefined;
    }
  }, [content]);

  if (post === undefined) {
    return (
      <>
        <HeaderClient />
        <hr />
        <main className="post-editor-page">
          <div className="loading-state">Loading...</div>
        </main>
      </>
    );
  }

  if (post === null) {
    return (
      <>
        <HeaderClient />
        <hr />
        <main className="post-editor-page">
          <div className="error-state">Post not found</div>
        </main>
      </>
    );
  }

  return (
    <>
      <HeaderClient />
      <hr />
      <main className="post-editor-page">
        <div className="editor-controls">
          <button onClick={() => router.push("/editor/posts")} className="back-btn">
            ← Back
          </button>
          <div className="editor-actions">
            <label className="publish-toggle">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
              />
              <span>Published</span>
            </label>
            <button onClick={handleSave} disabled={isSaving} className="save-btn">
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        <div className="editor-container">
          <PostToolbar
            title={title}
            icon={icon}
            coverImage={coverImage}
            onTitleChange={handleTitleChange}
            onIconChange={handleIconChange}
            onCoverImageChange={handleCoverImageChange}
            editable={true}
          />
          
          <div className="notion-editor-wrapper">
            {isInitialized && (
              <NotionEditor
                onChange={handleContentChange}
                initialContent={initialContent}
                editable={true}
              />
            )}
          </div>
        </div>
      </main>

      <style jsx>{`
        .post-editor-page {
          max-width: 900px;
          margin: 0 auto;
          padding-bottom: 4rem;
        }
        .editor-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding: 0.5rem 0;
        }
        .back-btn {
          padding: 0.5rem 1rem;
          background: transparent;
          border: 1px solid #ddd;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background 0.2s;
        }
        .back-btn:hover {
          background: #f5f5f5;
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
          cursor: pointer;
          font-size: 0.9rem;
          color: #555;
        }
        .publish-toggle input {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
        .save-btn {
          padding: 0.5rem 1.25rem;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: background 0.2s;
        }
        .save-btn:hover {
          background: #0060df;
        }
        .save-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .editor-container {
          background: #fff;
          border-radius: 8px;
          min-height: 500px;
        }
        .notion-editor-wrapper {
          padding: 0 54px;
          min-height: 300px;
        }
        .loading-state,
        .error-state {
          text-align: center;
          padding: 3rem;
          color: #666;
        }
        :global(.editor-loading) {
          padding: 2rem;
          text-align: center;
          color: #999;
        }
      `}</style>
    </>
  );
}
