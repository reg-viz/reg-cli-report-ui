import { useCallback, useEffect, useRef } from 'react';
import { tinykeys } from 'tinykeys';

const ignore = new Set(['input', 'select', 'textarea']);

export type UseKeyCallback = (e: KeyboardEvent) => void;

export const useKey = (
  target:
    | React.RefObject<HTMLElement>
    | React.MutableRefObject<HTMLElement>
    | null,
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
        keys.map((key) => [
          key,
          (e) => {
            const el = e.target;
            if (
              el instanceof HTMLElement &&
              ignore.has(el.tagName.toLowerCase())
            ) {
              return;
            }
            callbackRef.current(e);
          },
        ]),
      ),
    );
  }, [target, keys]);
};
