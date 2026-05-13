import fs from "fs"
import path from "path"
import HJSON from "hjson"

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

export interface PersonalProject {
  title: string
  description: string
  technologies: string[]
  github?: string
  goesInResume?: boolean
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
  experiences: Experience[]
  personalProjects: PersonalProject[]
}

export function loadPortfolioData(): PortfolioData {
  const filePath = path.join(process.cwd(), "data", "portfolio.hjson")
  const file = fs.readFileSync(filePath, "utf8")
  return HJSON.parse(file) as PortfolioData
}
