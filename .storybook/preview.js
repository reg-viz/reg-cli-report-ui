import React from 'react';
import { GlobalStyle } from '../src/styles/global-styles';

export const decorators = [
  (Story) => (
    <React.Fragment>
      <GlobalStyle />
      <Story />
    </React.Fragment>
  ),
];
