import { style, styleVariants } from '@vanilla-extract/css';
import { Duration, Space, tokens } from '../../styles/variables.css';

export const placementOrigin = styleVariants({
  'top-left': {
    transformOrigin: 'bottom right',
  },
  top: {
    transformOrigin: 'bottom center',
  },
  'top-right': {
    transformOrigin: 'bottom left',
  },
  right: {
    transformOrigin: 'center left',
  },
  'bottom-right': {
    transformOrigin: 'top left',
  },
  bottom: {
    transformOrigin: 'top center',
  },
  'bottom-left': {
    transformOrigin: 'top right',
  },
  left: {
    transformOrigin: 'center right',
  },
});

export const placementTranslate = styleVariants({
  'top-left': {
    transform: `translateY(${Space * 0.5}px)`,
  },
  top: {
    transform: `translateY(${Space * 0.5}px)`,
  },
  'top-right': {
    transform: `translateY(${Space * 0.5}px)`,
  },
  right: {
    transform: `translateY(${Space * -0.5}px)`,
  },
  'bottom-right': {
    transform: `translateY(${Space * -0.5}px)`,
  },
  bottom: {
    transform: `translateY(${Space * -0.5}px)`,
  },
  'bottom-left': {
    transform: `translateY(${Space * -0.5}px)`,
  },
  left: {
    transform: `translateY(${Space * 0.5}px)`,
  },
});

export const wrapper = style({
  position: 'absolute',
  zIndex: tokens.depth.menu,
  transitionProperty: 'transform, opacity',
  transitionTimingFunction: tokens.easing.standard,
  selectors: {
    '&.menu-enter': {
      transform: 'scale(0.98)',
      opacity: 0,
    },
    '&.menu-enter-active': {
      transitionDuration: tokens.duration.mediumIn,
      transform: 'scale(1)',
      opacity: 1,
    },
    '&.menu-exit': {
      transform: 'scale(1)',
      opacity: 1,
    },
    '&.menu-exit-active': {
      transitionDuration: tokens.duration.mediumOut,
      transform: 'scale(0.98)',
      opacity: 0,
    },
  },
});

export const scale = style({
  minWidth: 200,
  maxWidth: 320,
  padding: `${Space * 1}px 0`,
  borderRadius: 3,
  background: tokens.color.white,
  boxShadow: tokens.shadow.lv2,
  transitionProperty: 'transform',
  selectors: {
    '.menu-enter &': {
      transform: 'scale(0.6, 0.7)',
    },
    '.menu-enter-active &': {
      transitionDuration: `${Duration.MEDIUM_IN - Duration.SMALL_IN}ms`,
      transform: 'scale(1, 1)',
    },
    '.menu-exit &': {
      transform: 'scale(1, 1)',
    },
    '.menu-exit-active &': {
      transitionDuration: `${Duration.MEDIUM_OUT - Duration.SMALL_OUT}ms`,
      transform: 'scale(0.99, 0.97)',
    },
  },
});

export const opacity = style({
  transitionProperty: 'transform, opacity',
  transitionTimingFunction: tokens.easing.standard,
  selectors: {
    '.menu-enter &': {
      opacity: 0,
    },
    '.menu-enter-active &': {
      transitionDuration: `${Duration.MEDIUM_IN - Duration.SMALL_IN}ms`,
      transitionDelay: `${(Duration.MEDIUM_IN - Duration.SMALL_IN) / 2}ms`,
      transform: 'translateY(0)',
      opacity: 1,
    },
    '.menu-enter-done &': {
      transform: 'translateY(0)',
    },
    '.menu-exit &': {
      opacity: 1,
      transform: 'translateY(0)',
    },
    '.menu-exit-active &': {
      transitionDuration: `${Duration.MEDIUM_OUT - Duration.SMALL_OUT}ms`,
      transform: 'translateY(0)',
      opacity: 0,
    },
  },
});

export const list = style({
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const backdrop = style({
  position: 'fixed',
  zIndex: `calc(${tokens.depth.menu} - 1)`,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  borderWidth: 0,
  background: 'transparent',
});
