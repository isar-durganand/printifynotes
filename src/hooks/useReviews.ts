import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Review {
  id: string;
  rating: number;       // 1–5
  comment: string;
  createdAt: Date;
  reply?: string;
  replyAt?: Date;
}

const COLLECTION = 'reviews';

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch all reviews from Firestore, newest first
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data: Review[] = snapshot.docs.map((document) => {
        const d = document.data();
        return {
          id: document.id,
          rating: d.rating as number,
          comment: (d.comment as string) ?? '',
          createdAt: (d.createdAt as Timestamp)?.toDate?.() ?? new Date(),
          reply: d.reply as string | undefined,
          replyAt: (d.replyAt as Timestamp)?.toDate?.() ?? undefined,
        };
      });
      setReviews(data);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Submit a new review
  const submitReview = async (rating: number, comment: string): Promise<boolean> => {
    try {
      setSubmitting(true);
      await addDoc(collection(db, COLLECTION), {
        rating,
        comment: comment.trim(),
        createdAt: serverTimestamp(),
      });
      // Optimistically add to local state
      setReviews((prev) => [
        { id: Date.now().toString(), rating, comment, createdAt: new Date() },
        ...prev,
      ]);
      return true;
    } catch (err) {
      console.error('Failed to submit review:', err);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // Submit a reply to a review
  const submitReply = async (reviewId: string, replyText: string): Promise<boolean> => {
    try {
      setSubmitting(true);
      const reviewRef = doc(db, COLLECTION, reviewId);
      const now = new Date();
      await updateDoc(reviewRef, {
        reply: replyText.trim(),
        replyAt: serverTimestamp(),
      });
      // Optimistically update local state
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId
            ? { ...r, reply: replyText.trim(), replyAt: now }
            : r
        )
      );
      return true;
    } catch (err) {
      console.error('Failed to submit reply:', err);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return {
    reviews,
    loading,
    submitting,
    submitReview,
    submitReply,
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews: reviews.length,
  };
}
