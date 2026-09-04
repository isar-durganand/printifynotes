import { useState, useCallback, useRef } from 'react';

const MAX_HISTORY = 25;
const DEBOUNCE_HISTORY_MS = 300;

interface UndoRedoState<T> {
  state: T;
  set: (newState: T) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export function useUndoRedo<T>(initial: T): UndoRedoState<T> {
  const [{ history, cursor }, setState] = useState<{ history: T[]; cursor: number }>({
    history: [initial],
    cursor: 0,
  });

  const lastSetTimeRef = useRef<number>(0);

  // Safe fallback to initial if history[cursor] is somehow undefined
  const state = history[cursor] ?? initial;

  const set = useCallback((newState: T) => {
    const now = Date.now();
    const isRapidUpdate = now - lastSetTimeRef.current < DEBOUNCE_HISTORY_MS;
    lastSetTimeRef.current = now;

    setState((prev) => {
      const safeCursor = Math.max(0, Math.min(prev.cursor, prev.history.length - 1));

      if (isRapidUpdate && safeCursor > 0) {
        // Rapid sequential update (e.g. dragging a slider):
        // Update the current history step in place instead of creating dozens of intermediate states
        const updated = [...prev.history];
        updated[safeCursor] = newState;
        return {
          history: updated,
          cursor: safeCursor,
        };
      }

      // Discrete action or new action after pause:
      // Truncate any redo entries ahead of cursor
      const trimmed = prev.history.slice(0, safeCursor + 1);
      const base = trimmed.length >= MAX_HISTORY ? trimmed.slice(1) : trimmed;
      const nextHistory = [...base, newState];
      return {
        history: nextHistory,
        cursor: nextHistory.length - 1,
      };
    });
  }, []);

  const undo = useCallback(() => {
    setState((prev) => ({
      ...prev,
      cursor: Math.max(0, Math.min(prev.cursor - 1, prev.history.length - 1)),
    }));
  }, []);

  const redo = useCallback(() => {
    setState((prev) => ({
      ...prev,
      cursor: Math.min(prev.history.length - 1, prev.cursor + 1),
    }));
  }, []);

  return {
    state,
    set,
    undo,
    redo,
    canUndo: cursor > 0,
    canRedo: cursor < history.length - 1,
  };
}
