import React from 'react';
import type { Matching } from '../../../../types/reg';
import { Image } from '../../../Image';
import { Markers } from './Markers';
import * as styles from './Toggle.css';
import { useComparisonImage } from './useComparisonImage';

export type Props = {
  before: string;
  after: string;
  checked: boolean;
  matching: Matching | null;
};

export const Toggle = ({ before, after, checked, matching }: Props) => {
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
            visibility: checked ? 'hidden' : 'visible',
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
            visibility: checked ? 'visible' : 'hidden',
            width: image.after.width,
            height: image.after.height,
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
