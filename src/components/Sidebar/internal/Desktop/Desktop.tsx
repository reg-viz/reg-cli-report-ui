import React from 'react';
import styled from 'styled-components';
import { Resizable } from 're-resizable';
import CSSTransition from 'react-transition-group/CSSTransition';
import {
  Space,
  Duration,
  Easing,
  Depth,
  Color,
} from '../../../../styles/variables';
import { SidebarContainer } from '../../../../containers/sidebar/SidebarContainer';
import { SidebarInner } from '../SidebarInner';
import { Props } from '../../types';

const DEFAULT_WIDTH = 300;

const Handle = styled.span`
  position: absolute;
  top: 50%;
  right: calc(${Space * 0.5}px + 5px);
  width: 4px;
  height: 32px;
  background: ${Color.BORDER};
  border-radius: 4px;
  transform: translate(1px) scale(0.8);
  transition: transform ${Duration.SLIDE_IN}ms ${Easing.BACK};
`;

const Wrapper = styled(Resizable)`
  position: sticky !important;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: ${Depth.SIDEBAR};
  background: ${Color.BACKGROUND};
  border-right: 1px solid ${Color.BORDER};
  transition-property: min-width, width;
  transition-timing-function: ${Easing.STANDARD};
  will-change: min-width;

  &.sidebar-enter {
    transition-duration: ${Duration.SLIDE_IN}ms;
  }

  &.sidebar-enter-active,
  &.sidebar-enter-done {
    min-width: 280px !important;
    transform: translate(0, 0);
  }

  &.sidebar-exit {
    min-width: 0 !important;
    width: 0 !important;
    transition-duration: ${Duration.SLIDE_OUT}ms;
  }

  &.sidebar-exit-done {
    min-width: 0 !important;
    width: 0 !important;
  }

  & .handle-right {
    z-index: 10;

    &:hover ${Handle}, &:active ${Handle} {
      transform: translate(0) scale(1);
    }
  }
`;

export { Props };

export const Desktop: React.FC<Props> = (props) => {
  const sidebar = SidebarContainer.useContainer();

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
      <Wrapper
        enable={{
          top: false,
          topRight: false,
          topLeft: false,
          right: sidebar.isOpen,
          bottom: false,
          bottomRight: false,
          bottomLeft: false,
          left: false,
        }}
        defaultSize={{ width: DEFAULT_WIDTH, height: '100vh' }}
        maxWidth="90%"
        minWidth={280}
        minHeight="100vh"
        maxHeight="100vh"
        handleComponent={{
          right: <Handle />,
        }}
        handleClasses={{
          top: 'handle-top',
          right: 'handle-right',
          bottom: 'handle-bottom',
          left: 'handle-left',
          topRight: 'handle-top-right',
          topLeft: 'handle-top-left',
          bottomRight: 'handle-bottom-right',
          bottomLeft: 'handle-bottom-left',
        }}
      >
        <SidebarInner {...props} />
      </Wrapper>
    </CSSTransition>
  );
};
