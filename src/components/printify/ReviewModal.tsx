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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 300ms ease',
      }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      {/* iOS Bottom Sheet card */}
      <div
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          opacity: visible ? 1 : 0,
          transition: 'transform 400ms cubic-bezier(0.19,1,0.22,1), opacity 300ms ease',
        }}
        className="relative w-full max-w-md rounded-t-[32px] sm:rounded-[32px] border-t sm:border border-border/80 bg-card/95 backdrop-blur-2xl shadow-2xl overflow-hidden pb-6 pt-2 ios-bottom-sheet"
      >
        {/* iOS Capsule Handlebar */}
        <div className="ios-handlebar" onClick={handleClose} />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] transition-all ios-press active:scale-[0.96]"
          aria-label="Close review modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="px-6 pt-2">
          {submitted ? (
            /* Success state */
            <div className="text-center py-6 space-y-3">
              <div className="text-5xl animate-bounce">🎉</div>
              <p className="text-lg font-bold text-foreground tracking-tight">Thank you for your review!</p>
              <p className="text-sm text-muted-foreground">Your feedback helps thousands of students discover Printify Notes.</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-5 text-center">
                <p className="text-xs font-semibold text-[#007AFF] uppercase tracking-widest mb-1">
                  How did it go?
                </p>
                <h2 className="text-xl font-bold text-foreground leading-tight tracking-tight">
                  Rate your PDF conversion
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Takes 10 seconds • Helps keep it free
                </p>
              </div>

              {/* Star rating */}
              <div className="flex items-center justify-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-115 active:scale-[0.9] focus:outline-none ios-press"
                  >
                    <Star
                      className="w-8 h-8 transition-colors duration-150"
                      style={{
                        fill: star <= activeRating ? '#007AFF' : 'transparent',
                        stroke: star <= activeRating ? '#007AFF' : 'currentColor',
                        color: star <= activeRating ? '#007AFF' : 'hsl(var(--muted-foreground))',
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* Star label */}
              <p
                className="text-sm font-semibold text-center mb-4 h-5 transition-all duration-150"
                style={{ color: activeRating ? '#007AFF' : 'transparent' }}
              >
                {activeRating ? starLabels[activeRating - 1] : '·'}
              </p>

              {/* Comment box */}
              <Textarea
                placeholder="Tell us what you loved or what could be better... (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value.slice(0, 280))}
                className="resize-none text-sm h-20 mb-1 rounded-xl border-border/80 bg-background/50 focus:border-[#007AFF]"
              />
              <p className="text-xs text-muted-foreground text-right mb-5">
                {comment.length}/280
              </p>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleSubmit}
                  disabled={rating === 0 || submitting}
                  className="flex-1 bg-[#007AFF] hover:bg-[#007AFF]/90 text-white rounded-xl h-11 text-sm font-semibold shadow-sm active:scale-[0.96]"
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
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-xl hover:bg-foreground/[0.04] ios-press active:scale-[0.96]"
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
