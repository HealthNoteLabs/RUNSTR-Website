import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export interface ArticleMeta {
  slug: string;
  title: string;
  date: string; // ISO date string
  excerpt: string;
}

export interface Article extends ArticleMeta {
  content: string; // markdown body
}

function readArticleFile(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    date: data.date ? new Date(data.date).toISOString() : "",
    excerpt: String(data.excerpt ?? ""),
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllArticles(): ArticleMeta[] {
  return getAllSlugs()
    .map((slug) => readArticleFile(slug))
    .filter((a): a is Article => a !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1)) // newest first
    .map(({ content: _content, ...meta }) => meta);
}

export function getArticleBySlug(slug: string): Article | null {
  return readArticleFile(slug);
}
