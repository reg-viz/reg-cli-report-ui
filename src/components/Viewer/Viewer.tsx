import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import type { FocusTrap } from 'focus-trap';
import { createFocusTrap } from 'focus-trap';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { useMousetrap } from '../../hooks/useMousetrap';
import { Color, Duration } from '../../styles/variables.css';
import type { Matching, RegEntity } from '../../types/reg';
import { Header } from '../Header';
import { IconButton } from '../IconButton';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';
import { Portal } from '../internal/Portal';
import { Transparent } from '../internal/Transparent';
import * as styles from './Viewer.css';
import { OPEN_DELAY } from './constants';
import { ComparisonView } from './internal/ComparisonView';

export type Props = {
  total: number;
  current: number;
  entity: RegEntity | null;
  matching: Matching | null;
  markersEnabled: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onRequestClose: () => void;
  onMarkersToggle: (enabled: boolean) => void;
};

export const Viewer = ({
  total,
  current,
  entity,
  matching,
  markersEnabled,
  onPrevious,
  onNext,
  onRequestClose,
  onMarkersToggle,
}: Props) => {
  const [mounted, setMounted] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<FocusTrap | null>(null);

  const handleEnter = useCallback(() => {
    const { current: root } = rootRef;
    if (entity == null || root == null) {
      return;
    }

    setMounted(true);
  }, [entity]);

  const handleExit = useCallback(() => {
    const { current: root } = rootRef;
    if (entity == null || root == null) {
      return;
    }

    setMounted(false);
  }, [entity]);

  const handlePreviousClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onPrevious();
    },
    [onPrevious],
  );

  const handleNextClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onNext();
    },
    [onNext],
  );

  useEffect(
    () => () => {
      const { current: trap } = focusRef;
      if (trap != null) {
        trap.deactivate();
      }

      clearAllBodyScrollLocks();
    },
    [],
  );

  useEffect(() => {
    const { current: root } = rootRef;
    const { current: scroller } = scrollerRef;
    if (root == null || scroller == null) {
      return;
    }

    if (mounted) {
      focusRef.current = createFocusTrap(root, {});
      focusRef.current.activate();
      disableBodyScroll(scroller);
    } else {
      if (focusRef.current != null) {
        focusRef.current.deactivate();
      }
      clearAllBodyScrollLocks();
    }
  }, [mounted]);

  useMousetrap(
    'esc',
    rootRef.current,
    () => {
      if (mounted) {
        onRequestClose();
      }
    },
    [mounted, onRequestClose],
  );

  useMousetrap(
    ['right', 'l'],
    rootRef.current,
    () => {
      if (mounted) {
        onNext();
      }
    },
    [mounted, onNext],
  );

  useMousetrap(
    ['left', 'h'],
    rootRef.current,
    () => {
      if (mounted) {
        onPrevious();
      }
    },
    [mounted, onPrevious],
  );

  return (
    <Portal>
      <TransitionGroup>
        <CSSTransition
          key={entity != null ? 'open' : 'close'}
          classNames="viewer"
          mountOnEnter
          unmountOnExit
          timeout={{
            enter: Duration.LARGE_IN + OPEN_DELAY,
            exit: Duration.LARGE_OUT,
          }}
          onEnter={handleEnter}
          onExit={handleExit}
        >
          <div
            ref={rootRef}
            tabIndex={entity == null ? -1 : 0}
            role="dialog"
            aria-modal="true"
            aria-hidden={entity != null ? 'false' : 'true'}
          >
            {entity == null ? null : (
              <div className={styles.wrapper}>
                <div className={styles.headerWrapper}>
                  <Header
                    variant={entity.variant}
                    title={entity.name}
                    current={current}
                    max={total}
                    markersEnabled={markersEnabled}
                    onRequestClose={onRequestClose}
                    onMarkersToggle={onMarkersToggle}
                  />
                </div>

                <div className={styles.body}>
                  <ComparisonView
                    scrollerRef={scrollerRef}
                    entity={entity}
                    matching={matching}
                  />

                  <div className={styles.previous}>
                    <IconButton
                      aria-label="Previous Item"
                      onClick={handlePreviousClick}
                    >
                      <ArrowLeftIcon fill={Color.TEXT_BASE} />
                    </IconButton>
                  </div>

                  <div className={styles.next}>
                    <IconButton
                      aria-label="Next Item"
                      onClick={handleNextClick}
                    >
                      <ArrowRightIcon fill={Color.TEXT_BASE} />
                    </IconButton>
                  </div>
                </div>

                <div className={styles.background}>
                  <Transparent />
                </div>
              </div>
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </Portal>
  );
};
