const toUppercase = <T extends string>(value: T): Uppercase<T> => (
  String.prototype.toUpperCase.call(value) as Uppercase<T>
);

export { toUppercase };
