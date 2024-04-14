import React from 'react';
import type { Modify } from '../../utils/types';
import * as styles from './Container.css';

export type Props = Modify<
  React.HTMLAttributes<HTMLDivElement>,
  {
    children: React.ReactNode;
  }
>;

export const Container = ({ children, ...rest }: Props) => (
  <div className={styles.wrapper} {...rest}>
    {children}
  </div>
);
