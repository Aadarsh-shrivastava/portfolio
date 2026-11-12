import Media from "@/components/Media";
import PageSection from "@/components/PageSection";
import TextLink from "@/components/primitives/TextLink";
import {
  getProjectVisualBySlug,
  WRITING_STREAM_PROJECT_SLUGS,
} from "@/lib/project-visual";
import { cn } from "@/lib/utils";
import { ui } from "@/styles/theme";
import type { Activity } from "@/lib/portfolio";

interface WritingStreamProps {
  posts?: Activity["posts"];
}

function formatDate(date: string) {
  return new Date(date)
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    .toUpperCase();
}

/** Social post stream — three most recent updates with project visuals. */
export default function WritingStream({ posts }: WritingStreamProps) {
  if (!posts?.length) return null;

  const recent = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <PageSection spacing="loose" ariaLabel="Social posts">
      <div className="flex flex-col gap-6">
        <p className="type-eyebrow text-text-muted">Posts</p>
        <h2 className="type-h2 max-w-[12ch] text-balance text-text-primary">
          Notes in public.
        </h2>
        <p className="type-body max-w-[36ch] text-text-secondary">
          Short updates from social — ideas as they land, not polished
          articles.
        </p>
      </div>

      <ul className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recent.map((post, index) => {
          const slug = WRITING_STREAM_PROJECT_SLUGS[index];
          const visual = slug
            ? getProjectVisualBySlug(slug, "Project interface preview")
            : undefined;

          return (
            <li key={`${post.platform}-${post.date}`}>
              <article
                className={cn(
                  ui.card,
                  "group flex h-full flex-col overflow-hidden p-0",
                )}
              >
                <Media
                  media={visual}
                  ratio="video"
                  fade="none"
                  frame={false}
                  className="opacity-90 transition-standard group-hover:opacity-100"
                />

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="type-eyebrow text-text-muted">
                      {post.platform}
                    </span>
                    <time
                      dateTime={post.date}
                      className="type-small text-text-disabled"
                    >
                      {formatDate(post.date)}
                    </time>
                  </div>

                  <p className="type-body line-clamp-4 text-text-secondary">
                    {post.text}
                  </p>

                  <TextLink
                    href={post.url}
                    external
                    withArrow
                    className="mt-auto pt-2"
                  >
                    View post
                  </TextLink>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </PageSection>
  );
}
