import type { MetadataRoute } from 'next'

import { loadPortfolioData } from '@/lib/portfolio'

export default function robots(): MetadataRoute.Robots {
  const { seo } = loadPortfolioData()

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${seo.siteUrl}/sitemap.xml`,
    host: seo.siteUrl,
  }
}
