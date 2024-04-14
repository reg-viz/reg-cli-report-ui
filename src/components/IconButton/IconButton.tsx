import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import type { Modify } from '../../utils/types';
import type { Props as BaseButtonProps } from '../internal/BaseButton';
import { BaseButton } from '../internal/BaseButton';
import * as styles from './IconButton.css';

export type Props = Modify<
  BaseButtonProps,
  {
    variant?: 'light' | 'dark';
  }
>;

export const IconButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  Props
>(({ className, variant = 'light', children, ...rest }, ref) => (
  <BaseButton
    ref={ref as any}
    className={clsx(styles.wrapper, {
      [styles.wrapperLight]: variant === 'light',
      [styles.wrapperDark]: variant === 'dark',
    })}
    {...rest}
  >
    {children}
  </BaseButton>
));
