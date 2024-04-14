export type PickBy<T, V> = Pick<
  T,
  { [K in keyof T]: T[K] extends V ? K : never }[keyof T]
>;

export type Modify<T, U> = Omit<T, keyof U> & U;

export type Enum<T> = T[keyof T];
