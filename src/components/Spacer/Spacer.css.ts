import { style, styleVariants } from '@vanilla-extract/css';
import { Space } from '../../styles/variables.css';

const wrapperBase = style({
  display: 'block',
});

export const wrapper = styleVariants({
  margin: [
    wrapperBase,
    {
      marginTop: `calc(${Space}px * var(--spacer-x))`,
    },
  ],
  padding: [
    wrapperBase,
    {
      paddingTop: `calc(${Space}px * var(--spacer-x))`,
    },
  ],
});
