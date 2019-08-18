import { useState, useRef, useCallback, useEffect } from 'react';
import debounce from 'debounce';
import { Space, BreakPoint } from '../../../../styles/variables';
import { useMedia } from '../../../../hooks/useMedia';

const RESIZE_DEBOUNCE_MS = 32;

const safe = (n: number) => (Number.isNaN(n) ? 0 : n);

export const useComparisonImage = (before: string, after: string) => {
  const isDesktop = useMedia(`(min-width: ${BreakPoint.MEDIUM}px)`);

  // canvas
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = debounce(() => {
      setWidth(window.innerWidth - (isDesktop ? Space * 5 : Space * 1) * 2);
    }, RESIZE_DEBOUNCE_MS);

    updateWidth();

    window.addEventListener('resize', updateWidth, false);

    return () => {
      window.removeEventListener('resize', updateWidth, false);
    };
  }, [isDesktop]);

  // images
  const [bLoaded, setBLoaded] = useState(false);
  const [aLoaded, setALoaded] = useState(false);
  const [bSize, setBSize] = useState({ width: 0, height: 0 });
  const [aSize, setASize] = useState({ width: 0, height: 0 });

  const bRef = useRef<HTMLImageElement>(null);
  const aRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (bRef.current != null && bRef.current.complete) {
      setBLoaded(true);
    }
  }, [before]);

  useEffect(() => {
    if (aRef.current != null && aRef.current.complete) {
      setALoaded(true);
    }
  }, [after]);

  const handleBLoaded = useCallback(() => {
    if (bRef.current != null) {
      setBSize({
        width: bRef.current.naturalWidth,
        height: bRef.current.naturalHeight,
      });
    }

    setBLoaded(true);
  }, []);

  const handleALoaded = useCallback(() => {
    if (aRef.current != null) {
      setASize({
        width: aRef.current.naturalWidth,
        height: aRef.current.naturalHeight,
      });
    }

    setALoaded(true);
  }, []);

  // calculate
  const w = safe(Math.min(width, Math.max(bSize.width, aSize.width)));
  const bw = Math.min(w, bSize.width);
  const bh = safe((bw / bSize.width) * bSize.height);
  const aw = Math.min(w, aSize.width);
  const ah = safe((aw / aSize.width) * aSize.height);
  const h = Math.max(bh, ah);

  return {
    canvas: {
      width: Math.min(width, w),
      height: h,
    },
    image: {
      width: w,
      height: h,
      loaded: bLoaded && aLoaded,
      before: {
        ref: bRef,
        width: bw,
        height: bh,
        loaded: bLoaded,
        handleLoad: handleBLoaded,
      },
      after: {
        ref: aRef,
        width: aw,
        height: ah,
        loaded: aLoaded,
        handleLoad: handleALoaded,
      },
    },
  };
};
