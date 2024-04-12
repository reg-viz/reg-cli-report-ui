import React from 'react';
import MDSpinner from 'react-md-spinner';
import { Color } from '../../styles/variables';

export type Props = {
  size?: number;
  color?: Color;
  'aria-label': string;
};

export const Spinner = ({ size, color, ...rest }: Props) => (
  <MDSpinner {...rest} size={size} singleColor={color} />
);

Spinner.defaultProps = {
  size: 32,
  color: Color.BRAND_PRIMARY,
};
