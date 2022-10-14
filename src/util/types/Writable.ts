import { type ReadonlyKeys } from '~/util/types/ReadonlyKeys';

type Writable<O extends object, K extends keyof O = keyof O, D extends boolean = false> = (
  {
    -readonly [P in K]: (
      D extends boolean
      ? O[P] extends object ? Writable<O[P]> : O[P]
      : O[P]
    )
  } & {
    [P in Exclude<keyof O, K | ReadonlyKeys<O>>]: O[P]
  } & {
    readonly [P in Exclude<ReadonlyKeys<O>, K>]: O[P]
  }
);

export { type Writable };
