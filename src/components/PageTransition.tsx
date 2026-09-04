import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

type NavDirection = 'push' | 'pop';

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [direction, setDirection] = useState<NavDirection>('push');
  const historyStackRef = useRef<string[]>([location.pathname]);
  const isPopRef = useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      isPopRef.current = true;
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    const stack = historyStackRef.current;
    const prevIndex = stack.indexOf(currentPath);

    if (isPopRef.current || (prevIndex !== -1 && prevIndex < stack.length - 1)) {
      // User navigated back (pop)
      setDirection('pop');
      if (prevIndex !== -1) {
        historyStackRef.current = stack.slice(0, prevIndex + 1);
      } else {
        historyStackRef.current.pop();
      }
    } else {
      // User navigated forward (push)
      setDirection('push');
      historyStackRef.current.push(currentPath);
    }

    isPopRef.current = false;
  }, [location.pathname]);

  const springConfig = {
    type: 'spring' as const,
    mass: 1,
    stiffness: 300,
    damping: 30,
  };

  const variants = {
    initial: (dir: NavDirection) => ({
      x: dir === 'push' ? '100%' : '-25%',
      opacity: dir === 'push' ? 1 : 0.7,
      boxShadow: dir === 'push' ? '-12px 0 36px rgba(0, 0, 0, 0.25)' : 'none',
      zIndex: dir === 'push' ? 2 : 1,
    }),
    animate: {
      x: '0%',
      opacity: 1,
      boxShadow: 'none',
      zIndex: 1,
      transition: springConfig,
    },
    exit: (dir: NavDirection) => ({
      x: dir === 'push' ? '-25%' : '100%',
      opacity: dir === 'push' ? 0.7 : 1,
      boxShadow: dir === 'pop' ? '-12px 0 36px rgba(0, 0, 0, 0.25)' : 'none',
      zIndex: dir === 'pop' ? 2 : 1,
      transition: springConfig,
    }),
  };

  return (
    <div className="relative w-full overflow-x-hidden min-h-screen">
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.div
          key={location.pathname}
          custom={direction}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full min-h-screen bg-background"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
