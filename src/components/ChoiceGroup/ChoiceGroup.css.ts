import { style } from '@vanilla-extract/css';
import { BreakPoint, Space, tokens } from '../../styles/variables.css';

export const wrapper = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(48px, 1fr))',
  gridGap: Space * 0.5,
  margin: 0,
  padding: Space * 0.5,
  borderRadius: '26px',
  background: tokens.color.white,
  boxShadow: tokens.shadow.lv2,
  listStyle: 'none',
  '@media': {
    [`(min-width: ${BreakPoint.SMALL}px)`]: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
    },
  },
});
