import { style } from '@vanilla-extract/css';
import { Space, tokens, typography } from '../../styles/variables.css';

export const wrapper = style({
  padding: `${Space * 18}px 0 ${Space * 15}px`,
  textAlign: 'center',
});

export const label = style([
  typography.body2,
  {
    margin: `${Space * 2}px 0 0`,
  },
]);

export const link = style({
  color: tokens.color.textLink,
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
});
