import React from 'react';
import type { Props as BaseButtonProps } from '../internal/BaseButton';
import { BaseButton } from '../internal/BaseButton';
import { Ellipsis } from '../internal/Ellipsis';
import * as styles from './Item.css';

export type Props = BaseButtonProps;

export const Item = ({ children, ...rest }: Props) => {
  return (
    <li>
      <BaseButton {...rest} className={styles.inner}>
        <Ellipsis>{children}</Ellipsis>
      </BaseButton>
    </li>
  );
};
