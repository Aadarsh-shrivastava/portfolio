import type { MetadataRoute } from 'next'

import {
  getApps,
  getArticlePosts,
  getCaseStudyProjects,
  getPostSlug,
  getProjectSlug,
  loadPortfolioData,
} from '@/lib/portfolio'

export default function sitemap(): MetadataRoute.Sitemap {
  const { seo } = loadPortfolioData()
  const now = new Date()
  const base = seo.siteUrl

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/experience`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/projects`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/stack`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/apps`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/activity`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${base}/resume`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...getCaseStudyProjects().map((project) => ({
      url: `${base}/projects/${getProjectSlug(project)}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...getApps().map((app) => ({
      url: `${base}/apps/${app.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...getArticlePosts().map((post) => ({
      url: `${base}/blog/${getPostSlug(post)}`,
      lastModified: new Date(post.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ]
}
