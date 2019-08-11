import React from 'react';
import styled from 'styled-components';
import { Space, Color, FontSize, Shadow } from '../../styles/variables';

const Wrapper = styled.div`
  padding: ${Space * 1.5}px ${Space * 2}px;
  box-shadow: ${Shadow.LEVEL2};
  border-radius: 2px;
  background: ${Color.GRAY_DARK};
  color: ${Color.WHITE};
  text-align: center;
  font-weight: bold;
  font-size: ${FontSize.SMALL};
  line-height: 1.3;
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
