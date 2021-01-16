import React from 'react';
import styled from 'styled-components';
import { Space, BreakPoint } from '../../styles/variables';

const Wrapper = styled.div`
  padding-right: ${Space * 3}px;
  padding-left: ${Space * 3}px;

  @media (min-width: ${BreakPoint.MEDIUM}px) {
    padding-right: ${Space * 5}px;
    padding-left: ${Space * 5}px;
  }
`;

export type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export const Container: React.FC<Props> = ({ children, ...rest }) => (
  <Wrapper {...rest}>{children}</Wrapper>
);
