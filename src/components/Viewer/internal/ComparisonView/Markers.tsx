import React from 'react';
import type { Matching, Rect } from '../../../../types/reg';
import * as styles from './Markers.css';

export type Props = {
  variant: 'before' | 'after';
  matching: Matching | null;
};

export const Markers = ({ variant, matching }: Props) => {
  if (matching == null) {
    return null;
  }

  const w1 = matching.images[0].width;
  const w2 = matching.images[1].width;
  const h = Math.max(matching.images[0].height, matching.images[1].height);

  const sx1 = (rect: Rect) => `${(rect.x / w1) * 100}%`;
  const sy1 = (rect: Rect) => `${(rect.y / h) * 100}%`;
  const sw1 = (rect: Rect) => `${(rect.width / w1) * 100}%`;
  const sh1 = (rect: Rect) => `${(rect.height / h) * 100}%`;

  const sx2 = (rect: Rect) => `${(rect.x / w2) * 100}%`;
  const sy2 = (rect: Rect) => `${(rect.y / h) * 100}%`;
  const sw2 = (rect: Rect) => `${(rect.width / w2) * 100}%`;
  const sh2 = (rect: Rect) => `${(rect.height / h) * 100}%`;

  return variant === 'before' ? (
    <div className={styles.wrapper}>
      <div className={styles.inner} style={{ maxWidth: w1 }}>
        {matching.matches.map((m, i) => (
          <React.Fragment key={i}>
            <div
              className={styles.bounding}
              style={{
                top: sy1(m[1].bounding),
                left: sx1(m[1].bounding),
                width: sw1(m[1].bounding),
                height: sh1(m[1].bounding),
              }}
            />
            {m[1].diffMarkers.map((r, n) => (
              <React.Fragment key={n}>
                <div
                  className={styles.diff}
                  style={{
                    top: sy2(r),
                    left: sx2(r),
                    width: sw2(r),
                    height: sh2(r),
                  }}
                />
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
        {matching.strayingRects[1].map((r, i) => (
          <div
            key={i}
            className={styles.straying}
            style={{
              top: sy2(r),
              left: sx2(r),
              width: sw2(r),
              height: sh2(r),
            }}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className={styles.wrapper}>
      <div className={styles.inner} style={{ maxWidth: w2 }}>
        {matching.matches.map((m, i) => (
          <React.Fragment key={i}>
            <div
              className={styles.bounding}
              style={{
                top: sy1(m[0].bounding),
                left: sx1(m[0].bounding),
                width: sw1(m[0].bounding),
                height: sh1(m[0].bounding),
              }}
            />
            {m[0].diffMarkers.map((r, n) => (
              <React.Fragment key={n}>
                <div
                  className={styles.diff}
                  style={{
                    top: sy1(r),
                    left: sx1(r),
                    width: sw1(r),
                    height: sh1(r),
                  }}
                />
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
        {matching.strayingRects[0].map((r, i) => (
          <div
            key={i}
            className={styles.straying}
            style={{
              top: sy1(r),
              left: sx1(r),
              width: sw1(r),
              height: sh1(r),
            }}
          />
        ))}
      </div>
    </div>
  );
};
