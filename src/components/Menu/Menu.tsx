import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import keycode from 'keycode';
import CSSTransition from 'react-transition-group/CSSTransition';
import debounce from 'debounce';
import { Portal } from '../internal/Portal';
import {
  Space,
  Duration,
  Easing,
  Depth,
  Shadow,
  Color,
} from '../../styles/variables';
import { findFocusable } from '../../utils/selector';
import { tryFocus } from '../../utils/focus';
import { Item } from './Item';

const RESIZE_DEBOUNCE_MS = 192;

const animations = {
  'top-left': {
    origin: 'bottom right',
    translate: `translateY(${Space * 0.5}px)`,
    scale: 'scale(0.6, 0.7)',
  },
  top: {
    origin: 'bottom center',
    translate: `translateY(${Space * 0.5}px)`,
    scale: 'scale(0.6, 0.7)',
  },
  'top-right': {
    origin: 'bottom left',
    translate: `translateY(${Space * 0.5}px)`,
    scale: 'scale(0.6, 0.7)',
  },
  right: {
    origin: 'center left',
    translate: `translateX(${Space * 0.5 * -1}px)`,
    scale: 'scale(0.6, 0.7)',
  },
  'bottom-right': {
    origin: 'top left',
    translate: `translateY(${Space * 0.5 * -1}px)`,
    scale: 'scale(0.6, 0.7)',
  },
  bottom: {
    origin: 'top center',
    translate: `translateY(${Space * 0.5 * -1}px)`,
    scale: 'scale(0.6, 0.7)',
  },
  'bottom-left': {
    origin: 'top right',
    translate: `translateY(${Space * 0.5 * -1}px)`,
    scale: 'scale(0.6, 0.7)',
  },
  left: {
    origin: 'center right',
    translate: `translateX(${Space * 0.5}px)`,
    scale: 'scale(0.6, 0.7)',
  },
};

const Wrapper = styled.div<{ placement: Placement }>`
  position: absolute;
  z-index: ${Depth.MENU};
  transition-property: transform, opacity;
  transition-timing-function: ${Easing.STANDARD};
  transform-origin: ${({ placement }) => animations[placement].origin};

  &.menu-enter {
    transform: scale(0.98);
    opacity: 0;
  }

  &.menu-enter-active {
    transition-duration: ${Duration.SMALL_IN}ms;
    transform: scale(1);
    opacity: 1;
  }

  &.menu-exit {
    opacity: 1;
  }

  &.menu-exit-active {
    transition-duration: ${Duration.SMALL_OUT}ms;
    opacity: 0;
  }
`;

const Scale = styled.div<{ placement: Placement }>`
  min-width: 200px;
  max-width: 320px;
  padding: ${Space * 1}px 0;
  border-radius: 3px;
  background: ${Color.WHITE};
  box-shadow: ${Shadow.LEVEL2};
  transition-property: transform;
  transition-timing-function: ${Easing.STANDARD};
  transform-origin: ${({ placement }) => animations[placement].origin};

  .menu-enter & {
    transform: ${({ placement }) => animations[placement].scale};
  }

  .menu-enter-active & {
    transition-duration: ${Duration.MEDIUM_IN - Duration.SMALL_IN}ms;
    transform: scale(1, 1);
  }

  .menu-exit & {
    transform: scale(1, 1);
  }

  .menu-exit-active & {
    transition-duration: ${Duration.MEDIUM_OUT - Duration.SMALL_OUT}ms;
    transform: scale(0.99, 0.97);
  }
`;

const Opacity = styled.div<{ placement: Placement }>`
  transition-property: transform, opacity;
  transition-timing-function: ${Easing.STANDARD};

  .menu-enter & {
    transform: ${({ placement }) => animations[placement].translate};
    opacity: 0;
  }

  .menu-enter-active & {
    transition-duration: ${Duration.MEDIUM_IN - Duration.SMALL_IN}ms;
    transition-delay: ${(Duration.MEDIUM_IN - Duration.SMALL_IN) / 2}ms;
    transform: translate(0, 0);
    opacity: 1;
  }

  .menu-exit & {
    opacity: 1;
  }

  .menu-exit-active & {
    transition-duration: ${Duration.MEDIUM_OUT - Duration.SMALL_OUT}ms;
    opacity: 0;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Backdrop = styled.button`
  display: block;
  position: fixed;
  z-index: ${Depth.MENU - 1};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
