import type { Metadata } from "next";

import ActivityHero from "@/components/activity/ActivityHero";
import GithubPanel from "@/components/activity/GithubPanel";
import LearningList from "@/components/activity/LearningList";
import LeetcodePanel from "@/components/activity/LeetcodePanel";
import PageShell from "@/components/PageShell";
import WritingStream from "@/components/activity/WritingStream";
import { getAsset } from "@/lib/media";
import { loadPortfolioData } from "@/lib/portfolio";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, profile } = loadPortfolioData();

  return {
    title: "Activity",
    description: `What ${profile.name} is currently building, learning, and exploring.`,
    alternates: {
      canonical: `${seo.siteUrl}/activity`,
    },
  };
}

export default function ActivityPage() {
  const { profile, activity, personalProjects } = loadPortfolioData();
  const visual = getAsset("activityHero", "Activity visual");
  const repositories = personalProjects
    .filter((project) => project.github)
    .slice(0, 3);

  return (
    <PageShell>
      <ActivityHero profile={profile} visual={visual} />

      <GithubPanel
        github={activity?.github}
        profileUrl={profile.github}
        repositories={repositories}
      />

      <LeetcodePanel leetcode={activity?.leetcode} />

      <WritingStream posts={activity?.posts} />

      <LearningList learning={activity?.learning} />
    </PageShell>
  );
}
