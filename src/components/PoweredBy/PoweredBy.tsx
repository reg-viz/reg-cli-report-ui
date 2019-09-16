import React from 'react';
import styled from 'styled-components';
import { Space, Color, Typography } from '../../styles/variables';
import { Logo } from '../Logo';
import { BaseButton } from '../internal/BaseButton';

const REG_VIS_URL = 'https://github.com/reg-viz';

const Button = styled(BaseButton)`
  display: flex;
  align-items: center;
  padding: ${Space * 3}px ${Space * 2}px;
  min-width: 280px;
  background: transparent;

  &:hover {
    background-color: ${Color.HOVER_BLACK};
  }
`;

const Icon = styled.span`
  margin-right: ${Space * 1}px;
`;

const Text = styled.span`
  & h3 {
    ${Typography.SUBTITLE3};
    margin: 0;
    color: ${Color.DEFAULT};
  }

  & p {
    ${Typography.BODY3};
    margin: 0;
    color: ${Color.GRAY};
  }
`;

export type Props = {};

export const PoweredBy: React.FC<Props> = () => (
  <aside>
    <Button href={REG_VIS_URL}>
      <Icon>
        <Logo size={23} />
      </Icon>
      <Text>
        <h3>Powered by reg-viz</h3>
        <p>https://github.com/reg-viz</p>
      </Text>
    </Button>
  </aside>
);
