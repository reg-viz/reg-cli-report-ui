import React from 'react';
import styled from 'styled-components';
import { Space } from '../../styles/variables';

const Wrapper = styled.div`
  padding-right: ${Space * 5}px;
  padding-left: ${Space * 5}px;
`;

export type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export const Container: React.FC<Props> = ({ children, ...rest }) => <Wrapper {...rest}>{children}</Wrapper>;
