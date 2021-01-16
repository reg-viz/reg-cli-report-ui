import React from 'react';
import styled from 'styled-components';
import SwitchTransition from 'react-transition-group/SwitchTransition';
import CSSTransition from 'react-transition-group/CSSTransition';
import {
  Space,
  Depth,
  Duration,
  Easing,
  BreakPoint,
} from '../../styles/variables';
import { Portal } from '../internal/Portal';
import { Snackbar } from '../Snackbar';

const Wrapper = styled.div`
  position: fixed;
  right: ${Space * 2}px;
  bottom: ${Space * 2}px;
  left: ${Space * 2}px;
  z-index: ${Depth.NOTIFICATION};

  @media (min-width: ${BreakPoint.SMALL}px) {
    left: 50%;
    right: auto;
    min-width: 230px;
    transform: translateX(-50%);
  }
`;

const Inner = styled.div`
  transition-property: opacity, transform;
  transition-timing-function: ${Easing.STANDARD};

  &.notification-enter {
    opacity: 0;
    transform: translateY(5px);
    transition-duration: ${Duration.FADE_IN}ms;
  }

  &.notification-enter-active {
    opacity: 1;
    transform: translateY(0);
  }

  &.notification-exit {
    opacity: 1;
    transform: translateY(0);
    transition-duration: ${Duration.FADE_OUT}ms;
  }

  &.notification-exit-active {
    opacity: 0;
    transform: translateY(2px);
  }
`;

export type Props = {
  show: boolean;
  message: string;
};

export const Notification: React.FC<Props> = ({ show, message }) => {
  return (
    <Portal>
      <Wrapper>
        <div role="alert" alia-live="assertive">
          <SwitchTransition>
            <CSSTransition
              key={show ? 'show' : 'hide'}
              classNames="notification"
              timeout={{
                enter: Duration.FADE_IN,
                exit: Duration.FADE_OUT,
              }}
            >
              <Inner>{show && <Snackbar>{message}</Snackbar>}</Inner>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </Wrapper>
    </Portal>
  );
};
