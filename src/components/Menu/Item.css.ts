import { style } from '@vanilla-extract/css';
import { Space, tokens, typography } from '../../styles/variables.css';

export const inner = style([
  typography.body2,
  {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    padding: `${Space * 1}px ${Space * 2}px`,
    borderWidth: 0,
    background: tokens.color.white,
    color: tokens.color.textBase,
    textAlign: 'left',
    ':hover': {
      background: tokens.color.hoverBlack,
    },
    ':focus': {
      zIndex: 2,
    },
  },
]);
