import { Resizable } from 're-resizable';
import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import { SidebarContainer } from '../../../../containers/sidebar/SidebarContainer';
import { Duration } from '../../../../styles/variables.css';
import type { Props } from '../../types';
import { SidebarInner } from '../SidebarInner';
import * as styles from './Desktop.css';

const DEFAULT_WIDTH = 300;

export type { Props };

export const Desktop = (props: Props) => {
  const sidebar = SidebarContainer.useContainer();

  return (
    <CSSTransition
      appear
      classNames="sidebar"
      in={sidebar.isOpen}
      timeout={{
        enter: Duration.SLIDE_IN,
        exit: Duration.SLIDE_OUT,
      }}
    >
      <Resizable
        className={styles.wrapper}
        handleComponent={{
          right: <span className={styles.handle} />,
        }}
        handleClasses={{
          top: 'handle-top',
          right: styles.handleRight,
          bottom: 'handle-bottom',
          left: 'handle-left',
          topRight: 'handle-top-right',
          topLeft: 'handle-top-left',
          bottomRight: 'handle-bottom-right',
          bottomLeft: 'handle-bottom-left',
        }}
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
      >
        <SidebarInner {...props} />
      </Resizable>
    </CSSTransition>
  );
};
