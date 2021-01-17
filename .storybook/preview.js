import React from 'react';
import { GlobalStyle } from '../src/styles/global-styles';
import { HistoryContextProvider } from '../src/context/HistoryContext';

export const decorators = [
  (Story) => (
    <HistoryContextProvider>
      <GlobalStyle />
      <Story />
    </HistoryContextProvider>
  ),
];
