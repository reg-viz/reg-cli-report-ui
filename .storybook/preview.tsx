import React from 'react';
import type { Preview } from '@storybook/react';
import { GlobalStyle } from '../src/styles/global-styles';
import { HistoryContextProvider } from '../src/context/HistoryContext';

const preview: Preview = {
  decorators: [
    (Story) => (
      <HistoryContextProvider>
        <GlobalStyle />
        <Story />
      </HistoryContextProvider>
    ),
  ],
};

export default preview;
