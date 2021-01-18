import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { Focus, Duration, Easing } from '../../../styles/variables';
import { Link } from '../../Link';

const Wrapper = styled('button')`
  margin: 0;
  padding: 0;
  text-decoration: none;
  font-family: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  transition-property: color, background, border, opacity;
  transition-duration: ${Duration.SMALL_OUT}ms;
  transition-timing-function: ${Easing.STANDARD};
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:focus-visible {
    box-shadow: ${Focus};
  }

  &:disabled {
    cursor: default;
    pointer-events: none;
  }
`;

export type Props = React.ComponentPropsWithoutRef<'button'> & {
  download?: any;
  href?: string;
  hrefLang?: string;
  media?: string;
  ping?: string;
  rel?: string;
  target?: string;
  type?: string;
  referrerPolicy?: string;
};

export const BaseButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  Props
>(({ type, href, children, ...rest }, ref) => {
  const linkable = href != null;
  const props = linkable ? ({ href, ...rest } as any) : { type, ...rest };

  return (
    <Wrapper {...props} ref={ref} as={linkable ? Link : 'button'}>
      {children}
    </Wrapper>
  );
});

BaseButton.defaultProps = {
  type: 'button',
};
