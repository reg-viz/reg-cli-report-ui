import { style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '../../../../styles/variables.css';

export const wrapper = style({
  position: 'relative',
  display: 'block',
  width: 44,
  height: 44,
  borderWidth: 0,
  borderRadius: 4,
  background: 'transparent',
});

const lineBase = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  display: 'block',
  marginLeft: '-19px',
  height: 4,
  borderRadius: 4,
  background: tokens.color.textBase,
  transition: `all ${tokens.duration.mediumOut} ${tokens.easing.standard}`,
});

const lineFirstBase = style([
  lineBase,
  {
    marginTop: -13,
    willChange: 'width',
  },
]);

const lineSecondBase = style([
  lineBase,
  {
    marginTop: -2.5,
    width: 38,
  },
]);

const lineThirdBase = style([
  lineBase,
  {
    marginTop: 10,
    width: 22,
  },
]);

export const line = styleVariants({
  firstClose: [
    lineFirstBase,
    {
      width: 30,
    },
  ],
  firstOpen: [
    lineFirstBase,
    {
      width: 38,
      transform: 'rotate(225deg) translate(-7px, -8px)',
    },
  ],
  secondClose: [lineSecondBase, {}],
  secondOpen: [
    lineSecondBase,
    {
      transform: 'rotate(135deg)',
    },
  ],
  thirdClose: [
    lineThirdBase,
    {
      opacity: 1,
    },
  ],
  thirdOpen: [
    lineThirdBase,
    {
      opacity: 0,
      transform: 'rotate(45deg) translate(-4px, -6px)',
    },
  ],
});
