import Mousetrap from 'mousetrap';
import { useEffect, useCallback } from 'react';

type MousetrapHandler = (e: ExtendedKeyboardEvent, combo: string) => any;

export const useMousetrap = (
  keys: string | string[],
  target: HTMLElement | null,
  handler: MousetrapHandler,
  deps: any[] = [],
) => {
  const memorizedHandler = useCallback(handler, [target, ...deps]);

  useEffect(() => {
    const instance =
      target != null ? Mousetrap(target).bind(keys, memorizedHandler) : Mousetrap.bind(keys, memorizedHandler);

    return () => {
      instance.unbind(keys);
    };
  }, [memorizedHandler]); // eslint-disable-line react-hooks/exhaustive-deps
};
