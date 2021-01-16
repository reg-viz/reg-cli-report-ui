import React from 'react';
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

type State = {};

export class Menu extends React.Component<Props, State> {
  public static Item = Item;

  public static defaultProps = {
    placement: 'bottom',
  };

  private wrapper = React.createRef<HTMLDivElement>();
  private focusIndex = 0;
  private focusable: HTMLElement[] = [];
  private originalActiveElement: HTMLElement | null = null;

  public componentDidUpdate(prevProps: Props): void {
    const { open, placement } = this.props;
    const { open: prevOpen, placement: prevPlacement } = prevProps;

    if (placement !== prevPlacement) {
      this.updatePosition();
    }

    if (open !== prevOpen && open && this.wrapper.current != null) {
      this.originalActiveElement = document.activeElement as any;
      this.updatePosition();
      this.updateFocusable();
      this.watchResize();
      this.focusTo(0);
    }

    if (open !== prevOpen && !open) {
      this.restoreOriginalFocus();
      this.unwatchResize();
    }
  }

  public componentWillUnmount(): void {
    this.focusable = [];
    this.originalActiveElement = null;
  }

  private requestClose(): void {
    if (this.props.onRequestClose != null) {
      this.props.onRequestClose();
    }
  }

  private updatePosition(): void {
    const { current: wrapper } = this.wrapper;
    const { anchor: anchorRef, placement } = this.props;

    if (wrapper == null || anchorRef == null || placement == null) {
      return;
    }

    /* eslint-disable-next-line react/no-find-dom-node */
    const anchor = ReactDOM.findDOMNode(
      anchorRef.current,
    ) as HTMLElement | null;
    if (anchor == null) {
      return;
    }

    const rect = anchor.getBoundingClientRect();
    let top: number;
    let left: number;

    switch (placement) {
      case 'top-left':
        top = window.pageYOffset + rect.bottom - wrapper.clientHeight;
        left = rect.left + anchor.clientWidth - wrapper.clientWidth;
        break;
      case 'top':
        top = window.pageYOffset + rect.bottom - wrapper.clientHeight;
        left = rect.left + anchor.clientWidth / 2 - wrapper.clientWidth / 2;
        break;
      case 'top-right':
        top = window.pageYOffset + rect.bottom - wrapper.clientHeight;
        left = rect.left;
        break;

      case 'right':
        top =
          window.pageYOffset +
          rect.top +
          anchor.clientHeight / 2 -
          wrapper.clientHeight / 2;
        left = rect.left;
        break;

      case 'bottom-right':
        top = window.pageYOffset + rect.top;
        left = rect.left;
        break;
      case 'bottom':
        top = window.pageYOffset + rect.top;
        left = rect.left + anchor.clientWidth / 2 - wrapper.clientWidth / 2;
        break;
      case 'bottom-left':
        top = window.pageYOffset + rect.top;
        left = rect.left + anchor.clientWidth - wrapper.clientWidth;
        break;

      case 'left':
        top =
          window.pageYOffset +
          rect.top +
          anchor.clientHeight / 2 -
          wrapper.clientHeight / 2;
        left = rect.left + anchor.clientWidth - wrapper.clientWidth;
        break;

      default:
        top = 0;
        left = 0;
    }

    wrapper.style.top = `${top}px`;
    wrapper.style.left = `${left}px`;
  }

  private restoreOriginalFocus(): void {
    if (this.originalActiveElement != null) {
      this.originalActiveElement.focus();
    }
  }

  private nextFocus(): void {
    const { length } = this.focusable;
    const next = this.focusIndex + 1;

    this.focusTo(next < length ? next : 0);
  }

  private previousFocus(): void {
    const { length } = this.focusable;
    const previous = this.focusIndex - 1;

    this.focusTo(previous > -1 ? previous : Math.max(0, length - 1));
  }

  private focusTo(index: number): void {
    this.focusIndex = index;
    tryFocus(this.focusable[index]);
  }

  private updateFocusable(): void {
    const { current: wrapper } = this.wrapper;

    if (wrapper != null) {
      this.focusIndex = 0;
      this.focusable = findFocusable(wrapper);
    }
  }

  private watchResize(): void {
    window.addEventListener('resize', this.handleResize, false);
  }

  private unwatchResize(): void {
    window.removeEventListener('resize', this.handleResize, false);
  }

  public render(): JSX.Element {
    const {
      id,
      open,
      anchor,
      placement: _placement,
      children,
      onRequestClose,
      ...rest
    } = this.props;
    const placement = _placement as Placement;

    return (
      <Portal onRendered={this.handleRendered}>
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
              ref={this.wrapper}
              {...rest}
              id={id}
              placement={placement}
              onKeyDown={this.handleKeydown}
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
              onFocus={this.handleBackdropFocus}
              onClick={this.handleBackdropClick}
            />
          )}
        </div>
      </Portal>
    );
  }

  private handleRendered = () => {
    this.updateFocusable();
  };

  private handleResize = debounce(() => {
    this.updatePosition();
  }, RESIZE_DEBOUNCE_MS);

  private handleKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!this.props.open) {
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
        this.requestClose();
        break;
      case 'down':
      case 'j':
        cancel();
        this.nextFocus();
        break;
      case 'up':
      case 'k':
        cancel();
        this.previousFocus();
        break;
    }
  };

  private handleBackdropFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.requestClose();
  };

  private handleBackdropClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.requestClose();
  };
}
