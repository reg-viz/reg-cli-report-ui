import { style, globalStyle } from '@vanilla-extract/css';
import { BreakPoint, Space } from '../../../../styles/variables.css';

export const wrapper = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridGap: Space * 1,
  justifyContent: 'center',
  alignItems: 'start',
  '@media': {
    [`(min-width: ${BreakPoint.MEDIUM}px)`]: {
      gridGap: Space * 3,
    },
  },
});

export const view = style({
  position: 'relative',
});

globalStyle(`${view} img`, {
  maxHeight: 'calc(100vh - 220px)',
});
