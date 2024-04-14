import { globalStyle, style } from '@vanilla-extract/css';
import { Space, tokens } from '../../../../styles/variables.css';

export const wrapper = style({
  position: 'sticky !important' as any,
  top: 0,
  bottom: 0,
  left: 0,
  zIndex: tokens.depth.sidebar,
  background: tokens.color.background,
  borderRight: `1px solid ${tokens.color.border}`,
  transitionProperty: 'min-width, width',
  transitionTimingFunction: tokens.easing.standard,
  willChange: 'min-width',
  selectors: {
    '&.sidebar-enter': {
      minWidth: '0 !important',
      width: '0 !important',
    },
    '&.sidebar-enter-active': {
      minWidth: '280px !important',
      transitionDuration: tokens.duration.slideIn,
      transform: 'translate(0, 0)',
    },
    '&.sidebar-enter-done': {
      minWidth: '280px !important',
      transform: 'translate(0, 0)',
    },
    '&.sidebar-exit': {
      minWidth: '280px !important',
    },
    '&.sidebar-exit-active': {
      minWidth: '0 !important',
      width: '0 !important',
      transitionDuration: tokens.duration.slideOut,
    },
    '&.sidebar-exit-done': {
      minWidth: '0 !important',
      width: '0 !important',
    },
  },
});

export const handle = style({
  position: 'absolute',
  top: '50%',
  right: `calc(${Space * 0.5}px + 5px)`,
  width: 4,
  height: 32,
  background: tokens.color.border,
  borderRadius: 4,
  transform: 'translate(1px) scale(0.8)',
  transition: `transform ${tokens.duration.slideIn} ${tokens.easing.back}`,
});

export const handleRight = style({
  zIndex: 10,
});

globalStyle(`${handleRight}:where(:hover, :active) ${handle}`, {
  transform: 'translate(0) scale(1)',
});
