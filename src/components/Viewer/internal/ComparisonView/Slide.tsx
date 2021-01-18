import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Image } from '../../../Image';
import { Color } from '../../../../styles/variables';
import type { Matching } from '../../../../types/reg';
import { useComparisonImage } from './useComparisonImage';
import { Markers } from './Markers';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Inner = styled.div`
  position: relative;
`;

const Range = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  margin: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  appearance: none;
  touch-action: auto;
`;

const Frame = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 2;
  overflow: hidden;
`;

const View = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  transform: translate(-50%, 0);
`;

const Before = styled(View)`
  z-index: 0;
  transform: translate(0, 0);
`;

const After = styled(View)`
  z-index: 1;
`;

const Handle = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  margin-left: -22px;
  width: 44px;
  z-index: 5;
  cursor: ew-resize;
`;

const HandleBar = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -1px;
  width: 2px;
  background: #fff;

  &::before,
  &::after {
    position: absolute;
    left: 50%;
    display: block;
    margin-left: -6px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 3px solid ${Color.BRAND_PRIMARY};
    background: transparent;
    content: '';
  }

  &::before {
    bottom: 100%;
  }

  &::after {
    top: 100%;
  }
`;

export type Props = {
  before: string;
  after: string;
  value: number;
  matching: Matching | null;
  onChange: (value: number) => void;
};

export const Slide: React.FC<Props> = ({
  before,
  after,
  value,
  matching,
  onChange,
}) => {
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
        ('touches' in e ? e.touches[0].pageX : e.pageX) - window.pageXOffset;

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
    <Wrapper style={{ visibility: image.loaded ? 'visible' : 'hidden' }}>
      <Inner ref={innerRef} style={canvas}>
        <Range
          ref={rangeRef}
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

        <Frame style={{ width: `${value}%` }}>
          <Before
            style={{
              top: 0,
              left: canvas.width / 2 - image.before.width / 2,
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
          </Before>
        </Frame>

        <After
          style={{
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
        </After>

        <Handle style={{ left: `${value}%` }}>
          <HandleBar />
        </Handle>
      </Inner>
    </Wrapper>
  );
};
