import React from 'react';
import { Image } from '../../../Image';
import * as styles from './Diff.css';

export type Props = {
  src: string;
};

export const Diff = ({ src }: Props) => (
  <div className={styles.wrapper}>
    <Image src={src} />
  </div>
);
