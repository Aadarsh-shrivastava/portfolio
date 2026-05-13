import { redirect } from "next/navigation"

import { loadPortfolioData } from "@/lib/portfolio"

export default function ResumeRedirect() {
  const { profile } = loadPortfolioData()
  redirect(profile.resume)
}
