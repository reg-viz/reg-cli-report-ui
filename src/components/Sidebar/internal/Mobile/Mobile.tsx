import React, { useCallback, useEffect, useRef } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import styled from 'styled-components';
import type { FocusTrap } from 'focus-trap';
import { createFocusTrap } from 'focus-trap';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import {
  Space,
  Depth,
  Duration,
  Easing,
  Shadow,
  Color,
} from '../../../../styles/variables';
import { Props } from '../../types';
import { SidebarContainer } from '../../../../containers/sidebar/SidebarContainer';
import { SidebarInner } from '../SidebarInner';
import { useMousetrap } from '../../../../hooks/useMousetrap';

const Inner = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Depth.SIDEBAR};
  width: calc(100% - 44px - ${Space * 4}px);
  background: ${Color.BACKGROUND};
  transition-property: box-shadow, transform;
  transition-timing-function: ${Easing.STANDARD};
  transform: translateX(-100%);

  .sidebar-enter & {
    transition-duration: ${Duration.SLIDE_IN}ms;
    transform: translateX(-100%);
  }

  .sidebar-enter-active &,
  .sidebar-enter-done & {
    box-shadow: ${Shadow.LEVEL2};
    transform: translateX(0);
  }

  .sidebar-exit & {
    transform: translateX(0);
    transition-duration: ${Duration.SLIDE_OUT}ms;
  }

  .sidebar-exit-active &,
  .sidebar-exit-done & {
    transform: translateX(-100%);
  }
`;

const Backdrop = styled.button`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Depth.SIDEBAR - 1};
  display: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  border: none;
  background: rgba(0, 0, 0, 0.2);
  will-change: opacity;
  transition-timing-function: ${Easing.STANDARD};
  transition-property: opacity;

  .sidebar-enter & {
    display: block;
    opacity: 0;
    transition-duration: ${Duration.SLIDE_IN}ms;
  }

  .sidebar-enter-active &,
  .sidebar-enter-done & {
    display: block;
    opacity: 1;
  }

  .sidebar-exit & {
    display: block;
    opacity: 1;
    transition-duration: ${Duration.SLIDE_OUT}ms;
  }

  .sidebar-exit-active & {
    display: block;
    opacity: 0;
  }

  .sidebar-exit-done & {
    display: none;
  }
`;

export { Props };

export const Mobile: React.FC<Props> = (props) => {
  const sidebar = SidebarContainer.useContainer();

  const focusRef = useRef<FocusTrap | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      sidebar.close();
    },
    [sidebar],
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

    if (sidebar.isOpen) {
      focus.activate();
      disableBodyScroll(scroller);
    } else {
      focus.deactivate();
      enableBodyScroll(scroller);
    }
  }, [sidebar.isOpen]);

  useMousetrap(
    'esc',
    wrapperRef.current,
    () => {
      if (sidebar.isOpen) {
        sidebar.close();
      }
    },
    [sidebar.isOpen],
  );

  return (
    <CSSTransition
      classNames="sidebar"
      in={sidebar.isOpen}
      appear
      timeout={{
        enter: Duration.SLIDE_IN,
        exit: Duration.SLIDE_OUT,
      }}
    >
      <div ref={wrapperRef}>
        <Inner>
          <SidebarInner {...props} scrollerRef={scrollerRef} />
        </Inner>
        <Backdrop onClick={handleBackdropClick} />
      </div>
    </CSSTransition>
  );
};
