import React from 'react';
import * as styles from './Transparent.css';

export type Props = React.ComponentPropsWithoutRef<'span'>;

export const Transparent = ({ ...rest }: Props) => (
  <span {...rest} className={styles.wrapper} />
);
