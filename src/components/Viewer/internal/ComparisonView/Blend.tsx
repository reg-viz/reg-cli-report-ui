import React from 'react';
import type { Matching } from '../../../../types/reg';
import { Image } from '../../../Image';
import * as styles from './Blend.css';
import { Markers } from './Markers';
import { useComparisonImage } from './useComparisonImage';

export type Props = {
  before: string;
  after: string;
  value: number;
  matching: Matching | null;
};

export const Blend = ({ before, after, value, matching }: Props) => {
  const { canvas, image } = useComparisonImage(before, after);

  return (
    <div
      className={styles.wrapper}
      style={{ visibility: image.loaded ? 'visible' : 'hidden' }}
    >
      <div className={styles.inner} style={canvas}>
        <div
          className={styles.before}
          style={{
            width: image.before.width,
            height: image.before.height,
          }}
        >
          <Image
            ref={image.before.ref}
            src={before}
            onLoad={image.before.handleLoad}
          />
          <Markers variant="before" matching={matching} />
        </div>

        <div
          className={styles.after}
          style={{
            width: image.after.width,
            height: image.after.height,
            opacity: value,
          }}
        >
          <Image
            ref={image.after.ref}
            src={after}
            onLoad={image.after.handleLoad}
          />
          <Markers variant="after" matching={matching} />
        </div>
      </div>
    </div>
  );
};
