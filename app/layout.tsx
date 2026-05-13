import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'

import { loadPortfolioData } from '@/lib/portfolio'

export async function generateMetadata(): Promise<Metadata> {
  const { profile, seo } = loadPortfolioData()

  return {
    metadataBase: new URL(seo.siteUrl),
    title: {
      default: seo.titleDefault,
      template: seo.titleTemplate,
    },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: profile.name, url: seo.siteUrl }],
    creator: profile.name,
    publisher: profile.name,
    alternates: {
      canonical: seo.siteUrl,
    },
    openGraph: {
      type: 'website',
      url: seo.siteUrl,
      title: seo.titleDefault,
      description: seo.description,
      siteName: seo.siteName,
      images: [
        {
          url: seo.ogImage,
          width: 1200,
          height: 630,
          alt: `${profile.name} - ${profile.title}`,
        },
      ],
      locale: seo.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.twitterTitle,
      description: seo.twitterDescription,
      images: [seo.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    category: 'technology',
  }
}

const jbm = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleAnalytics gaId="G-XHBC2B7TVE" />
      <body className={jbm.className}>{children}</body>
    </html>
  )
}
