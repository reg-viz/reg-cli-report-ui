import React, { useRef, useEffect, useCallback } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import SwitchTransition from 'react-transition-group/SwitchTransition';
import styled, { css } from 'styled-components';
import createFocusTrap, { FocusTrap } from 'focus-trap';
import { Space, Color, Depth, Size, Duration, Easing } from '../../styles/variables';
import { IconButton } from '../IconButton';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';
import { Transparent } from '../internal/Transparent';
import { Header } from '../Header';
import { Portal } from '../internal/Portal';
import { RegEntity } from '../../types/reg';
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
  transition-timing-function: ${Easing.STANDARD};

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
  onNext: () => void;
  onPrevious: () => void;
  onRequestClose: () => void;
};

export const Viewer: React.FC<Props> = ({ total, current, entity, onPrevious, onNext, onRequestClose }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<FocusTrap | null>(null);

  const handleMounted = useCallback(() => {
    const { current: root } = rootRef;
    if (root == null) {
      return;
    }

    focusRef.current = createFocusTrap(root, {});
    focusRef.current.activate();
  }, []);

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
    },
    [],
  );

  return (
    <Portal onRendered={handleMounted}>
      <SwitchTransition>
        <CSSTransition
          key={entity == null ? 'close' : 'open'}
          classNames="viewer"
          unmountOnExit
          timeout={{
            enter: Duration.LARGE_IN + OPEN_DELAY,
            exit: Duration.LARGE_OUT,
          }}>
          <div role="dialog" aria-modal="true" aria-hidden={entity != null ? 'false' : 'true'}>
            {entity == null ? null : (
              <Wrapper ref={rootRef}>
                <HeaderWrapper>
                  <Header
                    variant={entity.variant}
                    title={entity.name}
                    current={current}
                    max={total}
                    onRequestClose={onRequestClose}
                  />
                </HeaderWrapper>

                <Body>
                  <ComparisonView entity={entity} />

                  <Previous>
                    <IconButton onClick={handlePreviousClick}>
                      <ArrowLeftIcon fill={Color.DEFAULT} />
                    </IconButton>
                  </Previous>

                  <Next>
                    <IconButton onClick={handleNextClick}>
                      <ArrowRightIcon fill={Color.DEFAULT} />
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
      </SwitchTransition>
    </Portal>
  );
};
