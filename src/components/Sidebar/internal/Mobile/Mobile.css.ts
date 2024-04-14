import { style } from '@vanilla-extract/css';
import { Space, tokens } from '../../../../styles/variables.css';

export const inner = style({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: tokens.depth.sidebar,
  width: `calc(100% - 44px - ${Space * 4}px)`,
  background: tokens.color.background,
  transitionProperty: 'box-shadow, transform',
  transitionTimingFunction: tokens.easing.standard,
  transform: 'translateX(-100%)',
  selectors: {
    '.sidebar-enter &': {
      transform: 'translateX(-100%)',
    },
    '.sidebar-enter-active &': {
      transitionDuration: tokens.duration.slideIn,
      transform: 'translateX(0)',
    },
    '.sidebar-enter-done &': {
      boxShadow: tokens.shadow.lv2,
      transform: 'translateX(0)',
    },
    '.sidebar-exit &': {
      transform: 'translateX(0)',
    },
    '.sidebar-exit-active &': {
      transitionDuration: tokens.duration.slideOut,
      transform: 'translateX(-100%)',
    },
    '.sidebar-exit-done &': {
      transform: 'translateX(-100%)',
    },
  },
});

export const backdrop = style({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: `calc(${tokens.depth.sidebar} - 1)`,
  display: 'none',
  margin: 0,
  padding: 0,
  width: '100%',
  height: '100%',
  borderWidth: 0,
  background: 'rgba(0, 0, 0, 0.2)',
  transitionTimingFunction: tokens.easing.standard,
  transitionProperty: 'opacity',
  selectors: {
    '.sidebar-enter &': {
      display: 'block',
      opacity: 0,
    },
    '.sidebar-enter-active &': {
      display: 'block',
      opacity: 1,
      transitionDuration: tokens.duration.slideIn,
    },
    '.sidebar-enter-done &': {
      display: 'block',
      opacity: 1,
    },
    '.sidebar-exit &': {
      display: 'block',
      opacity: 1,
    },
    '.sidebar-exit-active &': {
      display: 'block',
      transitionDuration: tokens.duration.slideOut,
      opacity: 0,
    },
    '.sidebar-exit-done &': {
      display: 'none',
    },
  },
});
