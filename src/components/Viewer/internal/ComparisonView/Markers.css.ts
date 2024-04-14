import { style } from '@vanilla-extract/css';

export const wrapper = style({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 10,
});

export const inner = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  margin: '0 auto',
});

const rect = style({
  position: 'absolute',
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: 2,
});

export const bounding = style([
  rect,
  {
    borderWidth: 1,
    borderColor: '#4183c4',
  },
]);

export const diff = style([
  rect,
  {
    borderColor: '#ff108a',
  },
]);

export const straying = style([
  rect,
  {
    borderColor: '#2aacea',
  },
]);
