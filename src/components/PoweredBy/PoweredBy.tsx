import React from 'react';
import styled from 'styled-components';
import { Space, FontSize, Color, LineHeight } from '../../styles/variables';
import { Logo } from '../Logo';
import { BaseButton } from '../internal/BaseButton';

const REG_VIS_URL = 'https://github.com/reg-viz';

const Button = styled(BaseButton)`
  display: flex;
  align-items: center;
  padding: ${Space * 3}px ${Space * 2}px;
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
    margin: 0;
    color: ${Color.DEFAULT};
    line-height: ${LineHeight.SMALL};
    font-size: ${FontSize.MEDIUM};
  }

  & p {
    margin: 0;
    color: ${Color.GRAY};
    font-size: ${FontSize.X_SMALL};
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
