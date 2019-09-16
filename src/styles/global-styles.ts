import { createGlobalStyle } from 'styled-components';
import { LineHeight, FontFamily, Color, Space, Typography } from './variables';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  :root {
    box-sizing: border-box;
    background: ${Color.BACKGROUND};
    color: ${Color.DEFAULT};
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    font-family: ${FontFamily.SANS_SERIF};
    line-height: ${LineHeight.LARGE};
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :focus {
    outline: 3px solid rgba(51, 166, 232, 0.4);
    outline-offset: 1px;
  }

  body {
    min-width: 320px;
    margin: 0;
    padding: 0;
  }

  body,
  #app {
    min-height: 100vh;
  }

  h1 {
    ${Typography.TITLE1};
    margin: 124px 0 ${Space * 3}px;
  }

  h2 {
    ${Typography.TITLE3};
    margin: ${Space * 7}px 0 ${Space * 3}px;
  }
`;
