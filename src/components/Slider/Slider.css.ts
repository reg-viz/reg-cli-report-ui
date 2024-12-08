import { globalStyle, style } from '@vanilla-extract/css';
import { tokens } from '../../styles/variables.css';

const barStyles = {
  position: 'absolute',
  top: '50%',
  marginTop: -2,
  height: 4,
  borderRadius: 2,
} as const;

export const wrapper = style({
  position: 'relative',
  height: 32,
  cursor: 'pointer',
});

globalStyle(`${wrapper} .rc-slider-rail`, {
  ...barStyles,
  zIndex: 1,
  width: '100%',
  background: tokens.color.border,
});

globalStyle(`${wrapper} .rc-slider-track`, {
  ...barStyles,
  zIndex: 2,
  background: tokens.color.brandPrimary,
});

globalStyle(`${wrapper} .rc-slider-handle`, {
  position: 'absolute',
  top: '50%',
  zIndex: 3,
  marginTop: -9,
  width: 18,
  height: 18,
  background: tokens.color.white,
  borderRadius: '50%',
  border: `4px solid ${tokens.color.brandPrimary}`,
  transitionProperty: 'transform, border',
  transitionDuration: tokens.duration.fadeIn,
  transitionTimingFunction: tokens.easing.standard,
});

globalStyle(`${wrapper} .rc-slider-handle`, {
  position: 'absolute',
  top: '50%',
  zIndex: 3,
  marginTop: -9,
  width: 18,
  height: 18,
  background: tokens.color.white,
  borderRadius: '50%',
  border: `4px solid ${tokens.color.brandPrimary}`,
  transitionProperty: 'transform, border',
  transitionDuration: tokens.duration.fadeIn,
  transitionTimingFunction: tokens.easing.standard,
});

globalStyle(`${wrapper} .rc-slider-handle:focus`, {
  outline: 'none',
});

globalStyle(`${wrapper} .rc-slider-handle:focus-visible`, {
  boxShadow: tokens.state.focus,
});

globalStyle(
  `${wrapper}:hover .rc-slider-handle, ${wrapper} .rc-slider-handle:focus-visible`,
  {
    borderWidth: 2,
    transform: 'scale(1.15)',
  },
);
