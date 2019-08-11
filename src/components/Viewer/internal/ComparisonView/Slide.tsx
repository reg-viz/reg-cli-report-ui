import React, { useState } from 'react';
import styled from 'styled-components';
import { Image } from '../../../Image';
import { Color } from '../../../../styles/variables';
import { useComparisonImage } from './useComparisonImage';

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

const Before = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  width: 100%;
  transform: translate(-50%, -50%);
`;

const Frame = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 2;
  overflow: hidden;
`;

const After = styled.div`
  position: absolute;
`;

const Handle = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  margin-left: -22px;
  width: 44px;
  z-index: 3;
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
    border: 3px solid ${Color.PRIMARY};
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
};

export const Slide: React.FC<Props> = ({ before, after }) => {
  const { canvas, image } = useComparisonImage(before, after);

  const [position, setPosition] = useState(50);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(parseInt(e.target.value, 10));
  };

  return (
    <Wrapper style={{ visibility: image.loaded ? 'visible' : 'hidden' }}>
      <Inner style={canvas}>
        <Range
          type="range"
          min={0}
          max={100}
          value={position}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={position}
          aria-label="Percent of revealed content"
          onChange={handleChange}
        />

        <Before
          style={{
            width: image.before.width,
            height: image.before.height,
          }}>
          <Image ref={image.before.ref} src={before} onLoad={image.before.handleLoad} />
        </Before>

        <Frame style={{ width: `${position}%` }}>
          <After
            style={{
              top: canvas.height / 2 - image.after.height / 2,
              left: canvas.width / 2 - image.after.width / 2,
              width: image.after.width,
              height: image.after.height,
            }}>
            <Image ref={image.after.ref} src={after} onLoad={image.after.handleLoad} />
          </After>
        </Frame>

        <Handle style={{ left: `${position}%` }}>
          <HandleBar />
        </Handle>
      </Inner>
    </Wrapper>
  );
};
