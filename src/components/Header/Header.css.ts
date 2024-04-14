import { style } from '@vanilla-extract/css';
import {
  BreakPoint,
  Space,
  tokens,
  typography,
} from '../../styles/variables.css';

export const wrapper = style({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gridGap: Space * 1,
  height: tokens.size.headerHeight,
  background: tokens.color.white,
  boxShadow: tokens.shadow.lv1,
  '@media': {
    [`(min-width: ${BreakPoint.SMALL}px)`]: {
      gridTemplateColumns: '2fr 1fr 2fr',
    },
  },
});

export const left = style({
  alignSelf: 'center',
  overflow: 'hidden',
  paddingLeft: Space * 2,
});

export const center = style([
  typography.body2,
  {
    display: 'none',
    alignSelf: 'center',
    textAlign: 'center',
    '@media': {
      [`(min-width: ${BreakPoint.SMALL}px)`]: {
        display: 'block',
      },
    },
  },
]);

export const right = style({
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'flex-start',
  alignItems: 'center',
  alignSelf: 'center',
  paddingRight: Space * 2,
  textAlign: 'right',
});

export const title = style([
  typography.subTitle2,
  {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
  },
]);

export const titleSign = style({
  flex: '0 0 auto',
  marginLeft: Space * 1,
});

export const titleText = style({
  display: 'block',
  flex: '0 1 auto',
  overflow: 'hidden',
  marginLeft: Space * 1,
});

export const markersToggele = style({
  marginRight: Space * 1,
  lineHeight: 0,
});
