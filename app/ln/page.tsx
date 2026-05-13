import { redirect } from "next/navigation"

import { loadPortfolioData } from "@/lib/portfolio"

export default function LinkedInRedirect() {
  const { profile } = loadPortfolioData()
  redirect(profile.linkedin)
}
