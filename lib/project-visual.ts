import type { MediaRef, PersonalProject } from "@/lib/portfolio";
import { getProjectSlug } from "@/lib/slug";

/**
 * Per-project screenshots. Paths match `lib/media.ts` ASSETS; no fs here so
 * client components (e.g. FeaturedWork) can resolve visuals safely.
 */
const PROJECT_IMAGE_BY_SLUG: Record<string, string> = {
  "snap-db": "/assets/Snap db.png",
  aceflow: "/assets/Aceflow.png",
  "real-time-event-processing": "/assets/Event rail.png",
  "scalable-notification-system": "/assets/flyer-main.png",
};

const PLACEHOLDER_SRC = "/assets/placeholder.png";

/** Project visuals for the activity writing stream (newest post → oldest). */
export const WRITING_STREAM_PROJECT_SLUGS = [
  "snap-db",
  "aceflow",
  "real-time-event-processing",
] as const;

export function getProjectVisual(project: PersonalProject): MediaRef {
  if (project.image) return project.image;
  if (project.caseStudy?.hero) return project.caseStudy.hero;

  const slug = getProjectSlug(project);
  const relative = PROJECT_IMAGE_BY_SLUG[slug] ?? PLACEHOLDER_SRC;

  return {
    src: encodeURI(relative),
    alt: `${project.title} interface preview`,
  };
}

export function getProjectVisualBySlug(slug: string, alt: string): MediaRef {
  const relative = PROJECT_IMAGE_BY_SLUG[slug] ?? PLACEHOLDER_SRC;
  return { src: encodeURI(relative), alt };
}
