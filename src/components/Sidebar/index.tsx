import React from 'react';
import { SidebarContainer } from '../../containers/sidebar/SidebarContainer';
import { Sidebar as Component } from './Sidebar';

export type Props = {};

export const Sidebar: React.FC<Props> = (props) => {
  return (
    <SidebarContainer.Provider>
      <Component {...props} />
    </SidebarContainer.Provider>
  );
};
