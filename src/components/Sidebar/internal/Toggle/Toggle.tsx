import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Duration, Easing, Color } from '../../../../styles/variables';
import { BaseButton } from '../../../internal/BaseButton';

const Wrapper = styled(BaseButton)<{ open: boolean }>`
  position: relative;
  display: block;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 4px;
  background: transparent;

  & > span {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    margin-left: -19px;
    height: 4px;
    border-radius: 4px;
    background: ${Color.TEXT_BASE};
    transition: all ${Duration.MEDIUM_OUT}ms ${Easing.STANDARD};
  }

  & > span:nth-child(1) {
    margin-top: -13px;
    width: ${({ open }) => (open ? '38px' : '30px')};
    transform: ${({ open }) =>
      open ? 'rotate(225deg) translate(-7px, -8px)' : undefined};
    will-change: width;
  }

  & > span:nth-child(2) {
    margin-top: -2.5px;
    width: 38px;
    transform: ${({ open }) => (open ? 'rotate(135deg)' : undefined)};
  }

  & > span:nth-child(3) {
    margin-top: 10px;
    width: 22px;
    transform: ${({ open }) =>
      open ? 'rotate(45deg) translate(-4px, -6px)' : undefined};
    opacity: ${({ open }) => (open ? '0' : '1')};
  }
`;

export type Props = {
  open: boolean;
  onClick: () => void;
};

export const Toggle: React.FC<Props> = ({ open, onClick }) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onClick();
    },
    [onClick],
  );

  return (
    <Wrapper
      open={open}
      aria-label={open ? 'Close sidebar' : 'Open sidebar'}
      aria-controls="sidebar"
      onClick={handleClick}
    >
      <span />
      <span />
      <span />
    </Wrapper>
  );
};
