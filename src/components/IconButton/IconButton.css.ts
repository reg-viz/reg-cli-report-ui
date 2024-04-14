import { style } from '@vanilla-extract/css';
import { tokens } from '../../styles/variables.css';

const SIZE = 40;

export const wrapper = style({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: SIZE,
  height: SIZE,
  margin: 0,
  padding: 0,
  borderWidth: 0,
  borderRadius: '50%',
  fontSize: 0,
  lineHeight: 0,
});

export const wrapperLight = style({
  background: 'transparent',
  ':hover': {
    background: tokens.color.hoverBlack,
  },
});

export const wrapperDark = style({
  background: 'transparent',
  ':hover': {
    background: tokens.color.hoverWhite,
  },
});
