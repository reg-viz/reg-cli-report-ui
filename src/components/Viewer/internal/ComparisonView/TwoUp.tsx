import React from 'react';
import styled from 'styled-components';
import { Image } from '../../../Image';
import { Space, BreakPoint } from '../../../../styles/variables';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${Space * 1}px;
  justify-content: center;
  align-items: center;

  @media (min-width: ${BreakPoint.MEDIUM}px) {
    grid-gap: ${Space * 3}px;
  }
`;

export type Props = {
  before: string;
  after: string;
};

export const TwoUp: React.FC<Props> = ({ before, after }) => {
  return (
    <Wrapper>
      <div>
        <Image src={before} />
      </div>
      <div>
        <Image src={after} />
      </div>
    </Wrapper>
  );
};
