import React from 'react';
import * as ReactDOM from 'react-dom';

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

export const Portal: React.FC<Props> = ({ children, onRendered }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    if (portal.el == null) {
      portal.el = document.createElement('div');
      portal.el.classList.add('portal');
      document.body.appendChild(portal.el);
    }

    portal.count++;

    setMounted(true);

    return () => {
      portal.count--;

      if (portal.count <= 0 && portal.el != null) {
        document.body.removeChild(portal.el);
        portal.count = 0;
        portal.el = null;
      }
    };
  }, []);

  React.useEffect(() => {
    if (mounted && onRendered != null) {
      onRendered();
    }
  }, [mounted, onRendered]);

  if (!mounted || portal.el == null) {
    return null;
  }

  return ReactDOM.createPortal(children, portal.el);
};
