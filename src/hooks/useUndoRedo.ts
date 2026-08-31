import { useState, useCallback } from 'react';

const MAX_HISTORY = 20;

interface UndoRedoState<T> {
  state: T;
  set: (newState: T) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export function useUndoRedo<T>(initial: T): UndoRedoState<T> {
  const [history, setHistory] = useState<T[]>([initial]);
  const [cursor, setCursor] = useState(0);

  const state = history[cursor];

  const set = useCallback((newState: T) => {
    setHistory((prev) => {
      // Drop redo stack (everything after cursor)
      const trimmed = prev.slice(0, cursor + 1);
      // Enforce max history depth
      const base = trimmed.length >= MAX_HISTORY ? trimmed.slice(1) : trimmed;
      return [...base, newState];
    });
    setCursor((prev) => {
      const trimmedLen = Math.min(prev + 1, MAX_HISTORY);
      return trimmedLen;
    });
  }, [cursor]);

  const undo = useCallback(() => {
    setCursor((prev) => Math.max(0, prev - 1));
  }, []);

  const redo = useCallback(() => {
    setCursor((prev) => {
      return Math.min(history.length - 1, prev + 1);
    });
  }, [history.length]);

  return {
    state,
    set,
    undo,
    redo,
    canUndo: cursor > 0,
    canRedo: cursor < history.length - 1,
  };
}
