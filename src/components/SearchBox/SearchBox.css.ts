import { style } from '@vanilla-extract/css';
import { Space, tokens } from '../../styles/variables.css';

export const wrapper = style({
  position: 'relative',
});

export const icon = style({
  position: 'absolute',
  top: '50%',
  left: 8,
  display: 'block',
  transform: 'translateY(-50%)',
  lineHeight: 0,
});

export const input = style({
  position: 'relative',
  display: 'block',
  width: '100%',
  height: 60,
  padding: `${Space * 1}px ${Space * 1}px ${Space * 1}px ${Space * 7}px`,
  borderWidth: 0,
  borderBottom: `1px solid ${tokens.color.border}`,
  background: 'transparent',
  fontSize: 'inherit',
  fontFamily: 'inherit',
  transition: `border ${tokens.duration.smallOut} ${tokens.easing.standard}`,
  ':focus': {
    outline: 'none',
  },
  ':focus-visible': {
    borderBottomColor: tokens.color.brandPrimary,
  },
});
