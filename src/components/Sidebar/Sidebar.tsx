import React, { useState, useCallback, useEffect } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import styled from 'styled-components';
import { Resizable } from 're-resizable';
import { Color, Space, Duration, Easing, BreakPoint, Depth } from '../../styles/variables';
import { List } from '../List';
import { SearchBox } from '../SearchBox';
import { SignChangedIcon } from '../icons/SignChangedIcon';
import { SignNewIcon } from '../icons/SignNewIcon';
import { SignPassedIcon } from '../icons/SignPassedIcon';
import { Spacer } from '../Spacer';
import { PoweredBy } from '../PoweredBy';
import { RegStructualItem } from '../../types/reg';
import { SignDeletedIcon } from '../icons/SignDeletedIcon';
import { SidebarContainer } from '../../containers/sidebar/SidebarContainer';
import { Toggle } from './internal/Toggle';

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
  top: 0;
  bottom: 0;
  left: 0;
  z-index: ${Depth.SIDEBAR};
  background: ${Color.BACKGROUND};
  border-right: 1px solid ${Color.BORDER};

  /**
   * Desktop
   */
  @media (min-width: ${BreakPoint.SMALL}px) {
    position: sticky !important;
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
  }

  /**
   * Mobile
   */
  @media (max-width: ${BreakPoint.SMALL - 1}px) {
    position: fixed !important;
    min-width: 0 !important;
    width: 240px !important;
    transition-property: transform;
    transition-timing-function: ${Easing.STANDARD};

    &.sidebar-enter {
      transition-duration: ${Duration.SLIDE_IN}ms;
      transform: translateX(-100%);
    }

    &.sidebar-enter-active,
    &.sidebar-enter-done {
      transform: translateX(0);
    }

    &.sidebar-exit {
      transform: translateX(0);
      transition-duration: ${Duration.SLIDE_OUT}ms;
    }

    &.sidebar-exit-active,
    &.sidebar-exit-done {
      transform: translateX(-100%);
    }
  }
`;

const Inner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  overflow-x: visible;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  .sidebar-exit-done & {
    display: none;
  }
`;

const ToggleWrapper = styled.div`
  position: absolute;
  top: ${Space * 2}px;
  left: calc(100% + ${Space * 2}px);
`;

export type Props = {};

const renderItem = (label: string, depth: number, item: RegStructualItem) => {
  if (item.child != null) {
    return (
      <List.Expandable key={`${label}${item.name}`} depth={depth} label={item.name}>
        {renderItem(label, depth + 1, item.child)}
      </List.Expandable>
    );
  }

  return (
    <List.Item key={item.id} depth={depth + 1} href={`#${item.id}`} title={item.path}>
      {item.name}
    </List.Item>
  );
};

const renderItems = (label: string, icon: React.ReactNode, items: RegStructualItem[]) => {
  if (items.length < 1) {
    return null;
  }

  return (
    <List.Expandable large label={label} meta={`${items.length} items`} icon={icon}>
      {items.map((item) => renderItem(label, 1, item))}
    </List.Expandable>
  );
};

export const Sidebar: React.FC<Props> = () => {
  const sidebar = SidebarContainer.useContainer();

  const mql = window.matchMedia(`(max-width: ${BreakPoint.SMALL - 1}px)`);
  const [mobile, setMobile] = useState(mql.matches);

  useEffect(() => {
    if (mql.matches) {
      sidebar.close();
    }
  }, [mql.matches, sidebar]);

  useEffect(() => {
    const handler = () => {
      const next = mql.matches;

      setMobile(next);

      if (open && next) {
        sidebar.toggle();
      }
    };

    mql.addListener(handler);

    return () => {
      mql.removeListener(handler);
    };
  }, [mql, sidebar]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      sidebar.filter(e.target.value);
    },
    [sidebar],
  );

  return (
    <CSSTransition
      classNames="sidebar"
      in={sidebar.isOpen}
      appear
      timeout={{
        enter: Duration.SLIDE_IN,
        exit: Duration.SLIDE_OUT,
      }}>
      <Wrapper
        enable={{
          top: false,
          topRight: false,
          topLeft: false,
          right: mobile ? false : sidebar.isOpen,
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
        }}>
        <Inner id="sidebar">
          <SearchBox placeholder="Filter by file name" onChange={handleChange} />

          <Spacer variant="margin" x={3} />

          <List header="SUMMARY">
            {renderItems('CHANGED', <SignChangedIcon fill={Color.SIGN_CHANGED} />, sidebar.failedItems)}
            {renderItems('NEW', <SignNewIcon fill={Color.SIGN_NEW} />, sidebar.newItems)}
            {renderItems('DELETED', <SignDeletedIcon fill={Color.SIGN_DELETED} />, sidebar.deletedItems)}
            {renderItems('PASSED', <SignPassedIcon fill={Color.SIGN_PASSED} />, sidebar.passedItems)}
          </List>

          <Spacer variant="margin" x={3} />

          <List header="LINKS">
            <List.Item href="#">Extensible Link 1</List.Item>
            <List.Item href="#">Extensible Link 2</List.Item>
          </List>

          <Spacer variant="margin" x={3} />

          <PoweredBy />
        </Inner>

        <ToggleWrapper>
          <Toggle open={sidebar.isOpen} onClick={sidebar.toggle} />
        </ToggleWrapper>
      </Wrapper>
    </CSSTransition>
  );
};
