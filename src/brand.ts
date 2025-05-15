export type Brand<T, U extends string> = T & {
  [K in `_${U}Brand`]: T;
};
