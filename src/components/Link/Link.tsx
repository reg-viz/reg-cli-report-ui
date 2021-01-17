import React, { forwardRef, useCallback } from 'react';
import { useHistory } from '../../hooks/useHistory';

const HTTP_URL_REG = /^https?:\/\//;
const HASH_URL_REG = /^#/;

const isModifiedMouseEvent = (e: MouseEvent | React.MouseEvent<any>) =>
  e.metaKey || e.altKey || e.ctrlKey || e.shiftKey || e.defaultPrevented;

export type Props = React.ComponentProps<'a'>;

export const Link = forwardRef<HTMLAnchorElement, Props>(
  ({ href, target, rel, children, onClick, ...rest }, ref) => {
    const history = useHistory();

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (onClick != null) {
          onClick(e);
        }

        if (
          href == null ||
          !!target ||
          e.button !== 0 ||
          isModifiedMouseEvent(e)
        ) {
          return;
        }

        if (HASH_URL_REG.test(href) || HTTP_URL_REG.test(href)) {
          return;
        }

        e.preventDefault();

        history.push(href);
      },
      [history, href, target, onClick],
    );

    return (
      <a
        {...rest}
        ref={ref}
        rel={target === '_blank' && rel == null ? 'noopener noreferrer' : rel}
        href={href}
        target={target}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  },
);

Link.displayName = 'Link';
