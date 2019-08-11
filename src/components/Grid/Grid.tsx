import React from 'react';
import styled from 'styled-components';
import { Space } from '../../styles/variables';
import { Cell } from './Cell';

const DEFAULT_GAP = Space * 3;

const formatColumnsOrRows = (value: number | string) => (typeof value === 'number' ? `repeat(${value}, 1fr)` : value);

const styles = (config: GridConfig | undefined) =>
  config == null
    ? ''
    : `
  grid-gap: ${config.gap ? `${config.gap}px` : `${DEFAULT_GAP}px`};
  ${config.columns && `grid-template-columns: ${formatColumnsOrRows(config.columns)}`};
  ${config.rows && `grid-template-rows: ${formatColumnsOrRows(config.rows)}`};
`;

const Wrapper = styled.div<Props>`
  display: grid;
  ${(props) => styles(props.xs)}
`;

export type GridConfig = {
  gap?: number;
  columns?: number | React.CSSProperties['gridTemplateColumns'];
  rows?: number | React.CSSProperties['gridTemplateRows'];
};

export type Props = {
  xs: GridConfig;
  sm?: GridConfig;
  md?: GridConfig;
  lg?: GridConfig;
  xl?: GridConfig;
};

export const Grid: React.FC<Props> & {
  Cell: typeof Cell;
} = ({ children, ...rest }) => <Wrapper {...rest}>{children}</Wrapper>;

Grid.Cell = Cell;

Grid.defaultProps = {
  xs: {
    columns: 12,
    gap: DEFAULT_GAP,
  },
};
