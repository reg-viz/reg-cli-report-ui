import React from 'react';
import type { Matching } from '../../../../types/reg';
import { Image } from '../../../Image';
import { Markers } from './Markers';
import * as styles from './TwoUp.css';

export type Props = {
  before: string;
  after: string;
  matching: Matching | null;
};

export const TwoUp = ({ before, after, matching }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.view}>
        <Image src={before} />
        <Markers variant="before" matching={matching} />
      </div>

      <div className={styles.view}>
        <Image src={after} />
        <Markers variant="after" matching={matching} />
      </div>
    </div>
  );
};
