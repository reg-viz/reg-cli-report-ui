import React from 'react';
import * as styles from './VisuallyHidden.css';

export type Props = React.PropsWithChildren<{}>;

export const VisuallyHidden = ({ children, ...rest }: Props) => (
  <div {...rest} className={styles.wrapper}>
    {children}
  </div>
);
