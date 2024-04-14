import React from 'react';
import * as styles from './Spacer.css';

export type Props = {
  variant: 'margin' | 'padding';
  x: number;
};

export const Spacer = ({ variant, x }: Props) => (
  <span
    className={styles.wrapper[variant]}
    style={
      {
        '--spacer-x': x,
      } as React.CSSProperties
    }
  />
);
