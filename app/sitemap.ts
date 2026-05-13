import type { MetadataRoute } from 'next'

import { loadPortfolioData } from '@/lib/portfolio'

export default function sitemap(): MetadataRoute.Sitemap {
  const { seo } = loadPortfolioData()
  const now = new Date()

  return [
    {
      url: `${seo.siteUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${seo.siteUrl}/resume`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
