import { style } from '@vanilla-extract/css';
import { Space, tokens } from '../styles/variables.css';

export const brand = style({
  position: 'absolute',
  top: Space * 3,
  right: Space * 3,
});

export const layout = style({
  display: 'flex',
  height: '100%',
  isolation: 'isolate',
});

export const content = style({
  flex: '1 0 auto',
  maxWidth: '100%',
});

export const help = style({
  position: 'fixed',
  right: Space * 3,
  bottom: Space * 3,
  borderRadius: '50%',
  background: tokens.color.brandSecondary,
  boxShadow: tokens.shadow.lv2,
  zIndex: 10,
});
