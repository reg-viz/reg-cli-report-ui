import React, { useRef, useCallback, useEffect } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import styled from 'styled-components';
import createFocusTrap, { FocusTrap } from 'focus-trap';
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';
import { Space, Duration, Color, Depth, Easing, Focus } from '../../styles/variables';
import { Portal } from '../internal/Portal';
import { IconButton } from '../IconButton';
import { CloseIcon } from '../icons/CloseIcon';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Depth.DIALOG};
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
  margin: auto ${Space * 3}px;
`;

const Content = styled.div`
  position: relative;
  margin-bottom: ${Space * 3}px;
  background: ${Color.WHITE};
  transition-property: opacity, transform;
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: none;
    box-shadow: ${Focus};
  }

  & > * {
    -webkit-tap-highlight-color: initial;
  }
`;

const Close = styled.div``;

const Backdrop = styled.button`
  position: absolute;
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
  background: rgba(0, 0, 0, 0.7);
  will-change: opacity;
  transition-timing-function: ${Easing.STANDARD};
  transition-property: opacity;
`;

export type Props = Omit<React.ComponentPropsWithoutRef<'div'>, 'id'> & {
  id: string;
  open: boolean;
  onRequestClose: () => void;
};

export const Dialog: React.FC<Props> = ({ id, open, children, onRequestClose, ...rest }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<FocusTrap | null>(null);

  const handleMounted = useCallback(() => {
    const { current: content } = innerRef;
    if (content == null) {
      return;
    }

    focusRef.current = createFocusTrap(content, {});
  }, []);

  const handleCloseClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onRequestClose();
    },
    [onRequestClose],
  );

  useEffect(() => {
    const { current: wrapper } = wrapperRef;
    const { current: focus } = focusRef;

    if (open) {
      if (focus != null) {
        focus.activate();
      }

      if (wrapper != null) {
        enableBodyScroll(wrapper);
      }
    } else {
      if (focus != null) {
        focus.deactivate();
      }

      if (wrapper != null) {
        disableBodyScroll(wrapper);
      }
    }
  }, [open]);

  return (
    <Portal onRendered={handleMounted}>
      <CSSTransition
        classNames="dialog"
        in={open}
        mountOnEnter
        unmountOnExit
        timeout={{
          enter: Duration.MEDIUM_IN,
          exit: Duration.MEDIUM_OUT,
        }}>
        <Wrapper ref={wrapperRef}>
          <Body>
            <Inner ref={innerRef}>
              <Content
                {...rest}
                id={id}
                tabIndex={open ? 0 : -1}
                role="dialog"
                aria-modal="true"
                aria-hidden={open ? 'false' : 'true'}
                onKeyDown={console.log}>
                <div role="document">{children}</div>
                <Close>
                  <IconButton aria-controls={id} aria-label="ダイアログを閉じる" onClick={handleCloseClick}>
                    <CloseIcon color={Color.WHITE} />
                  </IconButton>
                </Close>
              </Content>
            </Inner>

            <Backdrop type="button" aria-controls={id} aria-label="ダイアログを閉じる" onClick={handleCloseClick} />
          </Body>
        </Wrapper>
      </CSSTransition>
    </Portal>
  );
};
