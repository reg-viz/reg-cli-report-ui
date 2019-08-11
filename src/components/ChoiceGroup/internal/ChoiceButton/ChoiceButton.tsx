import React from 'react';
import styled from 'styled-components';
import { Space, FontSize, Color, Duration, Easing } from '../../../../styles/variables';
import { BaseButton, Props as BaseButtonProps } from '../../../internal/BaseButton';

const SIZE = 44;

const Wrapper = styled(BaseButton)<{ active: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: ${SIZE}px;
  padding: 0 ${Space * 2}px;
  border: none;
  border-radius: ${SIZE}px;
  background: transparent;
  color: ${({ active }) => (active ? Color.WHITE : Color.DEFAULT)};
  text-align: center;
  font-weight: bold;
  font-size: ${FontSize.SMALL};
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
    background: ${Color.PRIMARY};
    opacity: ${({ active }) => (active ? '1' : '0')};
    transition: all ${Duration.SMALL_OUT}ms ${Easing.BACK};
    transform: ${({ active }) => (active ? 'scale(1)' : 'scale(0.9)')};
    content: '';
  }

  &:hover {
    background-color: ${Color.HOVER_BLACK};
  }
`;

export type Props = BaseButtonProps & {
  active?: boolean;
};

export const ChoiceButton: React.FC<Props> = ({ active, children, ...rest }) => (
  <Wrapper {...rest} active={active as boolean}>
    <span>{children}</span>
  </Wrapper>
);

ChoiceButton.defaultProps = {
  active: false,
};
