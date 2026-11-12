import fs from "fs"
import path from "path"
import HJSON from "hjson"

import { getPostSlug, getProjectSlug } from "@/lib/slug"

export { getPostSlug, getProjectSlug, slugify } from "@/lib/slug"

export interface ExperienceProject {
  name: string
  description: string
  technologies: string[]
  impact: string
  highlights: string[]
}

export interface Experience {
  id: string
  title: string
  company: string
  period: string
  location: string
  achievements: string[]
  technologies: string[]
  projects?: ExperienceProject[]
  type?: string
}

/**
 * Reference to an image or video. Keeping media behind a small type means the
 * placeholder sources can be swapped for real assets without touching markup.
 */
export interface MediaRef {
  src: string
  alt: string
  caption?: string
}

export interface KeyDecision {
  title: string
  body: string
}

export interface ResultMetric {
  label: string
  value: string
}

/**
 * Long-form case study content for a project. Every field is optional; a
 * project without a `caseStudy` simply has no detail page.
 */
export interface CaseStudy {
  tagline?: string
  timeline?: string
  hero?: MediaRef
  overview?: string[]
  problem?: string[]
  approach?: string[]
  design?: string[]
  engineering?: string[]
  keyDecisions?: KeyDecision[]
  results?: ResultMetric[]
  gallery?: MediaRef[]
  learnings?: string[]
}

export interface PersonalProject {
  title: string
  description: string
  technologies: string[]
  github?: string
  goesInResume?: boolean
  /** Optional explicit slug; derived from the title when absent. */
  slug?: string
  role?: string
  /** Surfaces this project in the homepage "Featured work" section. */
  featured?: boolean
  categories?: string[]
  image?: MediaRef
  caseStudy?: CaseStudy
}

export interface ArticleSection {
  id: string
  heading: string
  body: string[]
  media?: MediaRef[]
}

/** Long-form article content. Absent `article` means the post is external only. */
export interface Article {
  hero?: MediaRef
  readingTime?: string
  sections: ArticleSection[]
}

export interface BlogPost {
  title: string
  description: string
  date: string
  url: string
  tags?: string[]
  /** Optional explicit slug; derived from the title when absent. */
  slug?: string
  article?: Article
}

export type AppStatus = "Available" | "Coming soon" | "In development" | "Archived"

export interface App {
  slug: string
  name: string
  tagline: string
  description: string
  platform?: string
  status?: AppStatus
  featured?: boolean
  technologies?: string[]
  highlights?: string[]
  /** Store link. Absent means the Google Play CTA is not rendered. */
  playUrl?: string
  website?: string
  icon?: MediaRef
  image?: MediaRef
}

export interface Activity {
  github?: {
    placeholderContributions?: boolean
    contributionsLabel?: string
    /** null until the GitHub source is connected; the UI shows a dash. */
    totalContributions?: number | null
  }
  leetcode?: {
    username?: string | null
    totalSolved?: number | null
    easy?: number | null
    medium?: number | null
    hard?: number | null
    currentStreak?: number | null
    maxStreak?: number | null
  }
  learning?: Array<{ topic: string; description: string; stage?: string }>
  /** Short-form posts syndicated from social platforms (not long-form blog articles). */
  posts?: Array<{
    platform: string
    date: string
    text: string
    url: string
  }>
}

export interface PortfolioData {
  profile: {
    picture: string
    name: string
    title: string
    titleShort: string
    company: string
    location: string
    email: string
    linkedin: string
    github: string
    bio: string
    resume: string
    phone: string
  }
  seo: {
    siteUrl: string
    siteName: string
    locale: string
    locationCity: string
    locationCountryCode: string
    ogImage: string
    titleDefault: string
    titleTemplate: string
    description: string
    keywords: string[]
    twitterTitle: string
    twitterDescription: string
    homeTitle: string
    homeDescription: string
    homeCanonical: string
    whoIsHeading: string
    whoIsSummary: string
    hiringSummary: string
    knowsAbout: string[]
  }
  resumes: Array<{
    id: string
    title: string
    description: string
    filename: string
    skills: Array<{ name: string; category: string }>
  }>
  /** Shipped applications shown on /apps. Optional. */
  apps?: App[]
  /** Evidence content for /activity. Every figure is optional and may be null. */
  activity?: Activity
  /** Optional homepage content. Every list is optional; empty lists render nothing. */
  home?: {
    capabilities?: Array<{ title: string; description: string; href?: string }>
    testimonials?: Array<{ quote: string; name: string; role: string }>
  }
  /** Optional narrative content for /about; sections render only when present. */
  about?: {
    story?: string[]
    principles?: Array<{ title: string; body: string }>
  }
  experiences: Experience[]
  personalProjects: PersonalProject[]
  blogs: BlogPost[]
}

export function loadPortfolioData(): PortfolioData {
  const filePath = path.join(process.cwd(), "data", "portfolio.hjson")
  const file = fs.readFileSync(filePath, "utf8")
  return HJSON.parse(file) as PortfolioData
}

/** Projects that have case-study content and therefore a /projects/[slug] page. */
export function getCaseStudyProjects(): PersonalProject[] {
  return loadPortfolioData().personalProjects.filter((project) => Boolean(project.caseStudy))
}

export function getProjectBySlug(slug: string): PersonalProject | undefined {
  return loadPortfolioData().personalProjects.find(
    (project) => getProjectSlug(project) === slug
  )
}

/** Posts that have article content and therefore a /blog/[slug] page. */
export function getArticlePosts(): BlogPost[] {
  return loadPortfolioData().blogs.filter((post) => Boolean(post.article))
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return loadPortfolioData().blogs.find((post) => getPostSlug(post) === slug)
}

/** Projects shown on the homepage: flagged ones first, else the first entries. */
export function getFeaturedProjects(limit = 2): PersonalProject[] {
  const { personalProjects } = loadPortfolioData()
  const flagged = personalProjects.filter((project) => project.featured)
  return (flagged.length ? flagged : personalProjects).slice(0, limit)
}

export function getApps(): App[] {
  return loadPortfolioData().apps ?? []
}

export function getAppBySlug(slug: string): App | undefined {
  return getApps().find((app) => app.slug === slug)
}

/** The app given the landing-page treatment: flagged, else the first entry. */
export function getFeaturedApp(): App | undefined {
  const apps = getApps()
  return apps.find((app) => app.featured) ?? apps[0]
}
