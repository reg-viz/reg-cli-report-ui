import { style } from '@vanilla-extract/css';
import { Space, tokens, typography } from '../../styles/variables.css';

export const wrapper = style({
  display: 'inline-flex',
  alignItems: 'center',
});

export const checkbox = style({
  position: 'relative',
});

export const checkboxInput = style({
  position: 'absolute',
  top: '-25%',
  left: '-25%',
  width: '150%',
  height: '150%',
  zIndex: 2,
  margin: 0,
  padding: 0,
  opacity: 0,
  cursor: 'pointer',
});

export const checkboxVisual = style({
  position: 'relative',
  zIndex: 1,
  display: 'block',
  width: 42,
  height: 22,
  borderRadius: 11,
  background: tokens.color.border,
  transition: `transform ${tokens.duration.smallOut} ${tokens.easing.standard}`,
  '::before': {
    position: 'absolute',
    top: 1,
    left: 1,
    width: 20,
    height: 20,
    borderRadius: '50%',
    background: tokens.color.white,
    boxShadow: tokens.shadow.lv1,
    transition: `transform ${tokens.duration.smallOut} ${tokens.easing.standard}`,
    content: '""',
  },
  selectors: {
    'input:checked + &': {
      background: tokens.color.brandPrimary,
    },
    'input:checked + &::before': {
      transform: 'translateX(20px)',
    },
    'input:focus-visible + &': {
      boxShadow: tokens.state.focus,
    },
  },
});

export const prepend = style([
  typography.subTitle3,
  {
    marginRight: Space * 1,
    textAlign: 'right',
  },
]);

export const append = style([
  typography.subTitle3,
  {
    marginLeft: Space * 1,
    textAlign: 'left',
  },
]);
