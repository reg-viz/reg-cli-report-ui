import { css } from 'styled-components';

export const Space = 8;

export enum Color {
  DEFAULT = '#2C3552',
  BLACK = '#000000',
  WHITE = '#FFFFFF',
  GRAY = '#A5A6AA',
  GRAY_LIGHTER = '#D5D6DA',
  GRAY_DARK = '#2C3552',
  BACKGROUND = '#EDEEF2',
  BORDER = '#D5D6DA',
  PRIMARY = '#7995F0',
  HOVER_WHITE = 'rgba(255, 255, 255, 0.3)',
  HOVER_BLACK = 'rgba(0, 0, 0, 0.1)',
  SIGN_PASSED = '#47D8B5',
  SIGN_NEW = '#668AFF',
  SIGN_CHANGED = '#EC5F89',
  SIGN_DELETED = '#494E6A',
}

export const Focus = `0 0 0 4px rgba(121, 149, 240, 0.4)`;

export enum Shadow {
  LEVEL1 = '0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.12)',
  LEVEL2 = '0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.12)',
}

export enum FontFamily {
  SANS_SERIF = '"Work Sans", sans-serif',
  MONOSPACE = '"Roboto", monospace',
}

// base size = 16px (browser default)
export enum FontSize {
  TITLE1 = '3rem',
  TITLE2 = '2.25rem',
  TITLE3 = '1.5rem',
  SUBTITLE1 = '1,125rem',
  SUBTITLE2 = '1rem',
  SUBTITLE3 = '0.875rem',
  BODY1 = '1rem',
  BODY2 = '0.875rem',
  BODY3 = '0.75rem',
  SUBHEAD = '0.75rem',
  BUTTON = '0.875rem',
}

export enum LineHeight {
  X_SMALL = 1.1,
  SMALL = 1.2,
  MEDIUM = 1.3,
  LARGE = 1.5,
  X_LARGE = 1.75,
}

export const Typography = {
  TITLE1: css`
    font-size: ${FontSize.TITLE1};
    font-weight: bold;
    line-height: ${LineHeight.X_SMALL};
    text-transform: uppercase;
  `,
  TITLE2: css`
    font-size: ${FontSize.TITLE2};
    font-weight: bold;
    line-height: ${LineHeight.SMALL};
    text-transform: uppercase;
  `,
  TITLE3: css`
    font-size: ${FontSize.TITLE3};
    font-weight: bold;
    line-height: ${LineHeight.SMALL};
    text-transform: uppercase;
  `,
  SUBTITLE1: css`
    font-size: ${FontSize.SUBTITLE1};
    font-weight: bold;
    line-height: ${LineHeight.MEDIUM};
  `,
  SUBTITLE2: css`
    font-size: ${FontSize.SUBTITLE2};
    font-weight: bold;
    line-height: ${LineHeight.MEDIUM};
  `,
  SUBTITLE3: css`
    font-size: ${FontSize.SUBTITLE3};
    font-weight: bold;
    line-height: ${LineHeight.MEDIUM};
  `,
  BODY1: css`
    font-size: ${FontSize.BODY1};
    font-weight: normal;
    line-height: ${LineHeight.X_LARGE};
  `,
  BODY2: css`
    font-size: ${FontSize.BODY2};
    font-weight: normal;
    line-height: ${LineHeight.X_LARGE};
  `,
  BODY3: css`
    font-size: ${FontSize.BODY3};
    font-weight: normal;
    line-height: ${LineHeight.X_LARGE};
  `,
  SUBHEAD: css`
    font-size: ${FontSize.SUBHEAD};
    font-weight: bold;
    line-height: ${LineHeight.LARGE};
    text-transform: uppercase;
  `,
  BUTTON: css`
    font-size: ${FontSize.BUTTON};
    font-weight: bold;
    line-height: ${LineHeight.LARGE};
    letter-spacing: 0.01;
  `,
};

export enum BreakPoint {
  X_SMALL = 375,
  SMALL = 599,
  MEDIUM = 770,
  LARGE = 1024,
  X_LARGE = 1200,
}

export enum Easing {
  STANDARD = 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  BACK = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
}

export enum Duration {
  FADE_IN = 150,
  FADE_OUT = 75,
  SLIDE_IN = 180,
  SLIDE_OUT = 160,
  SMALL_IN = 90,
  SMALL_OUT = 140,
  MEDIUM_IN = 280,
  MEDIUM_OUT = 220,
  LARGE_IN = 160,
  LARGE_OUT = 140,
}

export enum Depth {
  SIDEBAR = 100,
  VIEWER = 200,
  NOTIFICATION = 300,
  DIALOG = 400,
  MENU = 500,
}

export enum Size {
  HEADER_HEIGHT = 60,
  CARD_OUTER_HEIGHT = 326,
}
