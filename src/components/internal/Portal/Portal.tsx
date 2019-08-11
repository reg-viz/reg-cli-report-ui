import React from 'react';
import * as ReactDOM from 'react-dom';

export type Props = {
  children: React.ReactNode;
  onRendered?: () => void;
};

export const Portal: React.FC<Props> = ({ children, onRendered }) => {
  const [mounted, setMounted] = React.useState(false);
  const wrapper: React.MutableRefObject<HTMLDivElement | null> = React.useRef(null);

  React.useEffect(() => {
    wrapper.current = document.createElement('div');
    wrapper.current.classList.add('portal');
    document.body.appendChild(wrapper.current);

    setMounted(true);

    return () => {
      if (wrapper.current != null) {
        document.body.removeChild(wrapper.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if (mounted && onRendered != null) {
      onRendered();
    }
  }, [mounted, onRendered]);

  if (!mounted || wrapper.current == null) {
    return null;
  }

  return ReactDOM.createPortal(children, wrapper.current);
};
