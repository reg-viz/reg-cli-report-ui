import React from 'react';
import styled from 'styled-components';
import { Space, Typography, Color } from '../../styles/variables';
import type { Props as BaseButtonProps } from '../internal/BaseButton';
import { BaseButton } from '../internal/BaseButton';
import { Ellipsis } from '../internal/Ellipsis';

const LinkButton = styled(BaseButton)<{ depth: number }>`
  ${Typography.BODY2};
  display: flex;
  align-items: center;
  width: 100%;
  height: 44px;
  padding-left: ${({ depth }) => Space * 2 + Space * 2 * depth}px;
  padding-right: ${Space * 2}px;
  color: ${Color.TEXT_BASE};
  text-align: left;

  &:hover {
    background-color: ${Color.HOVER_BLACK};
  }
`;

export type Props = BaseButtonProps & {
  depth?: number;
};

export const Item: React.FC<Props> = ({ depth, href, children, ...rest }) => (
  <li>
    <LinkButton depth={depth as number} href={href} {...rest}>
      <Ellipsis>{children}</Ellipsis>
    </LinkButton>
  </li>
);

Item.defaultProps = {
  depth: 0,
};
