import React from 'react';
import styled, { css } from 'styled-components';
import type { Matching, Rect } from '../../../../types/reg';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
`;

const Inner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const rectStyles = css`
  position: absolute;
  border-width: 1px;
  border-style: solid;
  border-radius: 2px;
`;

const Bounding = styled.div`
  ${rectStyles};
  border-width: 1px;
  border-color: #4183c4;
`;

const Diff = styled.div`
  ${rectStyles};
  border-color: #ff108a;
`;

const Straying = styled.div`
  ${rectStyles};
  border-color: #2aacea;
`;

export type Props = {
  variant: 'before' | 'after';
  matching: Matching | null;
};

export const Markers: React.FC<Props> = ({ variant, matching }) => {
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
    <Wrapper>
      <Inner style={{ maxWidth: w1 }}>
        {matching.matches.map((m, i) => (
          <React.Fragment key={i}>
            <Bounding
              style={{
                top: sy1(m[1].bounding),
                left: sx1(m[1].bounding),
                width: sw1(m[1].bounding),
                height: sh1(m[1].bounding),
              }}
            />
            {m[1].diffMarkers.map((r, n) => (
              <React.Fragment key={n}>
                <Diff
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
          <Straying
            key={i}
            style={{
              top: sy2(r),
              left: sx2(r),
              width: sw2(r),
              height: sh2(r),
            }}
          />
        ))}
      </Inner>
    </Wrapper>
  ) : (
    <Wrapper>
      <Inner style={{ maxWidth: w2 }}>
        {matching.matches.map((m, i) => (
          <React.Fragment key={i}>
            <Bounding
              style={{
                top: sy1(m[0].bounding),
                left: sx1(m[0].bounding),
                width: sw1(m[0].bounding),
                height: sh1(m[0].bounding),
              }}
            />
            {m[0].diffMarkers.map((r, n) => (
              <React.Fragment key={n}>
                <Diff
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
          <Straying
            key={i}
            style={{
              top: sy1(r),
              left: sx1(r),
              width: sw1(r),
              height: sh1(r),
            }}
          />
        ))}
      </Inner>
    </Wrapper>
  );
};
