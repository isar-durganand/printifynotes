import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Review {
  id: string;
  rating: number;       // 1–5
  comment: string;
  createdAt: Date;
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
      const data: Review[] = snapshot.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          rating: d.rating as number,
          comment: (d.comment as string) ?? '',
          createdAt: (d.createdAt as Timestamp)?.toDate?.() ?? new Date(),
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

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return {
    reviews,
    loading,
    submitting,
    submitReview,
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews: reviews.length,
  };
}
