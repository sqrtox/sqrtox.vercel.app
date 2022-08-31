import { type ParsedUrlQuery } from 'node:querystring';
import { type Object } from 'ts-toolbelt';

type Params<T> = Readonly<ParsedUrlQuery & T>;

type Writable<O extends object, K extends keyof O = keyof O, D extends boolean = false> = (
  {
    -readonly [P in K]: (
      D extends boolean
      ? O[P] extends object ? Writable<O[P]> : O[P]
      : O[P]
    )
  } & {
    [P in Exclude<keyof O, Object.ReadonlyKeys<O> | K>]: O[P]
  } & {
    readonly [P in Exclude<Object.ReadonlyKeys<O>, K>]: O[P]
  }
);

type Brand<T, U extends string> = T & Readonly<{
  [x in `_${U}Brand`]: T
}>;

type KebabCase<T extends string = 'kebabCase'> = Brand<string, T>;

const isKebabCase = (value: unknown): value is KebabCase => {
  if (typeof value !== 'string') {
    return false;
  }

  if (/^[^a-z]$/.test(value[0])) {
    return false;
  }

  for (const token of value.split('-')) {
    if (!token.length) {
      return false;
    }

    if (/[^a-z\d]/.test(token)) {
      return false;
    }
  }

  return true;
};

export {
  type Brand,
  type KebabCase,
  type Params,
  type Writable,
  isKebabCase
};
