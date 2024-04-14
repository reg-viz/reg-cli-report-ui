import React, { useEffect, useRef } from 'react';
import type { Matching } from '../../../../types/reg';
import { Image } from '../../../Image';
import { Markers } from './Markers';
import * as styles from './Slide.css';
import { useComparisonImage } from './useComparisonImage';

export type Props = {
  before: string;
  after: string;
  value: number;
  matching: Matching | null;
  onChange: (value: number) => void;
};

export const Slide = ({ before, after, value, matching, onChange }: Props) => {
  const { canvas, image } = useComparisonImage(before, after);

  const innerRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value, 10));
  };

  useEffect(() => {
    const inner = innerRef.current as HTMLDivElement;

    const handleMousemove = (e: MouseEvent | TouchEvent) => {
      const pageX =
        ('touches' in e ? e.touches[0].pageX : e.pageX) - window.scrollX;

      const { left } = inner.getBoundingClientRect();
      const x = Math.min(Math.max(0, pageX - left), image.width);

      onChange((x / image.width) * 100);
    };

    const handleMousedown = (e: MouseEvent | TouchEvent) => {
      e.stopPropagation();

      if (rangeRef.current != null) {
        rangeRef.current.focus();
      }

      window.addEventListener('mousemove', handleMousemove, false);
      window.addEventListener('touchmove', handleMousemove, false);
    };

    const handleMouseup = () => {
      window.removeEventListener('mousemove', handleMousemove, false);
      window.removeEventListener('touchmove', handleMousemove, false);
    };

    inner.addEventListener('mousedown', handleMousedown, false);
    inner.addEventListener('touchstart', handleMousedown, false);
    window.addEventListener('mouseup', handleMouseup, false);
    window.addEventListener('touchend', handleMouseup, false);

    return () => {
      inner.removeEventListener('mousedown', handleMousedown, false);
      inner.removeEventListener('touchstart', handleMousedown, false);
      window.removeEventListener('mouseup', handleMouseup, false);
      window.removeEventListener('touchend', handleMouseup, false);
      window.removeEventListener('mousemove', handleMousemove, false);
      window.removeEventListener('touchmove', handleMousemove, false);
    };
  }, [image.width, onChange]);

  return (
    <div
      className={styles.wrapper}
      style={{ visibility: image.loaded ? 'visible' : 'hidden' }}
    >
      <div className={styles.inner} ref={innerRef} style={canvas}>
        <input
          ref={rangeRef}
          className={styles.range}
          type="range"
          min={0}
          max={100}
          value={value}
          data-mousetrap="ignore"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          aria-label="Percent of revealed content"
          onChange={handleChange}
        />

        <div
          className={styles.before}
          style={{
            width: image.before.width,
            height: image.before.height,
          }}
        >
          <Image
            ref={image.before.ref}
            src={before}
            onLoad={image.before.handleLoad}
          />
          <Markers variant="before" matching={matching} />
        </div>

        <div className={styles.frame} style={{ width: `${value}%` }}>
          <div
            className={styles.after}
            style={{
              top: 0,
              left: canvas.width / 2 - image.after.width / 2,
              width: image.after.width,
              height: image.after.height,
            }}
          >
            <Image
              ref={image.after.ref}
              src={after}
              onLoad={image.after.handleLoad}
            />
            <Markers variant="after" matching={matching} />
          </div>
        </div>

        <span className={styles.handle} style={{ left: `${value}%` }}>
          <span className={styles.handleBar} />
        </span>
      </div>
    </div>
  );
};
