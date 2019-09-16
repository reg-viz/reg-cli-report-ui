import React from 'react';
import styled from 'styled-components';
import { Space, Color, Shadow, Typography } from '../../styles/variables';

const Wrapper = styled.div`
  ${Typography.SUBTITLE3};
  padding: ${Space * 1.5}px ${Space * 2}px;
  box-shadow: ${Shadow.LEVEL2};
  border-radius: 2px;
  background: ${Color.GRAY_DARK};
  color: ${Color.WHITE};
  text-align: center;
`;

const Content = styled.p`
  margin: 0;
`;

export type Props = React.ComponentPropsWithoutRef<'div'> & {};

export const Snackbar: React.FC<Props> = ({ children, ...rest }) => (
  <Wrapper {...rest}>
    <Content>{children}</Content>
  </Wrapper>
);
