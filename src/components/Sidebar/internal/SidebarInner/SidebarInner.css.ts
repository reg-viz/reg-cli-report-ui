import { style } from '@vanilla-extract/css';
import { Space } from '../../../../styles/variables.css';

export const inner = style({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 0,
  overflowX: 'visible',
  overflowY: 'auto',
  WebkitOverflowScrolling: 'touch',
  selectors: {
    '.sidebar-exit-done &': {
      display: 'none',
    },
  },
});

export const toggleWrapper = style({
  position: 'absolute',
  top: Space * 2,
  left: `calc(100% + ${Space * 2}px)`,
});
