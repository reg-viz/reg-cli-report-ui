import { style } from '@vanilla-extract/css';
import { Space, tokens, typography } from '../../styles/variables.css';

export const wrapper = style([
  typography.subTitle3,
  {
    padding: `${Space * 1.5}px ${Space * 2}px`,
    boxShadow: tokens.shadow.lv2,
    borderRadius: 2,
    background: tokens.color.brandSecondary,
    color: tokens.color.white,
    textAlign: 'center',
  },
]);

export const content = style({
  margin: 0,
});
