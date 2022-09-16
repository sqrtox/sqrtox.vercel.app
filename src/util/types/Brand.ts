type Brand<T, U extends string> = Readonly<{
  [x in `_${U}Brand`]: never
}> & T;

export { type Brand };
