import { style } from '@vanilla-extract/css';

/**
 * @see https://github.com/cvializ/amphtml/blob/70d2c6a4d8b3e51bea21918e907ef2a5e9e33e50/css/amp.css#L244-L274
 */
export const wrapper = style({
  position: 'fixed !important' as any,
  top: '0 !important',
  left: '0 !important',
  display: 'block !important',
  visibility: 'visible !important' as any,
  overflow: 'hidden !important',
  margin: '0 !important',
  padding: '0 !important',
  width: '4px !important',
  height: '4px !important',
  border: 'none !important',
  opacity: '0 !important',
});
