import { style, styleVariants } from '@vanilla-extract/css';
import {
  BreakPoint,
  Space,
  tokens,
  typography,
} from '../../../../styles/variables.css';

const SIZE = 44;

const wrapperBase = style([
  typography.button,
  {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: `${SIZE}px`,
    padding: `0 ${Space * 1}px`,
    borderWidth: 0,
    borderRadius: `${SIZE}px`,
    background: 'transparent',
    textAlign: 'center',
    color: tokens.color.textBase,
    cursor: 'pointer',
    userSelect: 'auto',
    '::before': {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 0,
      display: 'block',
      borderRadius: `${SIZE}px`,
      background: tokens.color.brandPrimary,
      content: '""',
      opacity: 0,
      transition: `all ${tokens.duration.smallOut} ${tokens.easing.back}`,
      transform: 'scale(0.9)',
    },
    ':hover': {
      background: tokens.color.hoverBlack,
    },
    '@media': {
      [`(min-width: ${BreakPoint.SMALL}px)`]: {
        padding: `0 ${Space * 2}px`,
      },
    },
  },
]);

export const wrapper = styleVariants({
  default: [wrapperBase, {}],
  active: [
    wrapperBase,
    {
      color: tokens.color.white,
      cursor: 'default',
      userSelect: 'none',
      '::before': {
        opacity: 1,
        transform: 'scale(1)',
      },
    },
  ],
});

export const inner = style({
  position: 'relative',
  zIndex: 1,
});
