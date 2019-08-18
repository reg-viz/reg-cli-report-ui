export const Space = 8;

export enum Color {
  DEFAULT = '#40455a',
  WHITE = '#fff',
  GRAY = '#8086a1',
  GRAY_LIGHTER = '#ececec',
  GRAY_DARK = '#2e3241',
  HOVER_WHITE = 'rgba(255, 255, 255, 0.3)',
  HOVER_BLACK = 'rgba(0, 0, 0, 0.1)',
  BACKGROUND = '#edeef2',
  BORDER = '#d5d8e2',
  PRIMARY = '#7995f0',
  SIGN_PASSED = '#47d8b5',
  SIGN_NEW = '#668aff',
  SIGN_CHANGED = '#ec5f89',
  SIGN_DELETED = '#494e6a',
}

export const Focus = `0 0 0 4px rgba(121, 149, 240, 0.4)`;

export enum Shadow {
  LEVEL1 = '0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.12)',
  LEVEL2 = '0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.12)',
}

export enum FontFamily {
  SANS_SERIF = 'Avenir,"Lucida Grande","Helvetica Neue","游ゴシック","YuGothic","Hiragino Kaku Gothic ProN","メイリオ",meiryo,sans-serif',
  MONOSPACE = 'SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace',
}

// base size = 16px (browser default)
export enum FontSize {
  X_SMALL = '0.75rem', // 12px
  SMALL = '0.875rem', // 14px
  MEDIUM = '1rem', // 16px
  LARGE = '1.5rem', // 24px
  X_LARGE = '2.875rem', // 46px
}

export enum LineHeight {
  SMALL = '1.3',
  MEDIUM = '1.65',
  LARGE = '1.8',
}

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
  // <Header />
  HEADER_HEIGHT = 60,
}
