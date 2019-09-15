import React from 'react';

export type AnchorScrollContextValue = {
  readonly hash: string;
  readonly consumed: boolean;
  isAnchorScrolling: boolean;
  consume(): void;
};

export const AnchorScrollContext = React.createContext<AnchorScrollContextValue>({
  hash: '#',
  consumed: true,
  isAnchorScrolling: false,
  consume: () => { },
});

class HashValue implements AnchorScrollContextValue {
  private _ = false;
  hash = location.hash;
  isAnchorScrolling = false;
  consume() {
    this._ = true;
  }
  get consumed() {
    return this._;
  }
}

export const AnchorScrollProvider: React.FC<{}> = ({ children }) => {
  const value: AnchorScrollContextValue = new HashValue();
  return (
    <AnchorScrollContext.Provider value={value}>
      {children}
    </AnchorScrollContext.Provider>
  );
};
