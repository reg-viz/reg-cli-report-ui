import React from 'react';
import styled from 'styled-components';
import { Space, Typography, Color } from '../../styles/variables';
import { Item } from './Item';
import { Expandable } from './Expandable';

const Wrapper = styled.div`
  & > ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

const Header = styled.div`
  ${Typography.SUBHEAD};
  margin-bottom: ${Space / 2}px;
  padding: 0 ${Space * 2}px;
  color: ${Color.TEXT_SUB};
`;

export type Props = {
  header?: React.ReactNode;
};

export const List: React.FC<Props> & {
  Item: typeof Item;
  Expandable: typeof Expandable;
} = ({ header, children, ...rest }) => (
  <Wrapper {...rest}>
    {header == null ? null : <Header>{header}</Header>}
    <ul>{children}</ul>
  </Wrapper>
);

List.Item = Item;
List.Expandable = Expandable;
