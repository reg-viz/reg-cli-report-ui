import React from 'react';
import styled from 'styled-components';
import { Image } from '../../../Image';
import type { Matching } from '../../../../types/reg';
import { Markers } from './Markers';
import { useComparisonImage } from './useComparisonImage';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    position: relative;
  }
`;

const Inner = styled.div`
  position: relative;
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
`;

const After = styled(View)`
  z-index: 1;
`;

export type Props = {
  before: string;
  after: string;
  checked: boolean;
  matching: Matching | null;
};

export const Toggle: React.FC<Props> = ({
  before,
  after,
  checked,
  matching,
}) => {
  const { canvas, image } = useComparisonImage(before, after);

  return (
    <Wrapper style={{ visibility: image.loaded ? 'visible' : 'hidden' }}>
      <Inner style={canvas}>
        <Before
          style={{
            visibility: checked ? 'hidden' : 'visible',
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

        <After
          style={{
            visibility: checked ? 'visible' : 'hidden',
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
      </Inner>
    </Wrapper>
  );
};
