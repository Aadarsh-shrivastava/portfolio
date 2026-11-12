import SpriteMedia from "@/components/SpriteMedia";
import TextLink from "@/components/primitives/TextLink";
import { cn } from "@/lib/utils";
import { ui } from "@/styles/theme";
import type { MediaRef } from "@/lib/portfolio";

interface Principle {
  title: string;
  body: string;
}

interface PrinciplesProps {
  principles?: Principle[];
  eyebrow?: string;
  title?: string;
  intro?: string;
  /** Supporting copy set opposite the title, as in the reference composition. */
  aside?: string;
  action?: { href: string; label: string };
  /** 2x2 image sheet: each card shows one quadrant. */
  visual?: MediaRef;
}

/**
 * Principles as numbered cards with a visual beneath the copy. Shared by the
 * homepage and /about.
 */
export default function Principles({
  principles,
  eyebrow = "Principles",
  title = "How I work",
  intro,
  aside,
  action,
  visual,
}: PrinciplesProps) {
  if (!principles?.length) return null;

  return (
    <div className="flex flex-col gap-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-5">
          <p className="type-eyebrow text-text-muted">{eyebrow}</p>
          <h2 className="type-h2 max-w-[12ch] text-balance text-text-primary">
            {title}
          </h2>
          {intro && (
            <p className="type-body max-w-[42ch] text-text-secondary">
              {intro}
            </p>
          )}
        </div>

        {(aside || action) && (
          <div className="flex flex-col gap-6 lg:pt-10">
            {aside && (
              <p className="type-body-lg max-w-[42ch] text-text-secondary">
                {aside}
              </p>
            )}
            {action && (
              <TextLink href={action.href} withArrow>
                {action.label}
              </TextLink>
            )}
          </div>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((principle, index) => (
          <article
            key={principle.title}
            className={cn(
              ui.card,
              "group flex min-h-[25rem] flex-col overflow-hidden",
            )}
          >
            <div className="flex flex-col gap-3 px-6 pt-6">
              <span className="type-eyebrow text-text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="type-h3 text-text-primary">{principle.title}</h3>

              <p className="type-body text-text-secondary">{principle.body}</p>
            </div>

            {/* Artwork floats in the lower half of the card: contained, centred,
                no overlay — the quadrant is already black at the edges. */}
            <div className="mt-auto flex items-center justify-center px-5 pb-7 pt-10">
              <SpriteMedia
                media={visual}
                columns={2}
                rows={2}
                column={index % 2}
                row={Math.floor(index / 2) % 2}
                className="opacity-90 transition-standard group-hover:opacity-100"
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
