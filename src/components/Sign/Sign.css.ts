import { style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '../../styles/variables.css';

const wrapperBase = style({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 24,
  height: 24,
  borderRadius: '50%',
  lineHeight: 0,
  verticalAlign: 'bottom',
});

export const wrapper = styleVariants({
  passed: [
    wrapperBase,
    {
      backgroundColor: tokens.color.signPassed,
    },
  ],
  new: [
    wrapperBase,
    {
      backgroundColor: tokens.color.signNew,
    },
  ],
  changed: [
    wrapperBase,
    {
      backgroundColor: tokens.color.signChanged,
    },
  ],
  deleted: [
    wrapperBase,
    {
      backgroundColor: tokens.color.signDeleted,
    },
  ],
});
