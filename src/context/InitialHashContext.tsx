import React from 'react';

export type InitialHashContextValue = {
  readonly hash: string;
  readonly consumed: boolean;
  consume(): void;
};

export const InitialHashContext = React.createContext<InitialHashContextValue>({
  hash: '#',
  consumed: true,
  consume: () => {},
});

class HashValue implements InitialHashContextValue {
  private _ = false;
  hash = location.hash;
  consume() {
    this._ = true;
  }
  get consumed() {
    return this._;
  }
}

export const InitialHashProvider: React.FC<{}> = ({ children }) => {
  const value: InitialHashContextValue = new HashValue();
  return <InitialHashContext.Provider value={value}>{children}</InitialHashContext.Provider>;
};
