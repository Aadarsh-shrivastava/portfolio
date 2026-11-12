import Media from "@/components/Media"
import type { BlogPost, MediaRef } from "@/lib/portfolio"

interface ArticleHeaderProps {
  post: BlogPost
  visual?: MediaRef
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default function ArticleHeader({ post, visual }: ArticleHeaderProps) {
  return (
    <header className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-6 text-center">
        <p className="type-small flex flex-wrap items-center justify-center gap-3 text-text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.article?.readingTime && (
            <>
              <span aria-hidden="true">·</span>
              <span>{post.article.readingTime}</span>
            </>
          )}
        </p>

        <h1 className="type-h1 max-w-[20ch] text-balance text-text-primary">{post.title}</h1>

        <p className="type-body-lg max-w-[52ch] text-balance text-text-secondary">
          {post.description}
        </p>
      </div>

      <Media
        media={post.article?.hero ?? visual}
        ratio="wide"
        fade="frame"
        glow="subtle"
        frame={false}
        priority
        className="mt-4"
      />
    </header>
  )
}
