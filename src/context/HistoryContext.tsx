import React, { createContext } from 'react';
import type { History } from 'history';
import history from 'history/browser';

export type HistoryContextValue = History;

export const HistoryContext = createContext<HistoryContextValue>(history);

export const HistoryContextProvider = ({
  children,
}: React.PropsWithChildren) => (
  <HistoryContext.Provider value={history}>{children}</HistoryContext.Provider>
);
