import { createGlobalTheme, styleVariants } from '@vanilla-extract/css';
import type { Enum } from '../utils/types';

export const Space = 8;

export const Color = {
  BLACK: '#000000',
  WHITE: '#ffffff',
  BACKGROUND: '#f7f8f8',
  BORDER: '#d4dcde',
  HOVER_WHITE: 'rgba(255, 255, 255, 0.3)',
  HOVER_BLACK: 'rgba(0, 0, 0, 0.1)',
  TEXT_BASE: '#00303c',
  TEXT_SUB: '#8da3a9',
  TEXT_LINK: '#2582c7',
  BRAND_PRIMARY: '#ff4438',
  BRAND_SECONDARY: '#00303c',
  BRAND_ACCENT: '#7d96e9',
  SIGN_PASSED: '#64ddc0',
  SIGN_NEW: '#33a6e8',
  SIGN_CHANGED: '#e5537c',
  SIGN_DELETED: '#404d77',
} as const;
export type Color = Enum<typeof Color>;

export const BreakPoint = {
  X_SMALL: 375,
  SMALL: 599,
  MEDIUM: 770,
  LARGE: 1024,
  X_LARGE: 1200,
} as const;
export type BreakPoint = Enum<typeof BreakPoint>;

export const Duration = {
  FADE_IN: 150,
  FADE_OUT: 75,
  SLIDE_IN: 180,
  SLIDE_OUT: 160,
  SMALL_IN: 90,
  SMALL_OUT: 140,
  MEDIUM_IN: 280,
  MEDIUM_OUT: 220,
  LARGE_IN: 160,
  LARGE_OUT: 140,
} as const;
export type Duration = Enum<typeof Duration>;

export const Size = {
  HEADER_HEIGHT: 60,
  CARD_OUTER_HEIGHT: 360,
} as const;
export type Size = Enum<typeof Size>;

export const tokens = createGlobalTheme(':root', {
  color: {
    black: Color.BLACK,
    white: Color.WHITE,
    background: Color.BACKGROUND,
    border: Color.BORDER,
    hoverWhite: Color.HOVER_WHITE,
    hoverBlack: Color.HOVER_BLACK,
    textBase: Color.TEXT_BASE,
    textSub: Color.TEXT_SUB,
    textLink: Color.TEXT_LINK,
    brandPrimary: Color.BRAND_PRIMARY,
    brandSecondary: Color.BRAND_SECONDARY,
    brandAccent: Color.BRAND_ACCENT,
    signPassed: Color.SIGN_PASSED,
    signNew: Color.SIGN_NEW,
    signChanged: Color.SIGN_CHANGED,
    signDeleted: Color.SIGN_DELETED,
  },
  shadow: {
    lv1: '0px 2px 4px rgba(0, 0, 0, 0.1), 0px 2px 3px rgba(0, 0, 0, 0.12)',
    lv2: '0px 4px 14px rgba(0, 0, 0, 0.1), 0px 3px 3px rgba(0, 0, 0, 0.08)',
    lv3: '0px 8px 20px rgba(0, 0, 0, 0.12), 0px 2px 6px rgba(0, 0, 0, 0.06)',
  },
  fontFamily: {
    sansSerif: '"Work Sans", sans-serif',
    monospace: '"Roboto", monospace',
  },
  // base size = 16px (browser default)
  fontSize: {
    title1: '3.5rem',
    title2: '2.25rem',
    title3: '1.5rem',
    subTitle1: '1,125rem',
    subTitle2: '1rem',
    subTitle3: '0.875rem',
    body1: '1rem',
    body2: '0.875rem',
    body3: '0.75rem',
    subHead: '0.75rem',
    button1: '0.75rem',
    button2: '0.875rem',
  },
  lineHeight: {
    xSmall: '1.1',
    small: '1.2',
    medium: '1.3',
    large: '1.5',
    xLarge: '1.75',
  },
  easing: {
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    back: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  duration: {
    fadeIn: `${Duration.FADE_IN}ms`,
    fadeOut: `${Duration.FADE_OUT}ms`,
    slideIn: `${Duration.SLIDE_IN}ms`,
    slideOut: `${Duration.SLIDE_OUT}ms`,
    smallIn: `${Duration.SMALL_IN}ms`,
    smallOut: `${Duration.SMALL_OUT}ms`,
    mediumIn: `${Duration.MEDIUM_IN}ms`,
    mediumOut: `${Duration.MEDIUM_OUT}ms`,
    largeIn: `${Duration.LARGE_IN}ms`,
    largeOut: `${Duration.LARGE_OUT}ms`,
  },
  depth: {
    sidebar: '100',
    viewer: '200',
    notification: '300',
    dialog: '400',
    menu: '500',
  },
  size: {
    headerHeight: `${Size.HEADER_HEIGHT}px`,
    cardOuterHeight: `${Size.CARD_OUTER_HEIGHT}px`,
  },
  state: {
    focus: '0 0 0 4px rgba(255, 68, 56, 0.4)',
  },
});

export const typography = styleVariants({
  title1: {
    fontSize: tokens.fontSize.title1,
    fontWeight: 'bold',
    lineHeight: tokens.lineHeight.xSmall,
    textTransform: 'uppercase',
  },
  title2: {
    fontSize: tokens.fontSize.title2,
    fontWeight: 'bold',
    lineHeight: tokens.lineHeight.xSmall,
    textTransform: 'uppercase',
  },
  title3: {
    fontSize: tokens.fontSize.title3,
    fontWeight: 'bold',
    lineHeight: tokens.lineHeight.xSmall,
    textTransform: 'uppercase',
  },
  subTitle1: {
    fontSize: tokens.fontSize.subTitle1,
    fontWeight: 'bold',
    lineHeight: tokens.lineHeight.medium,
    textTransform: 'none',
  },
  subTitle2: {
    fontSize: tokens.fontSize.subTitle2,
    fontWeight: 'bold',
    lineHeight: tokens.lineHeight.medium,
    textTransform: 'none',
  },
  subTitle3: {
    fontSize: tokens.fontSize.subTitle3,
    fontWeight: 'bold',
    lineHeight: tokens.lineHeight.medium,
    textTransform: 'none',
  },
  body1: {
    fontSize: tokens.fontSize.body1,
    fontWeight: 'normal',
    lineHeight: tokens.lineHeight.xLarge,
    textTransform: 'none',
  },
  body2: {
    fontSize: tokens.fontSize.body2,
    fontWeight: 'normal',
    lineHeight: tokens.lineHeight.xLarge,
    textTransform: 'none',
  },
  body3: {
    fontSize: tokens.fontSize.body3,
    fontWeight: 'normal',
    lineHeight: tokens.lineHeight.xLarge,
    textTransform: 'none',
  },
  subHead: {
    fontSize: tokens.fontSize.subHead,
    fontWeight: 'normal',
    lineHeight: tokens.lineHeight.large,
    textTransform: 'uppercase',
  },
  button: {
    fontSize: tokens.fontSize.button1,
    fontWeight: 'bold',
    lineHeight: tokens.lineHeight.large,
    textTransform: 'none',
    '@media': {
      [`(min-width: ${BreakPoint.X_SMALL}px)`]: {
        fontSize: tokens.fontSize.button2,
      },
    },
  },
});
