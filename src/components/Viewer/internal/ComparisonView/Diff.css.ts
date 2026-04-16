import { style, globalStyle } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  justifyContent: 'center',
});

globalStyle(`${wrapper} img`, {
  maxHeight: 'calc(100vh - 220px)',
});
