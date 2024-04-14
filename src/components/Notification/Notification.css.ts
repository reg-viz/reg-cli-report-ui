import { style } from '@vanilla-extract/css';
import { BreakPoint, Space, tokens } from '../../styles/variables.css';

export const wrapper = style({
  position: 'fixed',
  right: Space * 2,
  bottom: Space * 2,
  left: Space * 2,
  zIndex: tokens.depth.notification,
  '@media': {
    [`(min-width: ${BreakPoint.SMALL}px)`]: {
      left: '50%',
      right: 'auto',
      minWidth: 230,
      transform: 'translateX(-50%)',
    },
  },
});

export const inner = style({
  transitionProperty: 'opacity, transform',
  transitionTimingFunction: tokens.easing.standard,
  selectors: {
    '&.notification-enter': {
      transform: 'translateY(5px)',
      opacity: 0,
    },
    '&.notification-enter-active': {
      transitionDuration: tokens.duration.fadeIn,
      transform: 'translateY(0)',
      opacity: 1,
    },
    '&.notification-exit': {
      transform: 'translateY(0)',
      opacity: 1,
    },
    '&.notification-exit-active': {
      transitionDuration: tokens.duration.fadeOut,
      transform: 'translateY(2px)',
      opacity: 0,
    },
  },
});
