import React, { useCallback, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import * as styles from './Collapse.css';

export type Props = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'aria-hidden'
> & {
  open: boolean;
  duration: { enter: number; exit: number };
};

export const Collapse = ({ open, duration, children, ...rest }: Props) => {
  const bodyRef = useRef<HTMLDivElement>(null);

  const applyPreAnimationStyles = useCallback((node: HTMLElement) => {
    const { current: body } = bodyRef;

    node.style.height = `${body != null ? body.clientHeight : 0}px`;
  }, []);

  const clearInlineStyles = useCallback((node: HTMLElement) => {
    node.style.height = '';
  }, []);

  const handleEnter = useCallback(
    (node: HTMLElement) => {
      applyPreAnimationStyles(node);
    },
    [applyPreAnimationStyles],
  );

  const handleEntered = useCallback(
    (node: HTMLElement) => {
      clearInlineStyles(node);
    },
    [clearInlineStyles],
  );

  const handleExit = useCallback(
    (node: HTMLElement) => {
      applyPreAnimationStyles(node);
    },
    [applyPreAnimationStyles],
  );

  const handleExiting = useCallback(
    (node: HTMLElement) => {
      clearInlineStyles(node);
    },
    [clearInlineStyles],
  );

  return (
    <TransitionGroup>
      {open && (
        <CSSTransition
          key="collapse"
          in={open}
          classNames="collapse"
          timeout={duration}
          onEnter={handleEnter}
          onEntered={handleEntered}
          onExit={handleExit}
          onExiting={handleExiting}
        >
          <div
            {...rest}
            className={styles.wrapper}
            style={
              {
                '--collapse-duration-enter': `${duration.enter}ms`,
                '--collapse-duration-exit': `${duration.exit}ms`,
              } as React.CSSProperties
            }
          >
            <div className={styles.inner} ref={bodyRef}>
              <div className={styles.innerBox}>{children}</div>
            </div>
          </div>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};
