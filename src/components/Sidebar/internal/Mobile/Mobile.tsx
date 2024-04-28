import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';
import type { FocusTrap } from 'focus-trap';
import { createFocusTrap } from 'focus-trap';
import React, { useCallback, useEffect, useRef } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import { useKey } from '../../../../hooks/useKey';
import {
  useSidebarMutators,
  useSidebarState,
} from '../../../../states/sidebar';
import { Duration } from '../../../../styles/variables.css';
import type { Props } from '../../types';
import { SidebarInner } from '../SidebarInner';
import * as styles from './Mobile.css';

export type { Props };

export const Mobile = (props: Props) => {
  const { isOpen } = useSidebarState();
  const { close } = useSidebarMutators();

  const focusRef = useRef<FocusTrap | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      close();
    },
    [close],
  );

  useEffect(() => {
    const { current: wrapper } = wrapperRef;
    if (wrapper == null) {
      return;
    }

    focusRef.current = createFocusTrap(wrapper, {});

    return () => {
      clearAllBodyScrollLocks();

      if (focusRef.current != null) {
        focusRef.current.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    const { current: scroller } = scrollerRef;
    const { current: focus } = focusRef;
    if (scroller == null || focus == null) {
      return;
    }

    if (isOpen) {
      focus.activate();
      disableBodyScroll(scroller);
    } else {
      focus.deactivate();
      enableBodyScroll(scroller);
    }
  }, [isOpen]);

  useKey(wrapperRef, ['Escape'], () => {
    if (isOpen) {
      close();
    }
  });

  return (
    <CSSTransition
      appear
      classNames="sidebar"
      in={isOpen}
      timeout={{
        enter: Duration.SLIDE_IN,
        exit: Duration.SLIDE_OUT,
      }}
    >
      <div ref={wrapperRef}>
        <div className={styles.inner}>
          <SidebarInner {...props} scrollerRef={scrollerRef} />
        </div>
        <button
          className={styles.backdrop}
          type="button"
          aria-label="Close sidebar"
          onClick={handleBackdropClick}
        />
      </div>
    </CSSTransition>
  );
};
