import { style } from '@vanilla-extract/css';
import { BreakPoint, Space, tokens } from '../../../../styles/variables.css';
import { OPEN_DELAY } from '../../constants';

export const wrapper = style({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 5,
});

export const comparisonImage = style({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflowX: 'hidden',
  overflowY: 'auto',
  WebkitOverflowScrolling: 'touch',
});

export const comparisonImageInnerV = style({
  margin: `auto ${Space * 1}px`,
  width: '100%',
  '@media': {
    [`(min-width: ${BreakPoint.MEDIUM}px)`]: {
      marginRight: Space * 5,
      marginLeft: Space * 5,
    },
  },
});

export const comparisonImageInnerH = style({
  position: 'relative',
  margin: `${Space * 3}px auto ${Space * 17}px`,
});

export const comparisonMode = style({
  position: 'absolute',
  bottom: Space * 1,
  left: '50%',
  zIndex: 10,
  maxWidth: '100%',
  width: 480,
  padding: `0 ${Space * 1}px`,
  transform: 'translate(-50%, 0)',
  transitionProperty: 'opacity, transform',
  transitionTimingFunction: tokens.easing.standard,
  '@media': {
    [`(min-width: ${BreakPoint.MEDIUM}px)`]: {
      bottom: Space * 5,
    },
  },
  selectors: {
    '.viewer-enter &': {
      opacity: 0,
      transform: 'translate(-50%, 3px)',
    },
    '.viewer-enter-active &': {
      transitionDuration: tokens.duration.largeIn,
      transitionDelay: `${OPEN_DELAY}ms`,
      opacity: 1,
      transform: 'translate(-50%, 0)',
    },
  },
});

export const controlWrapper = style({
  position: 'absolute',
  right: 0,
  bottom: '100%',
  left: 0,
  padding: `0 ${Space * 1}px ${Space * 2}px`,
});

export const control = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 40,
  padding: `${Space * 1}px ${Space * 4}px`,
  borderRadius: 20,
  background: tokens.color.white,
  boxShadow: tokens.shadow.lv2,
  transitionProperty: 'opacity, transform',
  transitionTimingFunction: tokens.easing.standard,
  selectors: {
    '.control-enter &': {
      opacity: 0,
      transform: 'translateY(3px)',
    },
    '.control-enter-active &': {
      transitionDuration: tokens.duration.fadeIn,
      opacity: 1,
      transform: 'translateY(0)',
    },
    '.control-exit &': {
      opacity: 1,
      transform: 'translateY(0)',
    },
    '.control-exit-active &': {
      transitionDuration: tokens.duration.fadeOut,
      opacity: 0,
      transform: 'translateY(1px)',
    },
  },
});

export const controlSlider = style({
  flex: '1 0 auto',
  padding: `0 ${Space * 2}px`,
});
