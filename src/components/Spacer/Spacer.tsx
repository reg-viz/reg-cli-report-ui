import React from 'react';
import styled from 'styled-components';
import { Space } from '../../styles/variables';

const Wrapper = styled.span`
  display: block;
`;

type Variant = 'margin' | 'padding';

const variantMap: { [P in Variant]: string } = {
  margin: 'marginTop',
  padding: 'paddingTop',
};

export type Props = {
  variant: 'margin' | 'padding';
  x: number;
};

export const Spacer: React.FC<Props> = ({ variant, x }) => (
  <Wrapper style={{ [variantMap[variant]]: Space * x }} />
);
