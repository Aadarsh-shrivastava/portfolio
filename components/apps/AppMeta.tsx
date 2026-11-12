import Badge from "@/components/primitives/Badge"
import type { App } from "@/lib/portfolio"

interface AppMetaProps {
  app: App
}

/** Platform, status and stack as one quiet line of metadata. */
export default function AppMeta({ app }: AppMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      {app.platform && <span className="type-eyebrow text-text-muted">{app.platform}</span>}

      {app.status && (
        <span className="type-eyebrow flex items-center gap-2 text-text-muted">
          <span
            aria-hidden="true"
            className={
              app.status === "Available"
                ? "h-1.5 w-1.5 rounded-full bg-accent"
                : "h-1.5 w-1.5 rounded-full bg-white/25"
            }
          />
          {app.status}
        </span>
      )}

      {app.technologies?.length ? (
        <span className="flex flex-wrap gap-2">
          {app.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </span>
      ) : null}
    </div>
  )
}
