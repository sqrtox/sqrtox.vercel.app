type AnyCase<T extends string> = (
  string extends T ? string :
  T extends `${infer F1}${infer F2}${infer R}` ? (
    `${Lowercase<F1> | Uppercase<F1>}${Lowercase<F2> | Uppercase<F2>}${AnyCase<R>}`
  ) :
  T extends `${infer F}${infer R}` ? `${Lowercase<F> | Uppercase<F>}${AnyCase<R>}` :
  ''
);

export { type AnyCase };
