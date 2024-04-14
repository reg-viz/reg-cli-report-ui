import RcSlider from 'rc-slider';
import React from 'react';
import * as styles from './Slider.css';

export type Props = {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
};

export const Slider = ({ onChange, ...rest }: Props) => (
  <RcSlider {...rest} className={styles.wrapper} onChange={onChange as never} />
);
