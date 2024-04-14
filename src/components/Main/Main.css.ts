import { style } from '@vanilla-extract/css';
import { Space, typography } from '../../styles/variables.css';

export const title = style([
  typography.title1,
  {
    margin: `124px 0 ${Space * 3}px`,
  },
]);

export const sectionTitle = style([
  typography.title2,
  {
    margin: `${Space * 12}px 0 ${Space * 3}px`,
    ':first-of-type': {
      marginTop: Space * 8,
    },
  },
]);
