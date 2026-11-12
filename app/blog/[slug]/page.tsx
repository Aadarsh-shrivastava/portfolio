import type { Metadata } from "next"
import { notFound } from "next/navigation"

import ArticleBody from "@/components/blog/ArticleBody"
import ArticleHeader from "@/components/blog/ArticleHeader"
import ArticleToc from "@/components/blog/ArticleToc"
import RelatedArticles from "@/components/blog/RelatedArticles"
import PageSection from "@/components/PageSection"
import PageShell from "@/components/PageShell"
import { getPlaceholderVisual } from "@/lib/media"
import { getArticlePosts, getPostBySlug, loadPortfolioData } from "@/lib/portfolio"
import { getPostSlug } from "@/lib/slug"

interface ArticlePageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return getArticlePosts().map((post) => ({ slug: getPostSlug(post) }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { seo } = loadPortfolioData()
  const post = getPostBySlug(params.slug)

  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${seo.siteUrl}/blog/${params.slug}`,
    },
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const post = getPostBySlug(params.slug)

  if (!post?.article) notFound()

  const { blogs } = loadPortfolioData()
  const visual = getPlaceholderVisual("Article illustration")
  const related = blogs.filter((candidate) => getPostSlug(candidate) !== params.slug).slice(0, 3)

  return (
    <PageShell>
      <PageSection first spacing="tight" as="article" ariaLabel={post.title}>
        <ArticleHeader post={post} visual={visual} />

        <div className="mt-24 grid gap-12 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-20">
          <aside className="lg:sticky lg:top-[calc(var(--nav-height)+var(--space-32))] lg:self-start">
            <ArticleToc sections={post.article.sections} />
          </aside>

          <div className="min-w-0 max-w-[46rem]">
            <ArticleBody sections={post.article.sections} />
          </div>
        </div>
      </PageSection>

      <PageSection spacing="default" ariaLabel="More articles">
        <RelatedArticles posts={related} visual={visual} />
      </PageSection>
    </PageShell>
  )
}
