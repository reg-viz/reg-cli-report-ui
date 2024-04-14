import { style, styleVariants } from '@vanilla-extract/css';

export const variants = styleVariants({
  single: {
    display: 'block',
    whiteSpace: 'nowrap',
  },
  multiple: {
    display: '-webkit-box',
    WebkitLineClamp: 'var(--ellipsis-line)',
    WebkitBoxOrient: 'vertical',
  },
});

export const wrapper = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordWrap: 'break-word',
});
