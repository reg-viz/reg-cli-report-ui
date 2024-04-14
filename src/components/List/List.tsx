import React from 'react';
import { Expandable } from './Expandable';
import { Item } from './Item';
import * as styles from './List.css';

export type Props = React.PropsWithChildren<{
  header?: React.ReactNode;
}>;

export const List = ({ header, children, ...rest }: Props) => (
  <div {...rest}>
    {header == null ? null : <div className={styles.header}>{header}</div>}
    <ul className={styles.list}>{children}</ul>
  </div>
);

List.Item = Item;
List.Expandable = Expandable;
