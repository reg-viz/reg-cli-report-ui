import { useState, useRef, useCallback, useEffect } from 'react';
import debounce from 'debounce';
import { Space, BreakPoint, Size } from '../../../../styles/variables.css';
import { useMedia } from '../../../../hooks/useMedia';

const RESIZE_DEBOUNCE_MS = 32;

const safe = (n: number) => (Number.isNaN(n) ? 0 : n);

export const useComparisonImage = (before: string, after: string) => {
  const isDesktop = useMedia(`(min-width: ${BreakPoint.MEDIUM}px)`);

  // canvas
  const [width, setWidth] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    const updateDimensions = debounce(() => {
      setWidth(window.innerWidth - (isDesktop ? Space * 5 : Space * 1) * 2);
      setMaxHeight(
        window.innerHeight - Size.HEADER_HEIGHT - Space * 3 - Space * 17,
      );
    }, RESIZE_DEBOUNCE_MS);

    updateDimensions();

    window.addEventListener('resize', updateDimensions, false);

    return () => {
      window.removeEventListener('resize', updateDimensions, false);
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
  let w = safe(Math.min(width, Math.max(bSize.width, aSize.width)));
  let bw = Math.min(w, bSize.width);
  let bh = safe((bw / bSize.width) * bSize.height);
  let aw = Math.min(w, aSize.width);
  let ah = safe((aw / aSize.width) * aSize.height);
  let h = Math.max(bh, ah);

  // Constrain by available height so portrait images fit in the viewport
  if (maxHeight > 0 && h > maxHeight) {
    const scale = maxHeight / h;
    w = Math.round(w * scale);
    bw = Math.round(bw * scale);
    bh = Math.round(bh * scale);
    aw = Math.round(aw * scale);
    ah = Math.round(ah * scale);
    h = Math.round(maxHeight);
  }

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
