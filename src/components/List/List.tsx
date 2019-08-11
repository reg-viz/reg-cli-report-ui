import React from 'react';
import styled from 'styled-components';
import { Color, FontSize, Space } from '../../styles/variables';
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
  margin-bottom: ${Space / 2}px;
  padding: 0 ${Space * 2}px;
  color: ${Color.GRAY};
  font-weight: bold;
  font-size: ${FontSize.SMALL};
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
