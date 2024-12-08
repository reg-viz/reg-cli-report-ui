import { style } from '@vanilla-extract/css';
import { tokens } from '../../../../styles/variables.css';

export const wrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const inner = style({
  position: 'relative',
});

export const range = style({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 5,
  margin: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
  appearance: 'none',
  touchAction: 'auto',
});

export const frame = style({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  zIndex: 2,
  overflow: 'hidden',
});

const view = style({
  position: 'absolute',
  top: 0,
  left: '50%',
  transform: 'translate(-50%, 0)',
});

export const after = style([
  view,
  {
    zIndex: 0,
  },
]);

export const before = style([
  view,
  {
    zIndex: 1,
    transform: 'translate(0, 0)',
  },
]);

export const handle = style({
  position: 'absolute',
  top: 0,
  bottom: 0,
  zIndex: 5,
  cursor: 'ew-resize',
});

export const handleBar = style({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: '50%',
  marginLeft: -1,
  width: 2,
  background: '#fff',
  '::after': {
    position: 'absolute',
    top: '100%',
    left: '50%',
    display: 'block',
    marginLeft: -6,
    width: 12,
    height: 12,
    borderRadius: '50%',
    border: `3px solid ${tokens.color.brandPrimary}`,
    background: 'transparent',
    content: '""',
  },
  '::before': {
    position: 'absolute',
    top: 0,
    bottom: '100%',
    left: '50%',
    display: 'block',
    marginLeft: -6,
    width: 12,
    height: 12,
    borderRadius: '50%',
    border: `3px solid ${tokens.color.brandPrimary}`,
    background: 'transparent',
    content: '""',
  },
});
