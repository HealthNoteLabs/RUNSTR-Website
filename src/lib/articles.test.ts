import { describe, it, expect } from "vitest";
import { getAllArticles, getArticleBySlug, getAllSlugs } from "./articles";

describe("articles loader", () => {
  it("loads the first article from frontmatter", () => {
    const a = getArticleBySlug("work-hard-last-longer");
    expect(a?.title).toBe("Work Hard, Last Longer");
    expect(a?.excerpt.length).toBeGreaterThan(0);
    expect(a?.content).toContain("Work hard, last longer.");
  });
  it("returns null for unknown slug", () => {
    expect(getArticleBySlug("does-not-exist")).toBeNull();
  });
  it("includes the article in the full list", () => {
    expect(getAllSlugs()).toContain("work-hard-last-longer");
    expect(getAllArticles().some((a) => a.slug === "work-hard-last-longer")).toBe(true);
  });
});
