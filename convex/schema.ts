import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    userId: v.string(),
    userEmail: v.optional(v.string()),
    isArchived: v.boolean(),
    parentPost: v.optional(v.id("posts")),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.boolean(),
    slug: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentPost"])
    .index("by_slug", ["slug"])
    .index("by_published", ["isPublished", "isArchived"]),
});
