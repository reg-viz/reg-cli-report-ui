import React from 'react';
import type { RegVariant } from '../../types/reg';
import { SignChangedIcon } from '../icons/SignChangedIcon';
import { SignDeletedIcon } from '../icons/SignDeletedIcon';
import { SignNewIcon } from '../icons/SignNewIcon';
import { SignPassedIcon } from '../icons/SignPassedIcon';
import * as styles from './Sign.css';

const signIconMap = {
  passed: {
    label: 'Passed item',
    icon: <SignPassedIcon width={18} height={18} fill="#fff" />,
  },
  new: {
    label: 'New item',
    icon: <SignNewIcon width={18} height={18} fill="#fff" />,
  },
  changed: {
    label: 'Changed item',
    icon: <SignChangedIcon width={18} height={18} fill="#fff" />,
  },
  deleted: {
    label: 'Deleted item',
    icon: <SignDeletedIcon width={18} height={18} fill="#fff" />,
  },
};

export type Props = {
  variant: RegVariant;
};

export const Sign = ({ variant, ...rest }: Props) => {
  const { label, icon } = signIconMap[variant];

  return (
    <span {...rest} className={styles.wrapper[variant]} aria-label={label}>
      {icon}
    </span>
  );
};
