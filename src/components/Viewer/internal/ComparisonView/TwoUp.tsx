import React from 'react';
import styled from 'styled-components';
import { Image } from '../../../Image';
import { Space, BreakPoint } from '../../../../styles/variables';
import type { Matching } from '../../../../types/reg';
import { Markers } from './Markers';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${Space * 1}px;
  justify-content: center;
  align-items: start;

  @media (min-width: ${BreakPoint.MEDIUM}px) {
    grid-gap: ${Space * 3}px;
  }

  & > div {
    position: relative;
  }
`;

export type Props = {
  before: string;
  after: string;
  matching: Matching | null;
};

export const TwoUp: React.FC<Props> = ({ before, after, matching }) => {
  return (
    <Wrapper>
      <div>
        <Image src={before} />
        <Markers variant="before" matching={matching} />
      </div>
      <div>
        <Image src={after} />
        <Markers variant="after" matching={matching} />
      </div>
    </Wrapper>
  );
};
