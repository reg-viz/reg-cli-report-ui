import { style, styleVariants } from '@vanilla-extract/css';
import { Space, tokens, typography } from '../../styles/variables.css';

const buttonBase = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: 44,
  paddingLeft: `calc(${Space * 2}px + ${Space * 2}px * var(--expandable-depth))`,
  paddingRight: Space * 2,
  background: 'transparent',
  borderWidth: 0,
  color: tokens.color.textBase,
  textAlign: 'left',
  ':hover': {
    backgroundColor: tokens.color.hoverBlack,
  },
});

export const button = styleVariants({
  default: [buttonBase, typography.subTitle3, {}],
  large: [buttonBase, typography.subTitle2, {}],
});

const arrowIconBase = style({
  marginRight: Space * 1,
  lineHeight: 0,
  transition: `transform ${tokens.duration.smallIn} ${tokens.easing.standard}`,
});

export const arrowIcon = styleVariants({
  close: [arrowIconBase, { transform: 'rotate(-180deg)' }],
  open: [arrowIconBase, { transform: 'rotate(0deg)' }],
});

export const label = style({
  display: 'block',
  flex: '1 1 auto',
  overflow: 'hidden',
});

export const meta = style([
  typography.subHead,
  {
    marginLeft: Space * 1,
    color: tokens.color.textSub,
    whiteSpace: 'nowrap',
  },
]);

export const icon = style({
  marginLeft: Space * 1,
  lineHeight: 0,
});

export const innerList = style({
  margin: 0,
  padding: 0,
  listStyle: 'none',
});
