import React, { forwardRef } from 'react';
import styled from 'styled-components';
import {
  Space,
  Duration,
  Easing,
  Typography,
  Color,
  BreakPoint,
} from '../../../../styles/variables';
import type { Props as BaseButtonProps } from '../../../internal/BaseButton';
import { BaseButton } from '../../../internal/BaseButton';

const SIZE = 44;

const Wrapper = styled(BaseButton)<{ active: boolean }>`
  ${Typography.BUTTON};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${SIZE}px;
  padding: 0 ${Space * 1}px;
  border: none;
  border-radius: ${SIZE}px;
  background: transparent;
  color: ${({ active }) => (active ? Color.WHITE : Color.TEXT_BASE)};
  text-align: center;
  cursor: ${({ active }) => (active ? 'default' : 'pointer')};
  user-select: ${({ active }) => (active ? 'none' : 'auto')};

  & > span {
    position: relative;
    z-index: 1;
  }

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    display: block;
    border-radius: ${SIZE}px;
    background: ${Color.BRAND_PRIMARY};
    opacity: ${({ active }) => (active ? '1' : '0')};
    transition: all ${Duration.SMALL_OUT}ms ${Easing.BACK};
    transform: ${({ active }) => (active ? 'scale(1)' : 'scale(0.9)')};
    content: '';
  }

  &:hover {
    background-color: ${Color.HOVER_BLACK};
  }

  @media (min-width: ${BreakPoint.SMALL}px) {
    padding: 0 ${Space * 2}px;
  }
`;

export type Props = BaseButtonProps & {
  active?: boolean;
};

export const ChoiceButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  Props
>(({ active, children, ...rest }, ref) => (
  <Wrapper {...rest} ref={ref} active={active!}>
    <span>{children}</span>
  </Wrapper>
));

ChoiceButton.defaultProps = {
  active: false,
};
