import React from 'react';
import { Logo } from '../Logo';
import { BaseButton } from '../internal/BaseButton';
import * as styles from './PoweredBy.css';

const REG_VIS_URL = 'https://github.com/reg-viz';

export type Props = {};

export const PoweredBy = () => (
  <aside>
    <BaseButton className={styles.button} href={REG_VIS_URL}>
      <span className={styles.icon}>
        <Logo size={32} />
      </span>
      <span>
        <h3 className={styles.title}>Powered by reg-viz</h3>
        <p className={styles.url}>https://github.com/reg-viz</p>
      </span>
    </BaseButton>
  </aside>
);
