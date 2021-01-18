import { css } from 'styled-components';

export const Space = 8;

export enum Color {
  BLACK = '#000000',
  WHITE = '#FFFFFF',
  BACKGROUND = '#F7F8F8',
  BORDER = '#D4DCDE',
  HOVER_WHITE = 'rgba(255, 255, 255, 0.3)',
  HOVER_BLACK = 'rgba(0, 0, 0, 0.1)',
  TEXT_BASE = '#00303C',
  TEXT_SUB = '#8DA3A9',
  TEXT_LINK = '#2582C7',
  BRAND_PRIMARY = '#FF4438',
  BRAND_SECONDARY = '#00303C',
  BRAND_ACCENT = '#7D96E9',
  SIGN_PASSED = '#64DDC0',
  SIGN_NEW = '#33A6E8',
  SIGN_CHANGED = '#E5537C',
  SIGN_DELETED = '#404D77',
}

export const Focus = `0 0 0 4px rgba(255, 68, 56, 0.4)`;

export enum Shadow {
  LEVEL1 = '0px 2px 4px rgba(0, 0, 0, 0.1), 0px 2px 3px rgba(0, 0, 0, 0.12)',
  LEVEL2 = '0px 4px 14px rgba(0, 0, 0, 0.1), 0px 3px 3px rgba(0, 0, 0, 0.08)',
  LEVEL3 = '0px 8px 20px rgba(0, 0, 0, 0.12), 0px 2px 6px rgba(0, 0, 0, 0.06)',
}

export enum FontFamily {
  SANS_SERIF = '"Work Sans", sans-serif',
  MONOSPACE = '"Roboto", monospace',
}

// base size = 16px (browser default)
export enum FontSize {
  TITLE1 = '3.5rem',
  TITLE2 = '2.25rem',
  TITLE3 = '1.5rem',
  SUBTITLE1 = '1,125rem',
  SUBTITLE2 = '1rem',
  SUBTITLE3 = '0.875rem',
  BODY1 = '1rem',
  BODY2 = '0.875rem',
  BODY3 = '0.75rem',
  SUBHEAD = '0.75rem',
  BUTTON1 = '0.75rem',
  BUTTON2 = '0.875rem',
}

export enum LineHeight {
  X_SMALL = 1.1,
  SMALL = 1.2,
  MEDIUM = 1.3,
  LARGE = 1.5,
  X_LARGE = 1.75,
}

export enum BreakPoint {
  X_SMALL = 375,
  SMALL = 599,
  MEDIUM = 770,
  LARGE = 1024,
  X_LARGE = 1200,
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
    text-transform: none;
  `,
  SUBTITLE2: css`
    font-size: ${FontSize.SUBTITLE2};
    font-weight: bold;
    line-height: ${LineHeight.MEDIUM};
    text-transform: none;
  `,
  SUBTITLE3: css`
    font-size: ${FontSize.SUBTITLE3};
    font-weight: bold;
    line-height: ${LineHeight.MEDIUM};
    text-transform: none;
  `,
  BODY1: css`
    font-size: ${FontSize.BODY1};
    font-weight: normal;
    line-height: ${LineHeight.X_LARGE};
    text-transform: none;
  `,
  BODY2: css`
    font-size: ${FontSize.BODY2};
    font-weight: normal;
    line-height: ${LineHeight.X_LARGE};
    text-transform: none;
  `,
  BODY3: css`
    font-size: ${FontSize.BODY3};
    font-weight: normal;
    line-height: ${LineHeight.X_LARGE};
    text-transform: none;
  `,
  SUBHEAD: css`
    font-size: ${FontSize.SUBHEAD};
    font-weight: bold;
    line-height: ${LineHeight.LARGE};
    text-transform: uppercase;
  `,
  BUTTON: css`
    font-size: ${FontSize.BUTTON1};
    font-weight: bold;
    line-height: ${LineHeight.LARGE};
    text-transform: none;

    @media (min-width: ${BreakPoint.X_SMALL}px) {
      font-size: ${FontSize.BUTTON2};
    }
  `,
};

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
  CARD_OUTER_HEIGHT = 360,
}
