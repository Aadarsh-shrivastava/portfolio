/**
 * Slug helpers live apart from lib/portfolio.ts because that module reads the
 * filesystem — importing it from a client component pulls `fs` into the bundle.
 * These take the minimal shape they need so both sides can use them.
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function getProjectSlug(project: { slug?: string; title: string }): string {
  return project.slug ?? slugify(project.title)
}

export function getPostSlug(post: { slug?: string; title: string }): string {
  return post.slug ?? slugify(post.title)
}
