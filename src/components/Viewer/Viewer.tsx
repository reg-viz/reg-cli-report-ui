import React, { useRef, useEffect, useCallback, useState } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import styled, { css } from 'styled-components';
import type { FocusTrap } from 'focus-trap';
import { createFocusTrap } from 'focus-trap';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import {
  Space,
  Depth,
  Size,
  Duration,
  Easing,
  Color,
} from '../../styles/variables';
import { IconButton } from '../IconButton';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';
import { Transparent } from '../internal/Transparent';
import { Header } from '../Header';
import { Portal } from '../internal/Portal';
import type { RegEntity, Matching } from '../../types/reg';
import { useMousetrap } from '../../hooks/useMousetrap';
import { ComparisonView } from './internal/ComparisonView';
import { OPEN_DELAY } from './constants';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Depth.VIEWER};
  min-width: 320px;
  min-height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
  transition-property: opacity;
  transition-timing-function: ease-out;

  .viewer-enter & {
    opacity: 0;
    transition-duration: ${Duration.LARGE_IN}ms;
  }

  .viewer-enter-active & {
    opacity: 1;
  }

  .viewer-exit & {
    opacity: 1;
    transition-duration: ${Duration.LARGE_OUT}ms;
  }

  .viewer-exit-active & {
    opacity: 0;
  }
`;

const HeaderWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  transition-property: opacity, transform;
  transition-timing-function: ${Easing.STANDARD};

  .viewer-enter & {
    opacity: 0;
    transform: translateY(-20px);
    transition-duration: ${Duration.LARGE_IN}ms;
    transition-delay: ${OPEN_DELAY}ms;
  }

  .viewer-enter-active & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Body = styled.div`
  position: absolute;
  top: ${Size.HEADER_HEIGHT}px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
`;

const navigationStyles = css`
  position: absolute;
  top: 50%;
  z-index: 10;
  transform: translate(0, -50%);
  transition-property: opacity, transform;
  transition-timing-function: ${Easing.STANDARD};
`;

const Previous = styled.div`
  ${navigationStyles}
  left: ${Space * 2}px;

  .viewer-enter & {
    opacity: 0;
    transform: translate(-10px, -50%);
    transition-duration: ${Duration.LARGE_IN}ms;
    transition-delay: ${OPEN_DELAY}ms;
  }

  .viewer-enter-active & {
    opacity: 1;
    transform: translate(0, -50%);
  }
`;

const Next = styled.div`
  ${navigationStyles}
  right: ${Space * 2}px;

  .viewer-enter & {
    opacity: 0;
    transform: translate(10px, -50%);
    transition-duration: ${Duration.LARGE_IN}ms;
    transition-delay: ${OPEN_DELAY}ms;
  }

  .viewer-enter-active & {
    opacity: 1;
    transform: translate(0, -50%);
  }
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
`;

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

export const Viewer: React.FC<Props> = ({
  total,
  current,
  entity,
  matching,
  markersEnabled,
  onPrevious,
  onNext,
  onRequestClose,
  onMarkersToggle,
}) => {
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
              <Wrapper>
                <HeaderWrapper>
                  <Header
                    variant={entity.variant}
                    title={entity.name}
                    current={current}
                    max={total}
                    markersEnabled={markersEnabled}
                    onRequestClose={onRequestClose}
                    onMarkersToggle={onMarkersToggle}
                  />
                </HeaderWrapper>

                <Body>
                  <ComparisonView
                    scrollerRef={scrollerRef}
                    entity={entity}
                    matching={matching}
                  />

                  <Previous>
                    <IconButton
                      aria-label="Previous Item"
                      onClick={handlePreviousClick}
                    >
                      <ArrowLeftIcon fill={Color.TEXT_BASE} />
                    </IconButton>
                  </Previous>

                  <Next>
                    <IconButton
                      aria-label="Next Item"
                      onClick={handleNextClick}
                    >
                      <ArrowRightIcon fill={Color.TEXT_BASE} />
                    </IconButton>
                  </Next>
                </Body>

                <Background>
                  <Transparent />
                </Background>
              </Wrapper>
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </Portal>
  );
};
