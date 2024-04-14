import { clsx } from 'clsx';
import React, { useCallback } from 'react';
import { BaseButton } from '../../../internal/BaseButton';
import * as styles from './Toggle.css';

export type Props = {
  open: boolean;
  onClick: () => void;
};

export const Toggle = ({ open, onClick }: Props) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onClick();
    },
    [onClick],
  );

  return (
    <BaseButton
      className={styles.wrapper}
      aria-label={open ? 'Close sidebar' : 'Open sidebar'}
      aria-controls="sidebar"
      onClick={handleClick}
    >
      <span
        className={clsx({
          [styles.line.firstClose]: !open,
          [styles.line.firstOpen]: open,
        })}
      />
      <span
        className={clsx({
          [styles.line.secondClose]: !open,
          [styles.line.secondOpen]: open,
        })}
      />
      <span
        className={clsx({
          [styles.line.thirdClose]: !open,
          [styles.line.thirdOpen]: open,
        })}
      />
    </BaseButton>
  );
};
