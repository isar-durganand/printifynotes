import { useState, useRef } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

/**
 * Lightweight write-only hook for submitting a review.
 * Does NOT fetch existing reviews — use useReviews for that.
 * This avoids creating a Firestore listener just to show a modal.
 */
export function useSubmitReview() {
  const [submitting, setSubmitting] = useState(false);
  const submitted = useRef(false); // prevent double-submission

  const submitReview = async (rating: number, comment: string): Promise<boolean> => {
    // Hard guards: valid rating required, prevent double-submit
    if (rating < 1 || rating > 5) return false;
    if (submitted.current) return false;

    try {
      setSubmitting(true);
      submitted.current = true;
      await addDoc(collection(db, 'reviews'), {
        rating,
        comment: comment.trim(),
        createdAt: serverTimestamp(),
      });
      return true;
    } catch (err) {
      console.error('Failed to submit review:', err);
      submitted.current = false; // allow retry on error
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return { submitReview, submitting };
}
