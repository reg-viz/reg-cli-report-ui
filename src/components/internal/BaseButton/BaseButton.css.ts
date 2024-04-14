import { style } from '@vanilla-extract/css';
import { tokens } from '../../../styles/variables.css';

export const wrapper = style({
  margin: 0,
  padding: 0,
  textDecoration: 'none',
  fontFamily: 'inherit',
  lineHeight: 'inherit',
  letterSpacing: 'inherit',
  transitionProperty: 'color, background, border, opacity',
  transitionDuration: tokens.duration.smallOut,
  transitionTimingFunction: tokens.easing.standard,
  cursor: 'pointer',
  ':disabled': {
    cursor: 'default',
    pointerEvents: 'none',
  },
  ':focus': {
    outline: 'none',
  },
  ':focus-visible': {
    boxShadow: tokens.state.focus,
  },
});
