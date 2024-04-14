import { style } from '@vanilla-extract/css';
import { BreakPoint, Space } from '../../styles/variables.css';

export const wrapper = style({
  paddingRight: `${Space * 3}px`,
  paddingLeft: `${Space * 3}px`,
  '@media': {
    [`(min-width: ${BreakPoint.MEDIUM}px)`]: {
      paddingRight: `${Space * 5}px`,
      paddingLeft: `${Space * 5}px`,
    },
  },
});
