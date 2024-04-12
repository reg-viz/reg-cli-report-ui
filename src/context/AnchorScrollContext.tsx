import React from 'react';

export type AnchorScrollContextValue = {
  readonly hash: string;
  readonly consumed: boolean;
  consume(): void;
};

export const AnchorScrollContext =
  React.createContext<AnchorScrollContextValue>({
    hash: '#',
    consumed: true,
    consume: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  });

class HashValue implements AnchorScrollContextValue {
  private _ = false;
  hash = location.hash;
  consume() {
    this._ = true;
  }
  get consumed() {
    return this._;
  }
}

export const AnchorScrollProvider = ({ children }: React.PropsWithChildren) => {
  const value: AnchorScrollContextValue = new HashValue();

  return (
    <AnchorScrollContext.Provider value={value}>
      {children}
    </AnchorScrollContext.Provider>
  );
};
