import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { Color } from '../../styles/variables';
import type { Props as BaseButtonProps } from '../internal/BaseButton';
import { BaseButton } from '../internal/BaseButton';

const SIZE = 40;

const variants = {
  light: {
    normal: 'transparent',
    hover: Color.HOVER_BLACK,
  },
  dark: {
    normal: 'transparent',
    hover: Color.HOVER_WHITE,
  },
};

type Variant = keyof typeof variants;

const Wrapper = styled(BaseButton)<{ normal: string; hover: string }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${SIZE}px;
  height: ${SIZE}px;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: ${({ normal }) => normal};
  font-size: 0;
  line-height: 0;

  &:hover {
    background-color: ${({ hover }) => hover};
  }
`;

export type Props = BaseButtonProps & {
  variant?: Variant;
};

export const IconButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  Props
>(({ variant, children, ...rest }, ref) => (
  <Wrapper ref={ref as any} {...variants[variant as Variant]} {...rest}>
    {children}
  </Wrapper>
));

IconButton.defaultProps = {
  variant: 'light',
};
