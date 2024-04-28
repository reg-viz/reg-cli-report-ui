import { useCallback, useEffect, useRef } from 'react';
import { tinykeys } from 'tinykeys';

export type UseKeyCallback = (e: KeyboardEvent) => void;

export const useKey = (
  target: React.RefObject<HTMLElement> | null,
  keys: string[],
  callback: UseKeyCallback,
) => {
  const callbackFn = useCallback(callback, []); // eslint-disable-line react-hooks/exhaustive-deps
  const callbackRef = useRef(callbackFn);
  callbackRef.current = callback;

  useEffect(() => {
    if (target != null && target.current == null) {
      return;
    }

    return tinykeys(
      target?.current ?? window,
      Object.fromEntries(
        keys.map((key) => [key, (e) => callbackRef.current(e)]),
      ),
    );
  }, [target, keys]);
};
