import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { Sidebar } from '../components/Sidebar';
import { GlobalStyle } from '../styles/global-styles';
import { Logo } from '../components/Logo';
import { Space, Shadow, Color } from '../styles/variables';
import { Main } from '../components/Main';
import { Footer } from '../components/Footer';
import { Viewer } from '../components/Viewer';
import { Notification } from '../components/Notification';
import { IconButton } from '../components/IconButton';
import { HelpIcon } from '../components/icons/HelpIcon';
import { HelpDialog } from '../components/HelpDialog';
import { SidebarContainer } from '../containers/sidebar/SidebarContainer';
import { findFirstFocusable } from '../utils/selector';
import { useMousetrap } from '../hooks/useMousetrap';
import { EntityContainer } from '../containers/entity/EntityContainer';

const Layout = styled.main`
  display: flex;
  height: 100%;
  isolation: isolate;
`;

const Content = styled.div`
  flex: 1 0 auto;
  max-width: 100%;
`;

const Brand = styled.span`
  position: absolute;
  top: ${Space * 3}px;
  right: ${Space * 3}px;
`;

const Help = styled.span`
  position: fixed;
  right: ${Space * 3}px;
  bottom: ${Space * 3}px;
  border-radius: 50%;
  background: ${Color.BRAND_SECONDARY};
  box-shadow: ${Shadow.LEVEL2};
  z-index: 10;
`;

export type Props = {};

export const App: React.FC<Props> = () => {
  const sidebar = SidebarContainer.useContainer();
  const {
    newItems,
    failedItems,
    deletedItems,
    passedItems,
  } = EntityContainer.useContainer();

  const [helpDialogOpen, setHelpDialogOpen] = useState(false);

  const filterRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const handleHelpClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setHelpDialogOpen(true);
  }, []);

  const handleHelpClose = useCallback(() => {
    setHelpDialogOpen(false);
  }, []);

  useMousetrap(['/', 's'], null, (e) => {
    e.preventDefault();

    if (filterRef.current != null) {
      filterRef.current.focus();
    }
  });

  useMousetrap('g s', null, () => {
    const { current: list } = listRef;
    if (list == null) {
      return;
    }

    const first = findFirstFocusable(list);
    if (first == null) {
      return;
    }

    first.focus();
  });

  useMousetrap(
    'g c',
    null,
    () => {
      if (failedItems.length > 0) {
        window.location.hash = 'changed';
      }
    },
    [failedItems],
  );

  useMousetrap(
    'g n',
    null,
    () => {
      if (newItems.length > 0) {
        window.location.hash = 'new';
      }
    },
    [newItems],
  );

  useMousetrap(
    'g d',
    null,
    () => {
      if (deletedItems.length > 0) {
        window.location.hash = 'deleted';
      }
    },
    [deletedItems],
  );

  useMousetrap(
    'g p',
    null,
    () => {
      if (passedItems.length > 0) {
        window.location.hash = 'passed';
      }
    },
    [passedItems],
  );

  useMousetrap(
    'f',
    null,
    () => {
      sidebar.toggle();
    },
    [sidebar],
  );

  useMousetrap('?', null, () => {
    setHelpDialogOpen(true);
  });

  return (
    <>
      <GlobalStyle />

      <Brand>
        <Logo size={40} />
      </Brand>

      <Layout>
        <Sidebar inputRef={filterRef} listRef={listRef} />
        <Content>
          <Main />
          <Footer />
        </Content>
      </Layout>

      <Help>
        <IconButton variant="dark" onClick={handleHelpClick}>
          <HelpIcon fill={Color.WHITE} />
        </IconButton>
      </Help>
      <HelpDialog open={helpDialogOpen} onRequestClose={handleHelpClose} />

      <Viewer />
      <Notification />
    </>
  );
};
