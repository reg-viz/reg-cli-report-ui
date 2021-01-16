import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAySURBVHgB7dAxDgAwCAJA2nTk/y9lr35ABuPorYSQcH5CQVIV4aJpi8Zzl5PE+OIWjQDL+Qn2c7fZmAAAAABJRU5ErkJggg==');
`;

export type Props = React.ComponentPropsWithoutRef<'span'>;

export const Transparent: React.FC<Props> = ({ ...rest }) => (
  <Wrapper {...rest} />
);
