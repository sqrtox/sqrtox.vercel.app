type Equals<T, U> = (
  (<P>() => P extends U ? 1 : 0) extends (<P>() => P extends T ? 1 : 0)
  ? 1
  : 0
);

export { type Equals };
