import React, { useState, useEffect } from 'react';
import { Star, Send, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useReviews } from '@/hooks/useReviews';

function StarPicker({ rating, onChange }: { rating: number; onChange: (r: number) => void }) {
  const [hover, setHover] = useState(0);
  const labels = ['Terrible', 'Bad', 'Okay', 'Good', 'Excellent!'];
  const active = hover || rating;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="p-1 transition-transform hover:scale-125 focus:outline-none"
          >
            <Star
              className="w-10 h-10 transition-colors duration-100"
              style={{
                fill: star <= active ? '#10b981' : 'transparent',
                stroke: star <= active ? '#10b981' : 'hsl(var(--muted-foreground))',
              }}
            />
          </button>
        ))}
      </div>
      <p
        className="text-center text-base font-semibold transition-all duration-150 h-6"
        style={{ color: active ? '#10b981' : 'transparent' }}
      >
        {active ? labels[active - 1] : '·'}
      </p>
    </div>
  );
}

const ReviewPage: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);
  const { submitReview, submitting } = useReviews();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async () => {
    if (rating === 0) return;
    const ok = await submitReview(rating, comment);
    if (ok) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background orbs */}
      <div
        className="fixed pointer-events-none"
        style={{
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 50% at 20% 30%, rgba(16,185,129,0.12) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 80% 70%, rgba(59,130,246,0.08) 0%, transparent 60%)',
        }}
      />

      <div
        className="relative w-full max-w-lg"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 500ms ease, transform 500ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Printify Notes
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
          {/* Top gradient bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400" />

          <div className="p-8 sm:p-10">
            {submitted ? (
              /* Success state */
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/15 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h1 className="text-2xl font-bold">Thank You! 🎉</h1>
                <p className="text-muted-foreground leading-relaxed">
                  Your review has been submitted successfully. It helps other students discover Printify Notes!
                </p>
                <Link to="/">
                  <Button className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl">
                    Back to Home
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 mb-4">
                    <Star className="w-7 h-7 text-emerald-500 fill-emerald-500/30" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                    Leave a Review
                  </h1>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
                    How was your experience with Printify Notes? Your honest feedback helps us improve!
                  </p>
                </div>

                {/* Stars */}
                <div className="mb-6">
                  <StarPicker rating={rating} onChange={setRating} />
                </div>

                {/* Comment */}
                <div className="space-y-1 mb-6">
                  <label className="text-sm font-medium text-foreground">
                    Your review <span className="text-muted-foreground font-normal">(optional)</span>
                  </label>
                  <Textarea
                    placeholder="Tell us what you loved, or what we can improve..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value.slice(0, 500))}
                    className="resize-none h-28 text-sm"
                  />
                  <p className="text-xs text-muted-foreground text-right">{comment.length}/500</p>
                </div>

                {/* Submit */}
                <Button
                  onClick={handleSubmit}
                  disabled={rating === 0 || submitting}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl h-11 font-semibold text-sm"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {submitting ? 'Submitting…' : 'Submit Review'}
                </Button>

                {rating === 0 && (
                  <p className="text-xs text-center text-muted-foreground mt-3">
                    Please select a star rating to continue
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Reviews are public and visible on our website. No account required.
        </p>
      </div>
    </div>
  );
};

export default ReviewPage;
