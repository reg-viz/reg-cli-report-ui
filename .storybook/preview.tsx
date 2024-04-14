import '../src/global.css';
import React from 'react';
import type { Preview } from '@storybook/react';
import { HistoryContextProvider } from '../src/context/HistoryContext';

const preview: Preview = {
  decorators: [
    (Story) => (
      <HistoryContextProvider>
        <Story />
      </HistoryContextProvider>
    ),
  ],
};

export default preview;
