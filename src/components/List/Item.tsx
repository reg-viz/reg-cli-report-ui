import React from 'react';
import styled from 'styled-components';
import { Space, Color, FontSize } from '../../styles/variables';
import { BaseButton, Props as BaseButtonProps } from '../internal/BaseButton';
import { Ellipsis } from '../internal/Ellipsis';

const LinkButton = styled(BaseButton)<{ depth: number }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 44px;
  padding-left: ${({ depth }) => Space * 2 + Space * 2 * depth}px;
  padding-right: ${Space * 2}px;
  color: ${Color.DEFAULT};
  text-align: left;
  font-size: ${FontSize.SMALL};

  &:hover {
    background-color: ${Color.HOVER_BLACK};
  }
`;

export type Props = BaseButtonProps & {
  depth?: number;
};

export const Item: React.FC<Props> = ({ depth, href, children }) => (
  <li>
    <LinkButton depth={depth as number} href={href}>
      <Ellipsis>{children}</Ellipsis>
    </LinkButton>
  </li>
);

Item.defaultProps = {
  depth: 0,
};
