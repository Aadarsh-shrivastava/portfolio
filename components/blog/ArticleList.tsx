import Link from "next/link"

import Media from "@/components/Media"
import TextLink from "@/components/primitives/TextLink"
import { getPostSlug } from "@/lib/slug"
import type { BlogPost, MediaRef } from "@/lib/portfolio"

interface ArticleListProps {
  posts: BlogPost[]
  visual?: MediaRef
}

function formatDate(date: string) {
  return new Date(date)
    .toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    .toUpperCase()
}

/**
 * Index rows: copy on the left, a visual bleeding off the right. Rows are
 * separated by gradient hairlines rather than wrapped in cards.
 */
export default function ArticleList({ posts, visual }: ArticleListProps) {
  if (!posts.length) {
    return (
      <p className="type-body max-w-xl text-text-secondary">
        Writing is in progress. Check back soon.
      </p>
    )
  }

  return (
    <div className="flex flex-col">
      {posts.map((post) => {
        const href = post.article ? `/blog/${getPostSlug(post)}` : post.url
        const isExternal = !post.article

        return (
          <article key={post.title} className="border-top-gradient group relative">
            <div className="grid items-center gap-8 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:py-20">
              <div className="flex flex-col gap-4">
                <time dateTime={post.date} className="type-eyebrow text-text-muted">
                  {formatDate(post.date)}
                </time>

                <h2 className="type-h3 max-w-[22ch] text-balance text-text-primary transition-standard group-hover:text-accent">
                  {isExternal ? (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {post.title}
                    </a>
                  ) : (
                    // Stretched link: the whole row is the hit area.
                    <Link href={href} className="after:absolute after:inset-0">
                      {post.title}
                    </Link>
                  )}
                </h2>

                <p className="type-body max-w-[46ch] text-text-secondary">{post.description}</p>

                <span className="pt-2">
                  <TextLink href={href} external={isExternal} withArrow>
                    Read article
                  </TextLink>
                </span>
              </div>

              <Media
                media={visual}
                ratio="video"
                fade="frame"
                frame={false}
                className="opacity-80 transition-standard group-hover:opacity-100"
              />
            </div>
          </article>
        )
      })}
    </div>
  )
}
