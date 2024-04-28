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
import { useKey } from '../hooks/useKey';
import { useEntities } from '../states/entity';
import { useSidebarMutators } from '../states/sidebar';
import { Color } from '../styles/variables.css';
import { findFirstFocusable } from '../utils/selector';
import * as styles from './App.css';

export type Props = {};

export const App = () => {
  const { toggle: toggleSidebar } = useSidebarMutators();

  const { newItems, failedItems, deletedItems, passedItems } = useEntities();

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

  useKey(null, ['/', 's'], (e) => {
    e.preventDefault();

    if (filterRef.current != null) {
      filterRef.current.focus();
    }
  });

  useKey(null, ['g s'], () => {
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

  useKey(null, ['g c'], () => {
    if (failedItems.length > 0) {
      window.location.hash = 'changed';
    }
  });

  useKey(null, ['g n'], () => {
    if (newItems.length > 0) {
      window.location.hash = 'new';
    }
  });

  useKey(null, ['g d'], () => {
    if (deletedItems.length > 0) {
      window.location.hash = 'deleted';
    }
  });

  useKey(null, ['g p'], () => {
    if (passedItems.length > 0) {
      window.location.hash = 'passed';
    }
  });

  useKey(null, ['f'], () => {
    toggleSidebar();
  });

  useKey(null, ['Shift+?'], () => {
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