`;

export type Placement =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'right'
  | 'bottom-right'
  | 'bottom'
  | 'bottom-left'
  | 'left';

export type Props = {
  id: string;
  open: boolean;
  anchor?: React.RefObject<any>;
  placement?: Placement;
  children: React.ReactNode;
  onRequestClose?: () => void;
};

export const Menu = ({
  id,
  open,
  anchor,
  placement = 'bottom',
  children,
  onRequestClose,
  ...rest
}: Props) => {
  const wrapperRef = useRef<HTMLDivElement>();
  const focusIndexRef = useRef(0);
  const focusableRef = useRef<HTMLElement[]>([]);
  const originalActiveElementRef = useRef<HTMLElement | null>(null);

  const updateFocusable = useCallback(() => {
    if (wrapperRef.current != null) {
      focusIndexRef.current = 0;
      focusableRef.current = findFocusable(wrapperRef.current);
    }
  }, []);

  const updatePosition = useCallback(() => {
    const { current: wrapper } = wrapperRef;
    if (wrapper == null || anchor?.current == null) {
      return;
    }

    /* eslint-disable-next-line react/no-find-dom-node */
    const target = ReactDOM.findDOMNode(anchor.current) as HTMLElement | null;
    if (target == null) {
      return;
    }

    const rect = target.getBoundingClientRect();
    let top: number;
    let left: number;

    switch (placement) {
      case 'top-left':
        top = window.pageYOffset + rect.bottom - wrapper.clientHeight;
        left = rect.left + target.clientWidth - wrapper.clientWidth;
        break;
      case 'top':
        top = window.pageYOffset + rect.bottom - wrapper.clientHeight;
        left = rect.left + target.clientWidth / 2 - wrapper.clientWidth / 2;
        break;
      case 'top-right':
        top = window.pageYOffset + rect.bottom - wrapper.clientHeight;
        left = rect.left;
        break;

      case 'right':
        top =
          window.pageYOffset +
          rect.top +
          target.clientHeight / 2 -
          wrapper.clientHeight / 2;
        left = rect.left;
        break;

      case 'bottom-right':
        top = window.pageYOffset + rect.top;
        left = rect.left;
        break;
      case 'bottom':
        top = window.pageYOffset + rect.top;
        left = rect.left + target.clientWidth / 2 - wrapper.clientWidth / 2;
        break;
      case 'bottom-left':
        top = window.pageYOffset + rect.top;
        left = rect.left + target.clientWidth - wrapper.clientWidth;
        break;

      case 'left':
        top =
          window.pageYOffset +
          rect.top +
          target.clientHeight / 2 -
          wrapper.clientHeight / 2;
        left = rect.left + target.clientWidth - wrapper.clientWidth;
        break;

      default:
        top = 0;
        left = 0;
    }

    wrapper.style.top = `${top}px`;
    wrapper.style.left = `${left}px`;
  }, [anchor, placement]);

  const handleRendered = useCallback(() => {
    updateFocusable();
  }, [updateFocusable]);

  const handleResize = useMemo(
    () =>
      debounce(() => {
        updatePosition();
      }, RESIZE_DEBOUNCE_MS),
    [updatePosition],
  );

  const requestClose = useCallback(() => {
    onRequestClose?.();
  }, [onRequestClose]);

  const focusTo = useCallback((index: number) => {
    focusIndexRef.current = index;
    tryFocus(focusableRef.current[index]);
  }, []);

  const nextFocus = useCallback(() => {
    const { current: focusable } = focusableRef;
    if (focusable == null) {
      return;
    }

    const next = focusIndexRef.current + 1;

    focusTo(next < focusable.length ? next : 0);
  }, [focusTo]);

  const previousFocus = useCallback(() => {
    const { current: focusable } = focusableRef;
    if (focusable == null) {
      return;
    }

    const previous = focusIndexRef.current - 1;

    focusTo(previous > -1 ? previous : Math.max(0, focusable.length - 1));
  }, [focusTo]);

  const restoreOriginalFocus = useCallback(() => {
    const { current: el } = originalActiveElementRef;
    if (el != null) {
      el.focus();
    }
  }, []);

  const watchResize = useCallback(() => {
    window.addEventListener('resize', handleResize, false);
  }, [handleResize]);

  const unwatchResize = useCallback(() => {
    window.removeEventListener('resize', handleResize, false);
  }, [handleResize]);

  const handleKeydown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!open) {
        return;
      }

      const cancel = () => {
        e.preventDefault();
        e.stopPropagation();
      };

      switch (keycode(e as any)) {
        case 'tab':
        case 'esc':
          cancel();
          requestClose();
          break;
        case 'down':
        case 'j':
          cancel();
          nextFocus();
          break;
        case 'up':
        case 'k':
          cancel();
          previousFocus();
          break;
      }
    },
    [open, nextFocus, previousFocus, requestClose],
  );

  const handleBackdropFocus = useCallback(
    (e: React.FocusEvent<HTMLButtonElement>) => {
      e.preventDefault();
      requestClose();
    },
    [requestClose],
  );

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      requestClose();
    },
    [requestClose],
  );

  useEffect(() => {
    updatePosition();
  }, [placement, updatePosition]);

  useEffect(() => {
    if (open) {
      originalActiveElementRef.current = document.activeElement as any;
      updatePosition();
      updateFocusable();
      watchResize();
      focusTo(0);
    } else {
      restoreOriginalFocus();
      unwatchResize();
    }
  }, [
    updatePosition,
    updateFocusable,
    watchResize,
    focusTo,
    open,
    restoreOriginalFocus,
    unwatchResize,
  ]);

  return (
    <Portal onRendered={handleRendered}>
      <div>
        <CSSTransition
          classNames="menu"
          in={open}
          timeout={{
            enter: Duration.MEDIUM_IN,
            exit: Duration.MEDIUM_OUT,
          }}
          unmountOnExit={true}
        >
          <Wrapper
            ref={wrapperRef as any}
            {...rest}
            id={id}
            placement={placement}
            onKeyDown={handleKeydown}
          >
            <Scale placement={placement}>
              <Opacity placement={placement}>
                <List>{children}</List>
              </Opacity>
            </Scale>
          </Wrapper>
        </CSSTransition>

        {open && (
          <Backdrop
            type="button"
            aria-label="Close menu"
            aria-controls={id}
            onFocus={handleBackdropFocus}
            onClick={handleBackdropClick}
          />
        )}
      </div>
    </Portal>
  );
};

Menu.Item = Item;
