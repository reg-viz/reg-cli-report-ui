import React from 'react';
import { SidebarContainer } from '../../containers/sidebar/SidebarContainer';
import { Desktop } from './internal/Desktop';
import { Props } from './types';
import { Mobile } from './internal/Mobile';

export { Props };

export const Sidebar: React.FC<Props> = (props) => {
  const sidebar = SidebarContainer.useContainer();

  return sidebar.isDesktop ? <Desktop {...props} /> : <Mobile {...props} />;
};
