import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const getAll = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject;

    const posts = await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    // Filter by user if authenticated, otherwise return all (for dev)
    if (userId) {
      return posts.filter((p) => p.userId === userId);
    }
    return posts;
  },
});

export const getPublished = query({
  handler: async (ctx) => {
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_published", (q) =>
        q.eq("isPublished", true).eq("isArchived", false)
      )
      .order("desc")
      .collect();

    return posts;
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .collect();

    const post = posts[0];
    if (!post) return null;

    if (post.isPublished && !post.isArchived) {
      return post;
    }

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    if (post.userId !== identity.subject) return null;

    return post;
  },
});

export const getById = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);
    if (!post) {
      throw new Error("Not found");
    }

    // Allow access if published or in dev mode (no auth configured)
    if (post.isPublished && !post.isArchived) {
      return post;
    }

    const identity = await ctx.auth.getUserIdentity();
    
    // Allow in dev mode when no auth is configured
    if (!identity) {
      return post;
    }

    if (post.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    return post;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    parentPost: v.optional(v.id("posts")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject || "dev-user";
    const now = Date.now();

    const post = await ctx.db.insert("posts", {
      title: args.title,
      parentPost: args.parentPost,
      userId,
      userEmail: identity?.email,
      isArchived: false,
      isPublished: false,
      createdAt: now,
      updatedAt: now,
    });

    return post;
  },
});

export const update = mutation({
  args: {
    id: v.id("posts"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
    slug: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject || "dev-user";
    const { id, ...rest } = args;

    const existingPost = await ctx.db.get(id);
    if (!existingPost) {
      throw new Error("Not Found");
    }

    // Skip auth check in dev mode (no identity)
    if (identity && existingPost.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const post = await ctx.db.patch(id, {
      ...rest,
      updatedAt: Date.now(),
    });

    return post;
  },
});

export const archive = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not Authenticated");
    }

    const userId = identity.subject;
    const existingPost = await ctx.db.get(args.id);

    if (!existingPost) {
      throw new Error("Not found");
    }

    if (existingPost.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const recursiveArchive = async (postId: Id<"posts">) => {
      const children = await ctx.db
        .query("posts")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentPost", postId)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, { isArchived: true });
        await recursiveArchive(child._id);
      }
    };

    const post = await ctx.db.patch(args.id, {
      isArchived: true,
      updatedAt: Date.now(),
    });

    await recursiveArchive(args.id);

    return post;
  },
});

export const restore = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;
    const existingPost = await ctx.db.get(args.id);

    if (!existingPost) {
      throw new Error("Not found");
    }

    if (existingPost.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const recursiveRestore = async (postId: Id<"posts">) => {
      const children = await ctx.db
        .query("posts")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentPost", postId)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, { isArchived: false });
        await recursiveRestore(child._id);
      }
    };

    const options: Partial<Doc<"posts">> = {
      isArchived: false,
      updatedAt: Date.now(),
    };

    if (existingPost.parentPost) {
      const parent = await ctx.db.get(existingPost.parentPost);
      if (parent?.isArchived) {
        options.parentPost = undefined;
      }
    }

    const post = await ctx.db.patch(args.id, options);
    await recursiveRestore(args.id);

    return post;
  },
});

export const remove = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not Authenticated");
    }

    const userId = identity.subject;
    const existingPost = await ctx.db.get(args.id);

    if (!existingPost) {
      throw new Error("Not found");
    }

    if (existingPost.userId !== userId) {
      throw new Error("Unauthorized");
    }

    await ctx.db.delete(args.id);
    return args.id;
  },
});

export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not Authenticated");
    }

    const userId = identity.subject;
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return posts;
  },
});

export const removeIcon = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not Authenticated");
    }

    const userId = identity.subject;
    const existingPost = await ctx.db.get(args.id);

    if (!existingPost) {
      throw new Error("Not found");
    }

    if (existingPost.userId !== userId) {
      throw new Error("Unauthorized");
    }

    await ctx.db.patch(args.id, {
      icon: undefined,
      updatedAt: Date.now(),
    });
  },
});

export const removeCoverImage = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not Authenticated");
    }

    const userId = identity.subject;
    const existingPost = await ctx.db.get(args.id);

    if (!existingPost) {
      throw new Error("Not found");
    }

    if (existingPost.userId !== userId) {
      throw new Error("Unauthorized");
    }

    await ctx.db.patch(args.id, {
      coverImage: undefined,
      updatedAt: Date.now(),
    });
  },
});

export const seedPost = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    slug: v.string(),
    icon: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const postId = await ctx.db.insert("posts", {
      title: args.title,
      content: args.content,
      slug: args.slug,
      icon: args.icon,
      excerpt: args.excerpt,
      tags: args.tags,
      userId: "dev-user",
      isArchived: false,
      isPublished: true,
      createdAt: now,
      updatedAt: now,
    });
    return postId;
  },
});
