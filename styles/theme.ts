/**
 * TypeScript mirror of the design tokens defined in styles/globals.css.
 *
 * globals.css (@theme) is the single source of truth — Tailwind generates all
 * utilities from it. This file exists only so TS/JS can read a token value or
 * compose a shared class string. Keep the two in sync; never add a visual value
 * here that does not exist as a CSS variable.
 */
export const tokens = {
  font: {
    display: "var(--font-display)",
    text: "var(--font-text)",
    mono: "var(--font-mono)",
  },
  color: {
    background: "var(--color-background)",
    backgroundSubtle: "var(--color-background-subtle)",
    surface: "var(--color-surface)",
    surfaceElevated: "var(--color-surface-elevated)",
    surfaceHover: "var(--color-surface-hover)",
    textPrimary: "var(--color-text-primary)",
    textSecondary: "var(--color-text-secondary)",
    textMuted: "var(--color-text-muted)",
    textDisabled: "var(--color-text-disabled)",
    borderSubtle: "var(--color-border-subtle)",
    borderDefault: "var(--color-border-default)",
    borderStrong: "var(--color-border-strong)",
    accent: "var(--color-accent)",
    accentStrong: "var(--color-accent-strong)",
    accentSubtle: "var(--color-accent-subtle)",
  },
  radius: {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)",
  },
  container: {
    page: "var(--container-page)",
    prose: "var(--container-prose)",
  },
  duration: {
    fast: "var(--duration-fast)",
    normal: "var(--duration-normal)",
    slow: "var(--duration-slow)",
  },
  easing: {
    standard: "var(--ease-standard)",
    outSoft: "var(--ease-out-soft)",
  },
  shadow: {
    subtle: "var(--shadow-subtle)",
    raised: "var(--shadow-raised)",
    overlay: "var(--shadow-overlay)",
  },
  glow: {
    subtle: "var(--glow-subtle)",
    default: "var(--glow-default)",
    strong: "var(--glow-strong)",
  },
} as const;

export type Tokens = typeof tokens;

/** Typography levels. Use these instead of per-component font utilities. */
export const type = {
  display: "type-display",
  h1: "type-h1",
  h2: "type-h2",
  h3: "type-h3",
  bodyLarge: "type-body-lg",
  body: "type-body",
  small: "type-small",
  eyebrow: "type-eyebrow",
  nav: "type-nav",
  button: "type-button",
} as const;

/**
 * Shared class strings for recurring UI patterns. Components compose these
 * rather than restating border/surface/transition values.
 */
export const ui = {
  /** Card surface: separated by tone and spacing, border is a quiet cue only. */
  card: "border-gradient  bg-surface/15 rounded-lg  transition-standard ",
  cardPadding: "p-6 sm:p-8",

  /** Small mono label chip, e.g. a technology tag. */
  chip: "border-gradient type-eyebrow text-text-muted bg-white/[0.04] rounded-sm px-2.5 py-1",

  /** Section heading pieces. */
  sectionTitle: "type-h2 text-text-primary",
  sectionLabel: "type-eyebrow text-text-muted",
  sectionDivider: "rule flex-1",

  /** Body copy defaults. */
  prose: "type-body text-text-secondary",
  proseLarge: "type-body-lg text-text-secondary",

  /** Focus ring for custom interactive elements (global :focus-visible covers the rest). */
  focusRing:
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
} as const;

/** Button system: one geometry, three intents. */
export const buttonBase =
  "type-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm border transition-standard disabled:pointer-events-none disabled:opacity-45";

export const buttonVariant = {
  primary: "border-transparent bg-text-primary text-background hover:bg-white",
  secondary:
    "border-border-default bg-white/[0.04] text-text-primary hover:border-border-strong hover:bg-surface-hover",
  ghost:
    "border-transparent bg-transparent text-text-secondary hover:text-text-primary",
} as const;

export const buttonSize = {
  sm: "h-9 px-4",
  md: "h-11 px-5",
  lg: "h-12 px-6",
  icon: "h-10 w-10 p-0",
} as const;

/** Text link: restrained color shift, no underline noise. */
export const linkBase =
  "inline-flex items-center gap-1.5 text-text-primary transition-standard hover:text-accent";
