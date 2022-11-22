import { type ParsedUrlQuery } from 'node:querystring';

export type Params<T> = Readonly<ParsedUrlQuery & T>;
