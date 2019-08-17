import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

export type Props = {
  component?: keyof JSX.IntrinsicElements;
};

export const Cell: React.FC<Props> = ({ component, children, ...rest }) => (
  <Wrapper as={component as any} {...rest}>
    {children}
  </Wrapper>
);

Cell.defaultProps = {
  component: 'div',
};
