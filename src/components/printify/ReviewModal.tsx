import React, { useState, useEffect } from 'react';
import { X, Star, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSubmitReview } from '@/hooks/useSubmitReview';

const SESSION_KEY = 'pn_review_shown';

interface ReviewModalProps {
  onClose: () => void;
}

export function ReviewModal({ onClose }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);
  const { submitReview, submitting } = useSubmitReview();

  // Animate in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const handleSubmit = async () => {
    if (rating === 0 || submitting) return;
    const ok = await submitReview(rating, comment);
    if (ok) {
      // Mark as shown for this session so it won't pop again
      sessionStorage.setItem(SESSION_KEY, '1');
      setSubmitted(true);
      setTimeout(handleClose, 2000);
    }
  };

  const starLabels = ['Terrible', 'Bad', 'Okay', 'Good', 'Excellent!'];
  const activeRating = hoverRating || rating;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(6px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 300ms ease',
      }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      {/* Modal card */}
      <div
        style={{
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.96)',
          opacity: visible ? 1 : 0,
          transition: 'transform 350ms cubic-bezier(0.16,1,0.3,1), opacity 300ms ease',
        }}
        className="relative w-full max-w-sm rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
      >
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 pt-5">
          {submitted ? (
            /* Success state */
            <div className="text-center py-4 space-y-3">
              <div className="text-4xl">🎉</div>
              <p className="font-semibold text-foreground">Thank you for your review!</p>
              <p className="text-sm text-muted-foreground">Your feedback helps others discover Printify Notes.</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-emerald-500 uppercase tracking-widest mb-1">
                  How did it go?
                </p>
                <h2 className="text-lg font-bold text-foreground leading-tight">
                  Rate your PDF generation
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Takes 10 seconds • Helps us improve
                </p>
              </div>

              {/* Star rating */}
              <div className="flex items-center gap-1.5 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-0.5 transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star
                      className="w-8 h-8 transition-colors duration-100"
                      style={{
                        fill: star <= activeRating ? '#10b981' : 'transparent',
                        stroke: star <= activeRating ? '#10b981' : 'currentColor',
                        color: star <= activeRating ? '#10b981' : 'hsl(var(--muted-foreground))',
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* Star label */}
              <p
                className="text-sm font-medium mb-4 h-5 transition-all duration-150"
                style={{ color: activeRating ? '#10b981' : 'transparent' }}
              >
                {activeRating ? starLabels[activeRating - 1] : '·'}
              </p>

              {/* Comment box */}
              <Textarea
                placeholder="Tell us what you loved or what could be better... (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value.slice(0, 280))}
                className="resize-none text-sm h-20 mb-1"
              />
              <p className="text-xs text-muted-foreground text-right mb-4">
                {comment.length}/280
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleSubmit}
                  disabled={rating === 0 || submitting}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg"
                  size="sm"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {submitting ? 'Submitting…' : 'Submit Review'}
                </Button>
                <button
                  onClick={handleClose}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                >
                  Skip
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
