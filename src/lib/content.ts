import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content");

export type ContentType = "posts" | "notes";

export interface ContentMeta {
  slug: string;
  title: string;
  date: string;
  description?: string;
  private: boolean;
  tags?: string[];
}

export interface Content extends ContentMeta {
  content: string;
}

export function getContentList(
  type: ContentType,
  includePrivate: boolean = false
): ContentMeta[] {
  const dir = path.join(contentDirectory, type);

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const content = files
    .map((filename) => {
      const filePath = path.join(dir, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      return {
        slug: filename.replace(".mdx", ""),
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString(),
        description: data.description,
        private: data.private || false,
        tags: data.tags || [],
      } as ContentMeta;
    })
    .filter((item) => includePrivate || !item.private)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return content;
}

export function getContent(
  type: ContentType,
  slug: string
): Content | null {
  const filePath = path.join(contentDirectory, type, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || "Untitled",
    date: data.date || new Date().toISOString(),
    description: data.description,
    private: data.private || false,
    tags: data.tags || [],
    content,
  };
}
