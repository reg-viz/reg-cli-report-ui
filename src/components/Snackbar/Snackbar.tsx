import React from 'react';
import * as styles from './Snackbar.css';

export type Props = React.ComponentPropsWithoutRef<'div'>;

export const Snackbar = ({ children, ...rest }: Props) => (
  <div {...rest} className={styles.wrapper}>
    <p className={styles.content}>{children}</p>
  </div>
);
