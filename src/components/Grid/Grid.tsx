import React from 'react';
import styled from 'styled-components';
import { Space, BreakPoint } from '../../styles/variables';
import { Cell } from './Cell';

const DEFAULT_GAP = Space * 3;

const formatColumnsOrRows = (value: number | string) => (typeof value === 'number' ? `repeat(${value}, 1fr)` : value);

const styles = (config: GridConfig | undefined) => {
  if (config == null) {
    return '';
  }

  const list = [`grid-gap: ${config.gap ? `${config.gap}px` : `${DEFAULT_GAP}px`}`];

  if (config.columns) {
    list.push(`grid-template-columns: ${formatColumnsOrRows(config.columns)}`);
  }

  if (config.rows) {
    list.push(`grid-template-rows: ${formatColumnsOrRows(config.rows)}`);
  }

  return list.join(';');
};

const Wrapper = styled.div<Props>`
  display: grid;
  ${(props) => styles(props.xs)};
  padding: 0;
  margin: 0;
  list-style: none;

  @media (min-width: ${BreakPoint.SMALL}px) {
    ${(props) => styles(props.sm)};
  }

  @media (min-width: ${BreakPoint.MEDIUM}px) {
    ${(props) => styles(props.md)};
  }

  @media (min-width: ${BreakPoint.LARGE}px) {
    ${(props) => styles(props.lg)};
  }

  @media (min-width: ${BreakPoint.X_LARGE}px) {
    ${(props) => styles(props.xl)};
  }
`;

export type GridConfig = {
  gap?: number;
  columns?: number | React.CSSProperties['gridTemplateColumns'];
  rows?: number | React.CSSProperties['gridTemplateRows'];
};

export type Props = {
  component?: keyof JSX.IntrinsicElements;
  xs: GridConfig;
  sm?: GridConfig;
  md?: GridConfig;
  lg?: GridConfig;
  xl?: GridConfig;
};

export const Grid: React.FC<Props> & {
  Cell: typeof Cell;
} = ({ component, children, ...rest }) => (
  <Wrapper as={component as any} {...rest}>
    {children}
  </Wrapper>
);

Grid.Cell = Cell;

Grid.defaultProps = {
  component: 'div',
  xs: {
    columns: 12,
    gap: DEFAULT_GAP,
  },
};
