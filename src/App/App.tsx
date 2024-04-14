import React, { useCallback, useRef, useState } from 'react';
import { Footer } from '../components/Footer';
import { HelpDialog } from '../components/HelpDialog';
import { IconButton } from '../components/IconButton';
import { Logo } from '../components/Logo';
import { Main } from '../components/Main';
import { Notification } from '../components/Notification';
import { Sidebar } from '../components/Sidebar';
import { Viewer } from '../components/Viewer';
import { HelpIcon } from '../components/icons/HelpIcon';
import { EntityContainer } from '../containers/entity/EntityContainer';
import { SidebarContainer } from '../containers/sidebar/SidebarContainer';
import { useMousetrap } from '../hooks/useMousetrap';
import { findFirstFocusable } from '../utils/selector';
import { Color } from '../styles/variables.css';
import * as styles from './App.css';

export type Props = {};

export const App = () => {
  const sidebar = SidebarContainer.useContainer();

  const { newItems, failedItems, deletedItems, passedItems } =
    EntityContainer.useContainer();

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
      <span className={styles.brand}>
        <Logo size={40} />
      </span>

      <main className={styles.layout}>
        <Sidebar inputRef={filterRef} listRef={listRef} />
        <div className={styles.content}>
          <Main />
          <Footer />
        </div>
      </main>

      <span className={styles.help}>
        <IconButton variant="dark" onClick={handleHelpClick}>
          <HelpIcon fill={Color.WHITE} />
        </IconButton>
      </span>
      <HelpDialog open={helpDialogOpen} onRequestClose={handleHelpClose} />

      <Viewer />
      <Notification />
    </>
  );
};
