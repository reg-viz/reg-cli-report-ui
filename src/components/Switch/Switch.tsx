import React from 'react';
import type { Modify } from '../../utils/types';
import * as styles from './Switch.css';

export type Props = Modify<
  Omit<React.ComponentPropsWithoutRef<'input'>, 'type'>,
  {
    id: string;
    prepend?: React.ReactNode;
    append?: React.ReactNode;
  }
>;

export const Switch = ({ id, prepend, append, ...rest }: Props) => {
  const prependId = `${id}-prepend`;
  const appendId = `${id}-append`;
  const describedby = [];

  if (prepend != null) {
    describedby.push(prependId);
  }

  if (append != null) {
    describedby.push(appendId);
  }

  return (
    <span className={styles.wrapper}>
      {prepend && (
        <span className={styles.prepend} id={prependId}>
          {prepend}
        </span>
      )}

      <span className={styles.checkbox}>
        <input
          {...rest}
          className={styles.checkboxInput}
          id={id}
          type="checkbox"
          aria-describedby={describedby.join(' ')}
        />
        <span className={styles.checkboxVisual} />
      </span>

      {append && (
        <span className={styles.append} id={appendId}>
          {append}
        </span>
      )}
    </span>
  );
};
