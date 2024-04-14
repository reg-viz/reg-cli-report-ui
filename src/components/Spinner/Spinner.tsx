import React from 'react';
import MDSpinner from 'react-md-spinner';
import { Color } from '../../styles/variables.css';

export type Props = {
  size?: number;
  color?: Color;
  'aria-label': string;
};

export const Spinner = ({
  size = 32,
  color = Color.BRAND_PRIMARY,
  ...rest
}: Props) => <MDSpinner {...rest} size={size} singleColor={color} />;
