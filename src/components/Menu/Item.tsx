import React from 'react';
import styled from 'styled-components';
import { BaseButton, Props as BaseButtonProps } from '../internal/BaseButton';
import { Color, Space, Typography } from '../../styles/variables';
import { Ellipsis } from '../internal/Ellipsis';

const Inner = styled(BaseButton)`
  ${Typography.BODY2};
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  padding: ${Space * 1}px ${Space * 2}px;
  border: 0;
  background: ${Color.WHITE};
  color: ${Color.DEFAULT};
  text-align: left;

  &:hover {
    background-color: ${Color.HOVER_BLACK};
  }

  &:focus {
    z-index: 2;
  }
`;

export type Props = BaseButtonProps;

export const Item: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <li>
      <Inner {...rest}>
        <Ellipsis>{children}</Ellipsis>
      </Inner>
    </li>
  );
};
