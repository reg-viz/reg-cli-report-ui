import { style } from '@vanilla-extract/css';
import { Space, tokens } from '../../styles/variables.css';
import { OPEN_DELAY } from './constants';

export const wrapper = style({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: tokens.depth.viewer,
  minWidth: 320,
  minHeight: 400,
  overflowX: 'hidden',
  overflowY: 'auto',
  transitionProperty: 'opacity',
  transitionTimingFunction: 'ease-out',
  selectors: {
    '.viewer-enter &': {
      opacity: 0,
    },
    '.viewer-enter-active &': {
      opacity: 1,
      transitionDuration: tokens.duration.largeIn,
    },
    '.viewer-exit &': {
      opacity: 1,
    },
    '.viewer-exit-active &': {
      opacity: 0,
      transitionDuration: tokens.duration.largeOut,
    },
  },
});

export const headerWrapper = style({
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
  zIndex: 10,
  transitionProperty: 'opacity, transform',
  transitionTimingFunction: tokens.easing.standard,
  selectors: {
    '.viewer-enter &': {
      opacity: 0,
      transform: 'translateY(-3px)',
    },
    '.viewer-enter-active &': {
      opacity: 1,
      transform: 'translateY(0)',
      transitionDuration: tokens.duration.largeIn,
      transitionDelay: `${OPEN_DELAY}ms`,
    },
  },
});

export const body = style({
  position: 'absolute',
  top: tokens.size.headerHeight,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 5,
});

const navigation = style({
  position: 'absolute',
  top: '50%',
  zIndex: 10,
  transform: 'translate(0, -50%)',
  transitionProperty: 'opacity, transform',
  transitionTimingFunction: tokens.easing.standard,
});

export const previous = style([
  navigation,
  {
    left: Space * 2,
    selectors: {
      '.viewer-enter &': {
        opacity: 0,
        transform: 'translate(-5px, -50%)',
      },
      '.viewer-enter-active &': {
        opacity: 1,
        transform: 'translate(0, -50%)',
        transitionDuration: tokens.duration.largeIn,
        transitionDelay: `${OPEN_DELAY}ms`,
      },
    },
  },
]);

export const next = style([
  navigation,
  {
    right: Space * 2,
    selectors: {
      '.viewer-enter &': {
        opacity: 0,
        transform: 'translate(5px, -50%)',
      },
      '.viewer-enter-active &': {
        opacity: 1,
        transform: 'translate(0, -50%)',
        transitionDuration: tokens.duration.largeIn,
        transitionDelay: `${OPEN_DELAY}ms`,
      },
    },
  },
]);

export const background = style({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 0,
});
