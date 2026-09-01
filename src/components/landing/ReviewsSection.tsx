import React, { useState } from 'react';
import { Star, MessageSquare, ChevronDown, ChevronUp, Reply, Check, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useReviews } from '@/hooks/useReviews';
import { Button } from '@/components/ui/button';

const DEFAULT_VISIBLE = 4;

// Renders filled stars for a given rating
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
            filter: star <= Math.round(rating) ? 'drop-shadow(0 0 3px rgba(16, 185, 129, 0.3))' : 'none',
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
  const { reviews, loading, averageRating, totalReviews, submitReply, submitting } = useReviews();
  const [showAll, setShowAll] = useState(false);
  const [searchParams] = useSearchParams();
  const isAdmin = searchParams.get('admin') !== null;
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleReplyClick = (reviewId: string) => {
    if (!isAuthenticated) {
      const pwd = window.prompt('Enter developer password:');
      if (pwd === 'Printify@2026') {
        setIsAuthenticated(true);
        setReplyingTo(reviewId);
        setReplyText('');
      } else if (pwd !== null) {
        alert('Incorrect password!');
      }
    } else {
      setReplyingTo(reviewId);
      setReplyText('');
    }
  };

  const handleReplySubmit = async (reviewId: string) => {
    if (!replyText.trim()) return;
    const success = await submitReply(reviewId, replyText);
    if (success) {
      setReplyingTo(null);
      setReplyText('');
    }
  };

  // Only display reviews that have a written comment
  const withComments = reviews.filter((r) => r.comment.trim().length > 0);
  const visibleReviews = showAll ? withComments : withComments.slice(0, DEFAULT_VISIBLE);
  const hasMore = withComments.length > DEFAULT_VISIBLE;

  return (
    <section className="section-padding" id="reviews">
      <div className="container-tight">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="glass-pill text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-6">
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
              Based on{' '}
              <span className="font-semibold text-foreground">{totalReviews}</span>{' '}
              {totalReviews === 1 ? 'review' : 'reviews'}
            </p>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(DEFAULT_VISIBLE)].map((_, i) => (
              <div key={i} className="rounded-xl liquid-glass p-5 animate-pulse">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((__, j) => (
                    <div key={j} className="w-4 h-4 rounded-full bg-white/[0.06]" />
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-white/[0.06] rounded w-full" />
                  <div className="h-3 bg-white/[0.06] rounded w-4/5" />
                  <div className="h-3 bg-white/[0.06] rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Review cards */}
        {!loading && visibleReviews.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {visibleReviews.map((review) => (
                <div
                  key={review.id}
                  className="group liquid-glass-interactive prismatic-border rounded-xl p-5"
                >
                  <div className="flex items-start justify-between mb-3 relative z-10">
                    <StarDisplay rating={review.rating} />
                    <span className="text-xs text-muted-foreground shrink-0 ml-2">
                      {timeAgo(review.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed line-clamp-4 relative z-10">
                    "{review.comment}"
                  </p>

                  {/* Existing Reply Display */}
                  {review.reply && (
                    <div className="mt-4 pt-3 border-t border-white/[0.08] relative z-10">
                      <div className="flex items-center gap-1.5 mb-1.5 text-emerald-400">
                        <Reply className="w-3.5 h-3.5" />
                        <span className="text-xs font-semibold tracking-wide">Developer Reply</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed pl-5">
                        {review.reply}
                      </p>
                    </div>
                  )}

                  {/* Admin Reply UI */}
                  {isAdmin && !review.reply && (
                    <div className="mt-4 pt-3 border-t border-white/[0.08] relative z-10">
                      {replyingTo === review.id ? (
                        <div className="space-y-2">
                          <textarea
                            autoFocus
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Type your reply..."
                            className="w-full text-sm bg-white/[0.04] border border-white/[0.1] rounded-lg p-2 text-foreground focus:outline-none focus:border-emerald-500/50 resize-none h-20 placeholder:text-muted-foreground/50"
                          />
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs px-2 border-white/[0.1] hover:bg-white/[0.05]"
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyText('');
                              }}
                              disabled={submitting}
                            >
                              <X className="w-3 h-3 mr-1" /> Cancel
                            </Button>
                            <Button
                              size="sm"
                              className="h-7 text-xs px-2 bg-emerald-500 hover:bg-emerald-600 text-white"
                              onClick={() => handleReplySubmit(review.id)}
                              disabled={submitting || !replyText.trim()}
                            >
                              <Check className="w-3 h-3 mr-1" /> {submitting ? 'Saving...' : 'Save'}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleReplyClick(review.id)}
                          className="flex items-center gap-1.5 text-xs text-emerald-500 hover:text-emerald-400 font-medium transition-colors"
                        >
                          <Reply className="w-3.5 h-3.5" /> Reply to Review
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Show all / collapse button */}
            {hasMore && (
              <div className="flex justify-center mt-8">
                <Button
                  variant="outline"
                  onClick={() => setShowAll((v) => !v)}
                  className="gap-2 rounded-xl border-white/[0.08] bg-white/[0.03] backdrop-blur-md hover:border-emerald-500/30 hover:text-emerald-400 hover:bg-white/[0.05] transition-all duration-300"
                >
                  {showAll ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Show less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Show all {withComments.length} reviews
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}

        {/* Empty state */}
        {!loading && totalReviews === 0 && (
          <div className="text-center py-12 rounded-xl liquid-glass border-dashed">
            <MessageSquare className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">No reviews yet.</p>
            <p className="text-muted-foreground/60 text-xs mt-1">
              Generate a PDF and be the first to review!
            </p>
          </div>
        )}

        {/* Ratings exist but no written reviews */}
        {!loading && totalReviews > 0 && withComments.length === 0 && (
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
