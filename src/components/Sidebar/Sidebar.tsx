import React, { useEffect } from 'react';
import { useMedia } from '../../hooks/useMedia';
import { BreakPoint } from '../../styles/variables.css';
import { usePrevious } from '../../hooks/usePrevious';
import { useSidebarMutators } from '../../states/sidebar';
import { Desktop } from './internal/Desktop';
import { Mobile } from './internal/Mobile';
import type { Props } from './types';

export type { Props };

export const Sidebar = (props: Props) => {
  const { open, close } = useSidebarMutators();
  const isDesktop = useMedia(`(min-width: ${BreakPoint.MEDIUM}px)`);
  const prevIsDesktop = usePrevious(isDesktop);

  useEffect(() => {
    if (isDesktop !== prevIsDesktop) {
      if (isDesktop) {
        open();
      } else {
        close();
      }
    }
  }, [open, close, isDesktop, prevIsDesktop]);

  return isDesktop ? <Desktop {...props} /> : <Mobile {...props} />;
};
