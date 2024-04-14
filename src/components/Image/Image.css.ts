import { style, styleVariants } from '@vanilla-extract/css';

export const wrapper = style({
  position: 'relative',
  display: 'grid',
  justifyContent: 'center',
  alignItems: 'center',
});

export const loading = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  zIndex: 2,
  lineHeight: 0,
  transform: 'translate(-50%, -50%)',
});

const imageBase = style({
  position: 'relative',
  zIndex: 1,
  maxWidth: '100%',
  verticalAlign: 'bottom',
});

export const image = styleVariants({
  default: [imageBase, {}],
  full: [
    imageBase,
    {
      width: '100%',
      height: '100%',
    },
  ],
});
