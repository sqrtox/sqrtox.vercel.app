import { type Object } from 'ts-toolbelt';

type Writable<O extends object, K extends keyof O = keyof O, D extends boolean = false> = (
  {
    -readonly [P in K]: (
      D extends boolean
      ? O[P] extends object ? Writable<O[P]> : O[P]
      : O[P]
    )
  } & {
    [P in Exclude<keyof O, K | Object.ReadonlyKeys<O>>]: O[P]
  } & {
    readonly [P in Exclude<Object.ReadonlyKeys<O>, K>]: O[P]
  }
);

export { type Writable };
