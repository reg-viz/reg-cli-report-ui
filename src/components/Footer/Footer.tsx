import React from 'react';
import { Container } from '../Container';
import { Logo } from '../Logo';
import * as styles from './Footer.css';

export type Props = {};

export const Footer = () => (
  <footer className={styles.wrapper}>
    <Container>
      <Logo size={40} />
      <p className={styles.label}>
        powered by{' '}
        <a className={styles.link} href="https://github.com/reg-viz">
          reg-viz
        </a>
      </p>
    </Container>
  </footer>
);
