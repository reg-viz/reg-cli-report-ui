import React from 'react';
import type { Props as BaseButtonProps } from '../internal/BaseButton';
import { BaseButton } from '../internal/BaseButton';
import { Ellipsis } from '../internal/Ellipsis';
import * as styles from './Item.css';

export type Props = BaseButtonProps & {
  depth?: number;
};

export const Item = ({ depth = 0, href, children, ...rest }: Props) => (
  <li>
    <BaseButton
      {...rest}
      className={styles.link}
      href={href}
      style={
        {
          '--item-depth': depth,
        } as React.CSSProperties
      }
    >
      <Ellipsis>{children}</Ellipsis>
    </BaseButton>
  </li>
);
