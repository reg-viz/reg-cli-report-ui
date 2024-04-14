import { style } from '@vanilla-extract/css';
import { Space, tokens, typography } from '../../styles/variables.css';

export const button = style({
  display: 'flex',
  alignItems: 'center',
  padding: `${Space * 3}px ${Space * 2}px`,
  minWidth: 280,
  background: 'transparent',
  ':hover': {
    backgroundColor: tokens.color.hoverBlack,
  },
});

export const icon = style({
  marginRight: Space * 1,
});

export const title = style([
  typography.subTitle3,
  {
    margin: 0,
    color: tokens.color.textBase,
  },
]);

export const url = style([
  typography.body3,
  {
    margin: 0,
    color: tokens.color.textSub,
  },
]);
