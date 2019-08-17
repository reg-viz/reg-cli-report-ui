export type KeyHandlers<T> = {
  [P in keyof T]: (e?: KeyboardEvent) => void;
};
