import React, { useRef, useCallback, useEffect, useState } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import styled from 'styled-components';
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';
import type { FocusTrap } from 'focus-trap';
import { createFocusTrap } from 'focus-trap';
import {
  Space,
  Duration,
  Depth,
  Easing,
  Focus,
  BreakPoint,
  Shadow,
  Color,
} from '../../styles/variables';
import { Portal } from '../internal/Portal';
import { IconButton } from '../IconButton';
import { CloseIcon } from '../icons/CloseIcon';
import { useMousetrap } from '../../hooks/useMousetrap';

const Delay = {
  ENTER: 120,
  EXIT: 160,
};

const allowOutsideClick = () => true;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Depth.DIALOG};
  transition-property: opacity;
  transition-timing-function: ease-out;

  &.dialog-enter {
    opacity: 0;
    transition-duration: ${Duration.FADE_IN}ms;
  }

  &.dialog-enter-active {
    opacity: 1;
  }

  &.dialog-exit {
    opacity: 1;
    transition-duration: ${Duration.FADE_OUT}ms;
    transition-delay: ${Delay.EXIT}ms;
  }

  &.dialog-exit-active {
    opacity: 0;
  }
`;

const Body = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 60px 0 30px;
  backface-visibility: hidden;
`;

const Inner = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  margin: auto ${Space * 2}px;

  @media (min-width: ${BreakPoint.MEDIUM}px) {
    min-width: 600px;
    max-width: 1000px;
    width: auto;
  }
`;

const Content = styled.div`
  position: relative;
  margin-bottom: ${Space * 3}px;
  padding: ${Space * 5}px;
  background: ${Color.WHITE};
  border-radius: 4px;
  box-shadow: ${Shadow.LEVEL2};
  transition-property: opacity, transform;
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: none;
  }

  &:focus-visible {
    box-shadow: ${Focus};
  }

  & > * {
    -webkit-tap-highlight-color: initial;
  }

  & > div {
    & > h2:first-child {
      margin: 0 0 ${Space * 5}px;
    }

    & > *:last-child {
      margin-bottom: 0 !important;
    }
  }

  .dialog-enter & {
    opacity: 0;
    transform: scale(1.03);
    transition-duration: ${Duration.FADE_IN}ms;
    transition-delay: ${Delay.ENTER}ms;
  }

  .dialog-enter-active & {
    opacity: 1;
    transform: scale(1);
  }

  .dialog-exit & {
    opacity: 1;
    transition-duration: ${Duration.FADE_OUT}ms;
  }

  .dialog-exit-active & {
    opacity: 0;
  }
`;

const Close = styled.div`
  position: absolute;
  top: ${Space * 2}px;
  right: ${Space * 2}px;
`;

const Backdrop = styled.button`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  will-change: opacity;
  transition-timing-function: ${Easing.STANDARD};
  transition-property: opacity;
`;

export type Props = Omit<React.ComponentPropsWithoutRef<'div'>, 'id'> & {
  id: string;
  open: boolean;
  title: React.ReactNode;
  onRequestClose: () => void;
};

export const Dialog: React.FC<Props> = ({
  id,
  title,
  open,
  children,
  onRequestClose,
  ...rest
}) => {
  const [mounted, setMounted] = useState(false);

  const bodyRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<FocusTrap | null>(null);

  const handleEnter = useCallback(() => {
    const { current: body } = bodyRef;
    const { current: inner } = innerRef;

    if (body == null || inner == null) {
      return;
    }

    focusRef.current = createFocusTrap(inner, { allowOutsideClick });
    focusRef.current.activate();

    disableBodyScroll(body);

    setMounted(true);
  }, []);

  const handleExit = useCallback(() => {
    const { current: body } = bodyRef;
    const { current: focus } = focusRef;

    if (body == null || focus == null) {
      return;
    }

    focus.deactivate();
    enableBodyScroll(body);

    setMounted(false);
  }, []);

  const handleCloseClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onRequestClose();
    },
    [onRequestClose],
  );

  useEffect(
    () => () => {
      const { current: body } = bodyRef;
      if (body != null) {
        enableBodyScroll(body);
      }

      const { current: focus } = focusRef;
      if (focus != null) {
        focus.deactivate();
      }
    },
    [],
  );

  useMousetrap(
    'esc',
    bodyRef.current,
    () => {
      onRequestClose();
    },
    [mounted, onRequestClose],
  );

  return (
    <Portal>
      <CSSTransition
        classNames="dialog"
        in={open}
        mountOnEnter
        unmountOnExit
        timeout={{
          enter: Duration.FADE_IN + Delay.ENTER,
          exit: Duration.FADE_OUT + Delay.EXIT,
        }}
        onEnter={handleEnter}
        onExit={handleExit}
      >
        <Wrapper>
          <Body ref={bodyRef}>
            <Inner ref={innerRef}>
              <Content
                {...rest}
                id={id}
                tabIndex={open ? 0 : -1}
                role="dialog"
                aria-modal="true"
                aria-hidden={open ? 'false' : 'true'}
              >
                <div role="document">
                  <h2>{title}</h2>
                  {children}
                </div>
                <Close>
                  <IconButton
                    aria-controls={id}
                    aria-label="Close dialog"
                    onClick={handleCloseClick}
                  >
                    <CloseIcon fill={Color.TEXT_SUB} />
                  </IconButton>
                </Close>
              </Content>
            </Inner>

            <Backdrop
              type="button"
              aria-controls={id}
              aria-label="Close dialog"
              onClick={handleCloseClick}
            />
          </Body>
        </Wrapper>
      </CSSTransition>
    </Portal>
  );
};
