import { redirect } from "next/navigation"

import { loadPortfolioData } from "@/lib/portfolio"

export default function GitHubRedirect() {
  const { profile } = loadPortfolioData()
  redirect(profile.github)
}
