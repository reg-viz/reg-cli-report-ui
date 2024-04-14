import { style } from '@vanilla-extract/css';
import { Space, tokens, typography } from '../../styles/variables.css';

export const link = style([
  typography.body2,
  {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: 44,
    paddingLeft: `calc(${Space * 2}px + ${Space * 2}px * var(--item-depth))`,
    paddingRight: Space * 2,
    color: tokens.color.textBase,
    textAlign: 'left',
    ':hover': {
      backgroundColor: tokens.color.hoverBlack,
    },
  },
]);
