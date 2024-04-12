import React from 'react';
import { SidebarContainer } from '../../containers/sidebar/SidebarContainer';
import { Desktop } from './internal/Desktop';
import type { Props } from './types';
import { Mobile } from './internal/Mobile';

export type { Props };

export const Sidebar = (props: Props) => {
  const sidebar = SidebarContainer.useContainer();

  return sidebar.isDesktop ? <Desktop {...props} /> : <Mobile {...props} />;
};
