import { style } from '@vanilla-extract/css';
import { tokens } from '../../../styles/variables.css';

export const wrapper = style({
  transitionProperty: 'height',
  transitionTimingFunction: tokens.easing.standard,
  selectors: {
    '&[aria-hidden="true"]:not(.collapse-exit)': {
      display: 'none',
    },
    '&.collapse-enter': {
      overflow: 'hidden',
      height: 0,
      transitionDuration: 'var(--collapse-duration-enter)',
    },
    '&.collapse-enter-active': {
      transitionDuration: 'var(--collapse-duration-enter)',
    },
    '&.collapse-exit': {
      overflow: 'auto',
      height: 'auto',
    },
    '&.collapse-exit-active': {
      overflow: 'hidden',
      height: 0,
      transitionDuration: 'var(--collapse-duration-exit)',
    },
  },
});

export const inner = style({
  display: 'flex',
});

export const innerBox = style({
  flexBasis: '100%',
  width: '100%',
});
