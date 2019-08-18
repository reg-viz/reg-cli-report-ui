import React from 'react';
import styled from 'styled-components';
import { Image } from '../../../Image';
import { Matching } from '../../../../types/reg';
import { Markers } from './Markers';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    position: relative;
  }
`;

export type Props = {
  before: string;
  after: string;
  checked: boolean;
  matching: Matching | null;
};

export const Toggle: React.FC<Props> = ({ before, after, checked, matching }) => (
  <Wrapper>
    <div>
      <Image src={checked ? after : before} />
      <Markers variant={checked ? 'after' : 'before'} matching={matching} />
    </div>
  </Wrapper>
);
