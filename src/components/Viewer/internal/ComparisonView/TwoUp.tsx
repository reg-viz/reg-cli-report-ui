import React from 'react';
import styled from 'styled-components';
import { Image } from '../../../Image';
import { Space } from '../../../../styles/variables';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: ${Space * 3}px;
  justify-content: center;
  align-items: center;
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
