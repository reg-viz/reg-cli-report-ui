import { style } from '@vanilla-extract/css';
import { Space, tokens, typography } from '../../styles/variables.css';

export const list = style({
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const header = style([
  typography.subHead,
  {
    marginBottom: Space * 0.5,
    padding: `0 ${Space * 2}px`,
    color: tokens.color.textSub,
  },
]);
