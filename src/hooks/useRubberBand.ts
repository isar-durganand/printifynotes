import { useEffect, useRef, useState } from 'react';

interface RubberBandOptions {
  maxStretch?: number;
  resistance?: number;
  disabled?: boolean;
}

export function useRubberBand<T extends HTMLElement = HTMLDivElement>(options: RubberBandOptions = {}) {
  const { maxStretch = 120, resistance = 0.35, disabled = false } = options;
  const ref = useRef<T>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [isPulling, setIsPulling] = useState(false);

  const startYRef = useRef<number | null>(null);
  const currentOffsetRef = useRef<number>(0);
  const wheelAccumulatorRef = useRef<number>(0);
  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (disabled) return;
    const el = ref.current || document.body;

    // Helper to calculate progressive logarithmic resistance
    const calculateResistance = (delta: number): number => {
      const sign = Math.sign(delta);
      const abs = Math.abs(delta);
      const resisted = (abs * resistance) / (1 + (abs * 0.0025));
      return sign * Math.min(resisted, maxStretch);
    };

    // --- Touch Interaction ---
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      startYRef.current = e.touches[0].clientY;
      setIsPulling(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (startYRef.current === null) return;
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - startYRef.current;

      const atTop = window.scrollY <= 0;
      const atBottom = window.innerHeight + window.scrollY >= (document.documentElement.scrollHeight - 2);

      if ((atTop && deltaY > 0) || (atBottom && deltaY < 0)) {
        const pull = calculateResistance(deltaY);
        currentOffsetRef.current = pull;
        setOffsetY(pull);
        setIsPulling(true);
      }
    };

    const handleTouchEnd = () => {
      startYRef.current = null;
      setIsPulling(false);
      currentOffsetRef.current = 0;
      setOffsetY(0);
    };

    // --- Wheel / Trackpad Interaction ---
    const handleWheel = (e: WheelEvent) => {
      const atTop = window.scrollY <= 0;
      const atBottom = window.innerHeight + window.scrollY >= (document.documentElement.scrollHeight - 2);

      // Only apply rubber band when trying to scroll past boundaries
      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        wheelAccumulatorRef.current -= e.deltaY * 0.5;
        const pull = calculateResistance(wheelAccumulatorRef.current);
        setOffsetY(pull);
        setIsPulling(true);

        if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
        wheelTimeoutRef.current = setTimeout(() => {
          wheelAccumulatorRef.current = 0;
          setIsPulling(false);
          setOffsetY(0);
        }, 120);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      window.removeEventListener('wheel', handleWheel);
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    };
  }, [disabled, maxStretch, resistance]);

  return { ref, offsetY, isPulling };
}
