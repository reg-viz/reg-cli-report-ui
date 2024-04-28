import React, { useCallback } from 'react';
import { useMedia } from '../../hooks/useMedia';
import type { RegVariant } from '../../types/reg';
import { IconButton } from '../IconButton';
import { Sign } from '../Sign';
import { Switch } from '../Switch';
import { CloseIcon } from '../icons/CloseIcon';
import { Ellipsis } from '../internal/Ellipsis';
import { BreakPoint, Color } from '../../styles/variables.css';
import * as styles from './Header.css';

export type Props = {
  variant: RegVariant;
  title: string;
  current: number;
  max: number;
  markersEnabled: boolean;
  onRequestClose: () => void;
  onMarkersToggle: () => void;
};

export const Header = ({
  variant,
  title,
  current,
  max,
  markersEnabled,
  onRequestClose,
  onMarkersToggle,
}: Props) => {
  const isSmallViewport = useMedia(`(max-width: ${BreakPoint.SMALL - 1}px)`);

  const handleCloseClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onRequestClose();
    },
    [onRequestClose],
  );

  const handleToggle = useCallback(() => {
    onMarkersToggle();
  }, [onMarkersToggle]);

  return (
    <header className={styles.wrapper}>
      <div className={styles.left}>
        <h2 className={styles.title} title={title}>
          <span className={styles.titleSign}>
            <Sign variant={variant} />
          </span>
          <span className={styles.titleText}>
            <Ellipsis line={2}>{title}</Ellipsis>
          </span>
        </h2>
      </div>

      <div className={styles.center}>
        {current} / {max}
      </div>

      <div className={styles.right}>
        <IconButton onClick={handleCloseClick}>
          <CloseIcon fill={Color.TEXT_SUB} />
        </IconButton>

        <div className={styles.markersToggele}>
          <Switch
            id="toggle-markers"
            prepend={isSmallViewport ? null : 'Markers'}
            checked={markersEnabled}
            onChange={handleToggle}
          />
        </div>
      </div>
    </header>
  );
};
