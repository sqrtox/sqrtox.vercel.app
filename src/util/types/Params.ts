import { type ParsedUrlQuery } from 'node:querystring';

type Params<T> = Readonly<ParsedUrlQuery & T>;

export { type Params };
