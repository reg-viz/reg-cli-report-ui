import { style } from '@vanilla-extract/css';
import { Space, tokens, typography } from '../../styles/variables.css';

export const wrapper = style({
  paddingBottom: Space * 1,
});

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
});

export const headerCell = style([
  typography.subTitle2,
  {
    padding: `${Space * 4}px 0 ${Space * 1}px`,
    textAlign: 'left',
    selectors: {
      'tr:first-child &': {
        paddingTop: 0,
      },
    },
  },
]);

export const dataCell = style([
  typography.body2,
  {
    padding: `${Space * 1}px 0`,
    borderBottom: `1px solid ${tokens.color.border}`,
    textAlign: 'left',
  },
]);

export const key = style({
  display: 'inline-block',
  padding: '8px 14px',
  borderRadius: '3px',
  border: '1px solid #f4f4f4',
  background: 'linear-gradient(180deg, #f3f3f3 0%, #ececec 100%)',
  boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.25)',
  fontWeight: 'bold',
  fontFamily: tokens.fontFamily.monospace,
  lineHeight: 1,
  selectors: {
    '& + &': {
      marginLeft: '0.5em',
    },
  },
});
