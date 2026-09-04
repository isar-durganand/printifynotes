import React, { useState, useEffect } from 'react';
import { Star, Send, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSubmitReview } from '@/hooks/useSubmitReview';

function StarPicker({ rating, onChange }: { rating: number; onChange: (r: number) => void }) {
  const [hover, setHover] = useState(0);
  const labels = ['Terrible', 'Bad', 'Okay', 'Good', 'Excellent!'];
  const active = hover || rating;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-2.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="p-1 transition-transform hover:scale-115 active:scale-95 focus:outline-none"
          >
            <Star
              className="w-9 h-9 transition-colors duration-150"
              style={{
                fill: star <= active ? '#007AFF' : 'transparent',
                stroke: star <= active ? '#007AFF' : 'hsl(var(--muted-foreground)/0.4)',
              }}
            />
          </button>
        ))}
      </div>
      <p
        className="text-center text-sm font-semibold transition-all duration-150 h-5"
        style={{ color: active ? '#007AFF' : 'transparent' }}
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
  const { submitReview, submitting } = useSubmitReview();

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
    <div className="min-h-screen bg-[#F2F2F7] dark:bg-black text-foreground flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Background glow */}
      <div
        className="fixed pointer-events-none"
        style={{
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 50% at 20% 30%, rgba(0,122,255,0.08) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 80% 70%, rgba(0,122,255,0.05) 0%, transparent 60%)',
        }}
      />

      <div
        className="relative w-full max-w-lg"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 500ms ease, transform 500ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground active:scale-[0.96] transition-all mb-6"
        >
          <ArrowLeft className="w-4 h-4 text-[#007AFF]" />
          Back to Printify Notes
        </Link>

        {/* Card */}
        <div className="rounded-[32px] bg-white dark:bg-[#1C1C1E] hairline-border shadow-2xl overflow-hidden">
          {/* Top hairline accent */}
          <div className="h-1 w-full bg-gradient-to-r from-[#007AFF] via-[#0A84FF] to-[#0051D5]" />

          <div className="p-8 sm:p-10">
            {submitted ? (
              /* Success state */
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-[20px] bg-[#007AFF]/10 flex items-center justify-center shadow-sm">
                  <CheckCircle2 className="w-8 h-8 text-[#007AFF]" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Thank You! 🎉</h1>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  Your review has been submitted successfully. It helps other students discover Printify Notes!
                </p>
                <Link to="/">
                  <Button className="mt-4 bg-[#007AFF] hover:bg-[#007AFF]/90 text-white rounded-[12px] font-semibold active:scale-[0.96] transition-transform shadow-md shadow-[#007AFF]/20 px-6">
                    Back to Home
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-[18px] bg-[#007AFF]/10 mb-4 shadow-sm">
                    <Star className="w-7 h-7 text-[#007AFF] fill-[#007AFF]/20" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-foreground">
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
                <div className="space-y-1.5 mb-6">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Your review <span className="font-normal text-muted-foreground/60">(optional)</span>
                  </label>
                  <Textarea
                    placeholder="Tell us what you loved, or what we can improve..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value.slice(0, 500))}
                    className="resize-none h-28 text-sm rounded-[12px] bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20"
                  />
                  <p className="text-xs text-muted-foreground text-right">{comment.length}/500</p>
                </div>

                {/* Submit */}
                <Button
                  onClick={handleSubmit}
                  disabled={rating === 0 || submitting}
                  className="w-full bg-[#007AFF] hover:bg-[#007AFF]/90 text-white rounded-[12px] h-12 font-semibold text-sm shadow-md shadow-[#007AFF]/20 active:scale-[0.96] transition-transform"
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
