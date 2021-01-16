import React, { useState, useEffect, forwardRef, useRef } from 'react';
import styled from 'styled-components';
import { useIntersection } from 'use-intersection';
import { Spinner } from '../Spinner';
import { supportsLoading } from '../../supports';

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

const Wrapper = styled.span`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  line-height: 0;
  transform: translate(-50%, -50%);
`;

// FIXME Remove patch when `loading` is added to the type definition.
const Img = styled.img<{
  fit: ObjectFitValue | undefined;
  full: boolean;
  loading?: string;
}>`
  position: relative;
  z-index: 1;
  max-width: 100%;
  width: ${({ full }) => (full ? '100%' : undefined)};
  height: ${({ full }) => (full ? '100%' : undefined)};
  vertical-align: bottom;
  object-fit: ${({ fit }) => fit};
`;

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

    return (
      <Wrapper
        ref={wrapperRef}
        style={{
          width: size2str(width),
          height: size2str(height),
        }}
      >
        <Img
          ref={ref as any}
          loading="lazy"
          src={src}
          fit={fit}
          full={width != null && height != null}
          {...rest}
        />

        {!loaded && (
          <Loading>
            <Spinner aria-label="Loading..." />
          </Loading>
        )}
      </Wrapper>
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
  ({ lazy, ...rest }, ref) =>
    lazy && !supportsLoading ? (
      <LazyImage ref={ref as any} {...rest} />
    ) : (
      <ImmediatelyImage ref={ref as any} {...rest} />
    ),
);

Image.defaultProps = {
  lazy: false,
};
