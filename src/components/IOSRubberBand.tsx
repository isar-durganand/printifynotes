import React from 'react';
import { useRubberBand } from '@/hooks/useRubberBand';

interface IOSRubberBandProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const IOSRubberBand: React.FC<IOSRubberBandProps> = ({
  children,
  className = '',
  disabled = false,
}) => {
  const { ref, offsetY, isPulling } = useRubberBand<HTMLDivElement>({ disabled });

  return (
    <div
      ref={ref}
      className={`ios-rubberband-container ${className}`}
      style={{
        transform: offsetY !== 0 ? `translate3d(0, ${offsetY}px, 0)` : undefined,
        transition: isPulling ? 'none' : 'transform 450ms cubic-bezier(0.19, 1, 0.22, 1)',
        willChange: offsetY !== 0 ? 'transform' : 'auto',
      }}
    >
      {children}
    </div>
  );
};
