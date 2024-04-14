import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const inner = style({
  position: 'relative',
});

const view = style({
  position: 'absolute',
  top: 0,
  left: '50%',
  width: '100%',
  transform: 'translate(-50%, 0)',
});

export const before = style([
  view,
  {
    zIndex: 0,
  },
]);

export const after = style([
  view,
  {
    zIndex: 1,
  },
]);
