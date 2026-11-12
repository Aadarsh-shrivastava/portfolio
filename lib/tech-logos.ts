/**
 * Brand marks are pulled from the Simple Icons CDN, which serves a single-colour
 * SVG per slug. Only verified slugs are listed; anything absent (AWS, and the
 * concept entries like "Caching") falls back to a monogram tile.
 */
const SLUGS: Record<string, string> = {
  Go: "go",
  TypeScript: "typescript",
  JavaScript: "javascript",
  Python: "python",
  Java: "openjdk",
  "Node.js": "nodedotjs",
  Express: "express",
  FastAPI: "fastapi",
  WebSockets: "socketdotio",
  React: "react",
  "React Native": "react",
  "Next.js": "nextdotjs",
  PostgreSQL: "postgresql",
  Redis: "redis",
  MongoDB: "mongodb",
  MySQL: "mysql",
  "CI/CD": "githubactions",
  OpenTelemetry: "opentelemetry",
  Docker: "docker",
  Grafana: "grafana",
}

/** Monochrome so the logos read as one set rather than a colour collage. */
const LOGO_COLOR = "d6d8dc"

export function getTechLogo(name: string): string | undefined {
  const slug = SLUGS[name]
  return slug ? `https://cdn.simpleicons.org/${slug}/${LOGO_COLOR}` : undefined
}
