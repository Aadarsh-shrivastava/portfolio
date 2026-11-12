import fs from "fs";
import path from "path";

import type { MediaRef } from "@/lib/portfolio";

/**
 * Registry of the real image assets. Paths are resolved at build time so a
 * missing file degrades to Media's neutral placeholder frame rather than a
 * broken image. Filenames are kept exactly as they are on disk.
 */
const ASSETS = {
  hero: "/assets/hero section.png",
  workHero: "/assets/work-hero.png",
  blogHero: "/assets/blogs-hero.png",
  appsHero: "/assets/apps-hero.png",
  activityHero: "/assets/activity-hero.png",
  /** Wide band shown just above the footer on every page. */
  footer: "/assets/footer-image.png",
  about: "/assets/about-me.png",
  /** 2x2 sheet: one quadrant per principle. */
  principles: "/assets/principle quadrant image.png",
  /** 2x2 sheet: one quadrant per tech-stack panel. */
  techstack: "/assets/techstack.png",
  /** Generic product visual, used where no dedicated asset exists yet. */
  placeholder: "/assets/placeholder.png",
  /** Social-style post card for the activity writing stream. */
  postPlaceholder: "/assets/post-placeholder.png",
  snapDb: "/assets/Snap db.png",
  aceflow: "/assets/Aceflow.png",
  eventRail: "/assets/Event rail.png",
  flyer: "/assets/flyer-main.png",
  /** Thread composer UI; home contact surface until the live form ships. */
  interactiveThread: "/assets/Interactive-thread-placeholder.png",
} as const;

export type AssetKey = keyof typeof ASSETS;

export function getAsset(key: AssetKey, alt: string): MediaRef | undefined {
  const relative = ASSETS[key];
  const absolute = path.join(process.cwd(), "public", relative);

  if (!fs.existsSync(absolute)) return undefined;

  // Encoded so filenames containing spaces resolve as URLs.
  return { src: encodeURI(relative), alt };
}

export function getPlaceholderVisual(alt: string): MediaRef | undefined {
  return getAsset("placeholder", alt);
}
