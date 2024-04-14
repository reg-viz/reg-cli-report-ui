import { clsx } from 'clsx';
import React from 'react';
import type { Modify } from '../../../utils/types';
import * as styles from './Ellipsis.css';

export type Props = Modify<
  React.ComponentPropsWithoutRef<'span'>,
  {
    line?: number;
  }
>;

export const Ellipsis = ({ line = 1, children, ...rest }: Props) => {
  return (
    <span
      {...rest}
      style={
        {
          '--ellipsis-line': line,
        } as React.CSSProperties
      }
      className={clsx(styles.wrapper, {
        [styles.variants.single]: line === 1,
        [styles.variants.multiple]: line > 1,
      })}
    >
      {children}
    </span>
  );
};
