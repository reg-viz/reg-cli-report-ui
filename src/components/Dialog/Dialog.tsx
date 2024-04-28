import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import type { FocusTrap } from 'focus-trap';
import { createFocusTrap } from 'focus-trap';
import React, { useCallback, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useKey } from '../../hooks/useKey';
import { Color, Duration } from '../../styles/variables.css';
import type { Modify } from '../../utils/types';
import { IconButton } from '../IconButton';
import { CloseIcon } from '../icons/CloseIcon';
import { Portal } from '../internal/Portal';
import * as styles from './Dialog.css';

const allowOutsideClick = () => true;

export type Props = Modify<
  React.ComponentPropsWithoutRef<'div'>,
  {
    id: string;
    open: boolean;
    title: React.ReactNode;
    onRequestClose: () => void;
  }
>;

export const Dialog = ({
  id,
  title,
  open,
  children,
  onRequestClose,
  ...rest
}: Props) => {
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
  }, []);

  const handleExit = useCallback(() => {
    const { current: body } = bodyRef;
    const { current: focus } = focusRef;

    if (body == null || focus == null) {
      return;
    }

    focus.deactivate();
    enableBodyScroll(body);
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

  useKey(bodyRef, ['Escape'], () => {
    onRequestClose();
  });

  return (
    <Portal>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        classNames="dialog"
        in={open}
        timeout={{
          enter: Duration.FADE_IN + styles.delay.enter,
          exit: Duration.FADE_OUT + styles.delay.exit,
        }}
        onEnter={handleEnter}
        onExit={handleExit}
      >
        <div className={styles.wrapper}>
          <div ref={bodyRef} className={styles.body}>
            <div ref={innerRef} className={styles.inner}>
              <div
                {...rest}
                className={styles.content}
                id={id}
                tabIndex={open ? 0 : -1}
                role="dialog"
                aria-modal="true"
                aria-hidden={open ? 'false' : 'true'}
              >
                <div role="document">
                  <h2 className={styles.heading}>{title}</h2>
                  {children}
                </div>
                <div className={styles.close}>
                  <IconButton
                    aria-controls={id}
                    aria-label="Close dialog"
                    onClick={handleCloseClick}
                  >
                    <CloseIcon fill={Color.TEXT_SUB} />
                  </IconButton>
                </div>
              </div>
            </div>

            <button
              className={styles.backdrop}
              type="button"
              aria-controls={id}
              aria-label="Close dialog"
              onClick={handleCloseClick}
            />
          </div>
        </div>
      </CSSTransition>
    </Portal>
  );
};
