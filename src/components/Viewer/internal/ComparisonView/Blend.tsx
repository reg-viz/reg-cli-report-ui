import React from 'react';
import styled from 'styled-components';
import { Image } from '../../../Image';
import { useComparisonImage } from './useComparisonImage';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Inner = styled.div`
  position: relative;
`;

const Before = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  width: 100%;
  transform: translate(-50%, -50%);
`;

const After = styled.div`
  position: absolute;
  z-index: 2;
`;

export type Props = {
  before: string;
  after: string;
  value: number;
};

export const Blend: React.FC<Props> = ({ before, after, value }) => {
  const { canvas, image } = useComparisonImage(before, after);

  return (
    <Wrapper style={{ visibility: image.loaded ? 'visible' : 'hidden' }}>
      <Inner style={canvas}>
        <Before>
          <Image ref={image.before.ref} src={before} onLoad={image.before.handleLoad} />
        </Before>

        <After
          style={{
            top: canvas.height / 2 - image.after.height / 2,
            left: canvas.width / 2 - image.after.width / 2,
            width: image.after.width,
            height: image.after.height,
            opacity: value,
          }}>
          <Image ref={image.after.ref} src={after} onLoad={image.after.handleLoad} />
        </After>
      </Inner>
    </Wrapper>
  );
};
