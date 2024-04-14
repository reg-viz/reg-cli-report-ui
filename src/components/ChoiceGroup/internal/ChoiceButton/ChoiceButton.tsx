import { clsx } from 'clsx';
import React, { forwardRef } from 'react';
import type { Modify } from '../../../../utils/types';
import type { Props as BaseButtonProps } from '../../../internal/BaseButton';
import { BaseButton } from '../../../internal/BaseButton';
import * as styles from './ChoiceButton.css';

export type Props = Modify<
  BaseButtonProps,
  {
    active?: boolean;
  }
>;

export const ChoiceButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  Props
>(({ active = false, children, ...rest }, ref) => (
  <BaseButton
    {...rest}
    ref={ref}
    className={clsx({
      [styles.wrapper.default]: !active,
      [styles.wrapper.active]: active,
    })}
  >
    <span className={styles.inner}>{children}</span>
  </BaseButton>
));
