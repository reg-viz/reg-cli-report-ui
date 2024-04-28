import { clsx } from 'clsx';
import debounce from 'debounce';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { findDOMNode } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { Duration } from '../../styles/variables.css';
import { tryFocus } from '../../utils/focus';
import { findFocusable } from '../../utils/selector';
import { Portal } from '../internal/Portal';
import { Item } from './Item';
import * as styles from './Menu.css';

const RESIZE_DEBOUNCE_MS = 192;

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

    const target = findDOMNode(anchor.current);
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const rect = target.getBoundingClientRect();
    let top: number;
    let left: number;

    switch (placement) {
      case 'top-left':
        top = window.scrollY + rect.bottom - wrapper.clientHeight;
        left = rect.left + target.clientWidth - wrapper.clientWidth;
        break;
      case 'top':
        top = window.scrollY + rect.bottom - wrapper.clientHeight;
        left = rect.left + target.clientWidth / 2 - wrapper.clientWidth / 2;
        break;
      case 'top-right':
        top = window.scrollY + rect.bottom - wrapper.clientHeight;
        left = rect.left;
        break;

      case 'right':
        top =
          window.scrollY +
          rect.top +
          target.clientHeight / 2 -
          wrapper.clientHeight / 2;
        left = rect.left;
        break;

      case 'bottom-right':
        top = window.scrollY + rect.top;
        left = rect.left;
        break;
      case 'bottom':
        top = window.scrollY + rect.top;
        left = rect.left + target.clientWidth / 2 - wrapper.clientWidth / 2;
        break;
      case 'bottom-left':
        top = window.scrollY + rect.top;
        left = rect.left + target.clientWidth - wrapper.clientWidth;
        break;

      case 'left':
        top =
          window.scrollY +
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

      switch (e.key) {
        case 'Tab':
        case 'Escape':
          cancel();
          requestClose();
          break;
        case 'ArrowDown':
        case 'j':
          cancel();
          nextFocus();
          break;
        case 'ArrowUp':
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
          appear
          mountOnEnter
          unmountOnExit
          classNames="menu"
          in={open}
          timeout={{
            enter: Duration.MEDIUM_IN,
            exit: Duration.MEDIUM_OUT,
          }}
        >
          <div
            ref={wrapperRef as any}
            {...rest}
            className={clsx(styles.wrapper, styles.placementOrigin[placement])}
            id={id}
            onKeyDown={handleKeydown}
          >
            <div
              className={clsx(styles.scale, styles.placementOrigin[placement])}
            >
              <div
                className={clsx(
                  styles.placementTranslate[placement],
                  styles.opacity,
                )}
              >
                <ul className={styles.list}>{children}</ul>
              </div>
            </div>
          </div>
        </CSSTransition>

        {open && (
          <button
            className={styles.backdrop}
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
