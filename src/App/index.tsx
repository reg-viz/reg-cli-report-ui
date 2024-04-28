import { Provider } from 'jotai';
import React from 'react';
import { AnchorScrollProvider } from '../context/AnchorScrollContext';
import { HistoryContextProvider } from '../context/HistoryContext';
import type { Store } from '../types/store';
import { App as Component } from './App';

export type Props = {
  store: Store;
};

export const App = ({ store }: Props) => (
  <Provider store={store}>
    <HistoryContextProvider>
      <AnchorScrollProvider>
        <Component />
      </AnchorScrollProvider>
    </HistoryContextProvider>
  </Provider>
);
