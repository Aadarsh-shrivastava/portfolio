import Link from "next/link"
import { ArrowRight } from "lucide-react"

import Media from "@/components/Media"
import TextLink from "@/components/primitives/TextLink"
import { cn } from "@/lib/utils"
import { ui } from "@/styles/theme"
import { getPostSlug } from "@/lib/slug"
import type { BlogPost, MediaRef } from "@/lib/portfolio"

interface RelatedArticlesProps {
  posts: BlogPost[]
  visual?: MediaRef
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default function RelatedArticles({ posts, visual }: RelatedArticlesProps) {
  if (!posts.length) return null

  return (
    <section className="flex flex-col gap-10" aria-labelledby="related-heading">
      <div className="flex items-center justify-between gap-6">
        <h2 id="related-heading" className="type-h3 text-text-primary">
          More articles
        </h2>
        <TextLink href="/blog" withArrow>
          View all
        </TextLink>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const href = post.article ? `/blog/${getPostSlug(post)}` : post.url
          const isExternal = !post.article

          const inner = (
            <>
              <Media media={visual} ratio="video" frame={false} />

              <div className="flex flex-1 items-end justify-between gap-4 p-6">
                <div className="flex min-w-0 flex-col gap-2">
                  <time dateTime={post.date} className="type-small text-text-muted">
                    {formatDate(post.date)}
                  </time>
                  <h3 className="type-body text-text-primary">{post.title}</h3>
                </div>

                <span className="border-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 text-text-muted transition-standard group-hover:text-text-primary"
                  />
                </span>
              </div>
            </>
          )

          const className = cn(ui.card, "group flex flex-col overflow-hidden p-0")

          return isExternal ? (
            <a
              key={post.title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {inner}
            </a>
          ) : (
            <Link key={post.title} href={href} className={className}>
              {inner}
            </Link>
          )
        })}
      </div>
    </section>
  )
}
