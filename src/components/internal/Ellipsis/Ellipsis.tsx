import styled, { css } from 'styled-components';

export type Props = {
  line?: number;
};

const single = css`
  display: block;
  white-space: nowrap;
`;

const multiple = (line: number) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${line};
  -webkit-box-orient: vertical;
`;

export const Ellipsis = styled.span<Props>`
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ line }) => (line == null || line === 1 ? single : multiple(line))};
`;

Ellipsis.defaultProps = {
  line: 1,
};
