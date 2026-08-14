import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { useReviews } from '@/hooks/useReviews';

// Renders filled/half/empty stars for a given rating
function StarDisplay({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const cls = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cls}
          style={{
            fill: star <= Math.round(rating) ? '#10b981' : 'transparent',
            stroke: star <= Math.round(rating) ? '#10b981' : 'hsl(var(--muted-foreground))',
          }}
        />
      ))}
    </div>
  );
}

// Relative time helper
function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString();
}

export function ReviewsSection() {
  const { reviews, loading, averageRating, totalReviews } = useReviews();

  // Only show reviews that have a comment
  const featuredReviews = reviews.filter((r) => r.comment.trim().length > 0).slice(0, 6);

  return (
    <section className="section-padding" id="reviews">
      <div className="container-tight">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-500 mb-4">
            Community
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            What Users Say
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            Real reviews from students and educators who've used Printify Notes.
          </p>
        </div>

        {/* Aggregate stats */}
        {!loading && totalReviews > 0 && (
          <div className="flex flex-col items-center gap-2 mb-10">
            <div className="text-5xl font-extrabold text-foreground tracking-tight">
              {averageRating.toFixed(1)}
            </div>
            <StarDisplay rating={averageRating} size="lg" />
            <p className="text-sm text-muted-foreground">
              Based on <span className="font-semibold text-foreground">{totalReviews}</span>{' '}
              {totalReviews === 1 ? 'review' : 'reviews'}
            </p>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5 animate-pulse">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((__, j) => (
                    <div key={j} className="w-4 h-4 rounded-full bg-secondary" />
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-secondary rounded w-full" />
                  <div className="h-3 bg-secondary rounded w-4/5" />
                  <div className="h-3 bg-secondary rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Review cards */}
        {!loading && featuredReviews.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredReviews.map((review) => (
              <div
                key={review.id}
                className="group rounded-xl border border-border bg-card p-5 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <StarDisplay rating={review.rating} />
                  <span className="text-xs text-muted-foreground">{timeAgo(review.createdAt)}</span>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed line-clamp-4">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Empty state — no reviews yet */}
        {!loading && totalReviews === 0 && (
          <div className="text-center py-12 rounded-xl border border-dashed border-border">
            <MessageSquare className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">No reviews yet.</p>
            <p className="text-muted-foreground/60 text-xs mt-1">
              Generate a PDF and be the first to review!
            </p>
          </div>
        )}

        {/* Empty comment state — reviews exist but none have comments */}
        {!loading && totalReviews > 0 && featuredReviews.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">
              {totalReviews} {totalReviews === 1 ? 'rating' : 'ratings'} received — no written reviews yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
