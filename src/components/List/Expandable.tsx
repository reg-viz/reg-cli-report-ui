import { clsx } from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import { ArrowUpIcon } from '../icons/ArrowUpIcon';
import { BaseButton } from '../internal/BaseButton';
import { Collapse } from '../internal/Collapse';
import { Ellipsis } from '../internal/Ellipsis';
import { Color, Duration } from '../../styles/variables.css';
import * as styles from './Expandable.css';

export type Props = React.PropsWithChildren<{
  large?: boolean;
  depth?: number;
  open?: boolean;
  defaultOpen?: boolean;
  label: React.ReactNode;
  meta?: React.ReactNode;
  icon?: React.ReactNode;
  onChange?: (open: boolean) => void;
}>;

export const Expandable = ({
  open: openProp,
  defaultOpen,
  large,
  depth = 0,
  label,
  meta,
  icon,
  children,
  onChange,
}: Props) => {
  const [open, setOpen] = useState(defaultOpen ?? false);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (openProp == null) {
        setOpen((prev) => !prev);
      }

      if (onChange != null) {
        onChange(!openProp);
      }
    },
    [openProp, onChange],
  );

  useEffect(() => {
    if (openProp != null && openProp != open) {
      setOpen(openProp);
    }
  }, [open, openProp]);

  return (
    <li>
      <BaseButton
        className={clsx({
          [styles.button.default]: !large,
          [styles.button.large]: large,
        })}
        style={
          {
            '--expandable-depth': depth,
          } as React.CSSProperties
        }
        onClick={handleClick}
      >
        <span
          className={clsx({
            [styles.arrowIcon.close]: !open,
            [styles.arrowIcon.open]: open,
          })}
        >
          <ArrowUpIcon fill={Color.TEXT_SUB} />
        </span>

        <span className={styles.label}>
          <Ellipsis>{label}</Ellipsis>
        </span>

        {meta && <span className={styles.meta}>{meta}</span>}
        {icon && <span className={styles.icon}>{icon}</span>}
      </BaseButton>

      <Collapse
        open={open}
        duration={{ enter: Duration.SLIDE_IN, exit: Duration.SLIDE_OUT }}
      >
        <ul className={styles.innerList}>{children}</ul>
      </Collapse>
    </li>
  );
};
