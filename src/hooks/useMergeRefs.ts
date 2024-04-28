import { useMemo } from 'react';

type ReactRef<T> = React.Ref<T> | React.MutableRefObject<T>;

const assignRef = <T = any>(ref: ReactRef<T> | undefined, value: T) => {
  if (ref == null) {
    return;
  }

  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ref.current = value;
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
  }
};

export const useMergeRefs = <T>(...refs: (ReactRef<T> | undefined)[]) => {
  return useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }
    return (node: T) => {
      refs.forEach((ref) => {
        if (ref) {
          assignRef(ref, node);
        }
      });
    };
  }, refs); // eslint-disable-line react-hooks/exhaustive-deps
};
