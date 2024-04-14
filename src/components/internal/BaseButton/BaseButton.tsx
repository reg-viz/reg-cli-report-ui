import { clsx } from 'clsx';
import React, { forwardRef } from 'react';
import type { Modify } from '../../../utils/types';
import { Link } from '../../Link';
import * as styles from './BaseButton.css';

export type Props = Modify<
  React.ComponentPropsWithoutRef<'button'>,
  {
    download?: any;
    href?: string;
    hrefLang?: string;
    media?: string;
    ping?: string;
    rel?: string;
    target?: string;
    type?: string;
    referrerPolicy?: string;
  }
>;

export const BaseButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  Props
>(({ className, type = 'button', href, children, ...rest }, ref) => {
  const linkable = href != null;
  const Component = linkable ? Link : 'button';
  const props = linkable ? ({ href, ...rest } as any) : { type, ...rest };

  return (
    <Component {...props} className={clsx(styles.wrapper, className)} ref={ref}>
      {children}
    </Component>
  );
});
