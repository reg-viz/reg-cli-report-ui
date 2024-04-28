import { globalStyle, style } from '@vanilla-extract/css';
import { BreakPoint, Space, tokens } from '../../styles/variables.css';

export const delay = {
  enter: 120,
  exit: 160,
};

export const wrapper = style({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: tokens.depth.dialog,
  transitionProperty: 'opacity',
  transitionTimingFunction: 'ease-out',
  selectors: {
    '&.dialog-enter': {
      opacity: 0,
    },
    '&.dialog-enter-active': {
      transitionDuration: tokens.duration.fadeIn,
      opacity: 1,
    },
    '&.dialog-exit': {
      opacity: 1,
    },
    '&.dialog-exit-active': {
      transitionDuration: tokens.duration.fadeOut,
      transitionDelay: `${delay.exit}ms`,
      opacity: 0,
    },
  },
});

export const body = style({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflowX: 'hidden',
  overflowY: 'auto',
  WebkitOverflowScrolling: 'touch',
  padding: '60px 0 30px',
  backfaceVisibility: 'hidden',
});

export const inner = style({
  position: 'relative',
  zIndex: 2,
  width: '100%',
  margin: `auto ${Space * 2}px`,
  '@media': {
    [`(min-width: ${BreakPoint.MEDIUM}px)`]: {
      minWidth: 600,
      maxWidth: 1000,
      width: 'auto',
    },
  },
});

export const content = style({
  position: 'relative',
  marginBottom: Space * 3,
  padding: Space * 5,
  borderRadius: 4,
  boxShadow: tokens.shadow.lv2,
  background: tokens.color.white,
  transitionProperty: 'opacity, transform',
  WebkitTapHighlightColor: 'transparent',
  ':focus': {
    outline: 'none',
  },
  ':focus-visible': {
    boxShadow: tokens.state.focus,
  },
  selectors: {
    '.dialog-enter &': {
      transform: 'scale(1.03)',
      opacity: 0,
    },
    '.dialog-enter-active &': {
      transitionDuration: tokens.duration.fadeIn,
      transitionDelay: `${delay.enter}ms`,
      transform: 'scale(1)',
      opacity: 1,
    },
    '.dialog-exit &': {
      opacity: 1,
    },
    '.dialog-exit-active &': {
      transitionDuration: tokens.duration.fadeOut,
      opacity: 0,
    },
  },
});

globalStyle(`${content} > *`, {
  WebkitTapHighlightColor: 'initial',
});

globalStyle(`${content} > div > *:last-child`, {
  marginBottom: '0 !important',
});

export const heading = style({
  margin: `0 0 ${Space * 5}px`,
});

export const close = style({
  position: 'absolute',
  top: Space * 2,
  right: Space * 2,
});

export const backdrop = style({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1,
  display: 'block',
  margin: 0,
  padding: 0,
  width: '100%',
  height: '100%',
  borderWidth: 0,
  background: 'rgba(255, 255, 255, 0.9)',
  willChange: 'opacity',
  transitionTimingFunction: tokens.easing.standard,
  transitionProperty: 'opacity',
});
