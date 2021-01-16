import React from 'react';
import styled from 'styled-components';

/**
 * @see https://github.com/cvializ/amphtml/blob/70d2c6a4d8b3e51bea21918e907ef2a5e9e33e50/css/amp.css#L244-L274
 */
const Wrapper = styled.div`
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  display: block !important;
  visibility: visible !important;
  overflow: hidden !important;
  margin: 0 !important;
  padding: 0 !important;
  width: 4px !important;
  height: 4px !important;
  border: none !important;
  opacity: 0 !important;
`;

export type Props = {};

export const VisuallyHidden: React.FC<Props> = ({ children, ...rest }) => (
  <Wrapper {...rest}>{children}</Wrapper>
);
