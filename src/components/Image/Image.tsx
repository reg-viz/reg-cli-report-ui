import { clsx } from 'clsx';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useIntersection } from 'use-intersection';
import { supportsLoading } from '../../supports';
import { Spinner } from '../Spinner';
import * as styles from './Image.css';

const srcCache = new Set();

const size2str = (size: SizeValue | undefined) => {
  if (size == null) {
    return undefined;
  }

  if (typeof size === 'number') {
    return `${size}px`;
  }

  return size;
};

type SizeValue = number | string;
type ObjectFitValue = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

export type Props = Omit<React.ComponentProps<'img'>, 'width' | 'height'> & {
  width?: SizeValue;
  height?: SizeValue;
  fit?: ObjectFitValue;
  lazy?: boolean;
};

type InnerProps = Omit<Props, 'lazy'>;

const ImmediatelyImage = forwardRef<HTMLImageElement, InnerProps>(
  ({ src, width, height, fit, ...rest }, ref) => {
    const wrapperRef = useRef<HTMLSpanElement>(null);
    const [loaded, setLoaded] = useState(srcCache.has(src));

    useEffect(() => {
      const { current: wrapper } = wrapperRef;
      if (loaded || wrapper == null) {
        return;
      }

      const img = wrapper.firstElementChild;
      if (img == null || !(img instanceof HTMLImageElement)) {
        return;
      }

      if (img.complete) {
        return setLoaded(true);
      }

      img.onload = () => {
        if (img != null) {
          setLoaded(true);
        }
        srcCache.add(src);
      };
    }, [loaded, src]);

    const full = width != null && height != null;

    return (
      <span
        ref={wrapperRef}
        className={styles.wrapper}
        style={{
          width: size2str(width),
          height: size2str(height),
        }}
      >
        <img
          ref={ref as any}
          className={clsx({
            [styles.image.default]: !full,
            [styles.image.full]: full,
          })}
          style={{
            objectFit: fit,
          }}
          loading="lazy"
          src={src}
          {...rest}
        />

        {!loaded && (
          <span className={styles.loading}>
            <Spinner aria-label="Loading..." />
          </span>
        )}
      </span>
    );
  },
);

const LazyImage = forwardRef<HTMLImageElement, InnerProps>((props, ref) => {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const intersected = useIntersection(wrapperRef, {
    rootMargin: '250px',
    once: true,
  });

  return (
    <span ref={wrapperRef}>
      {intersected ? <ImmediatelyImage ref={ref as any} {...props} /> : null}
    </span>
  );
});

export const Image = forwardRef<HTMLImageElement, Props>(
  ({ lazy = false, ...rest }, ref) =>
    lazy && !supportsLoading ? (
      <LazyImage ref={ref as any} {...rest} />
    ) : (
      <ImmediatelyImage ref={ref as any} {...rest} />
    ),
);
