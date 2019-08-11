import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

export type Props = {};

export const Cell: React.FC<Props> = ({ children, ...rest }) => <Wrapper {...rest}>{children}</Wrapper>;
