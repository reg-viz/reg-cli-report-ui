import type React from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { MainAppId } from '../../../constants';

const portal: {
  el: HTMLDivElement | null;
  count: number;
} = {
  el: null,
  count: 0,
};

export type Props = {
  children: React.ReactNode;
  onRendered?: () => void;
};

export const Portal = ({ children, onRendered }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const app =
      document.getElementById(MainAppId) ??
      document.getElementById('storybook-root');
    if (app == null) {
      return;
    }

    if (portal.el == null) {
      portal.el = document.createElement('div');
      portal.el.classList.add('portal');
      app.appendChild(portal.el);
    }

    portal.count++;

    setMounted(true);

    return () => {
      portal.count--;

      if (portal.count <= 0 && portal.el != null) {
        app.removeChild(portal.el);
        portal.count = 0;
        portal.el = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mounted && onRendered != null) {
      onRendered();
    }
  }, [mounted, onRendered]);

  if (!mounted || portal.el == null) {
    return null;
  }

  return createPortal(children, portal.el);
};
