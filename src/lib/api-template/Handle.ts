import { toUppercase } from '~/util/toUppercase';
import { type AnyCase } from '~/util/types/AnyCase';
import { type IterableType } from '~/util/types/IterableType';
import { type ApiTemplate } from '~api-template/ApiTemplate';

const UPPERCASE_STANDARD_METHODS = [
  'GET',
  'HEAD',
  'POST',
  'PUT',
  'DELETE',
  'CONNECT',
  'OPTIONS',
  'TRACE',
  'PATCH'
] as const;
const UPPERCASE_STANDARD_METHOD_SET: UppercaseStandardMethodSet = new Set(UPPERCASE_STANDARD_METHODS);

type UppercaseStandardMethods = typeof UPPERCASE_STANDARD_METHODS;
type UppercaseStandardMethod = IterableType<UppercaseStandardMethods>;
type UppercaseStandardMethodSet = ReadonlySet<UppercaseStandardMethod>;
type CaseInsensitiveStandardMethod = AnyCase<UppercaseStandardMethod>;
type HandleConstructor = typeof Handle;
type AdvancedMethod = Extract<HandleConstructor[keyof HandleConstructor], symbol>;
type CaseInsensitiveMethod = AdvancedMethod | CaseInsensitiveStandardMethod;
type UppercaseMethod = AdvancedMethod | UppercaseStandardMethod;
type UppercaseMethodSet = ReadonlySet<UppercaseMethod>;
type CaseInsensitiveMethods = readonly CaseInsensitiveMethod[];
type Handler = (ctx: ApiTemplate) => void;
type HandleData = Readonly<{
  methods: CaseInsensitiveMethods,
  ignoreOnEnded?: boolean,
  handler: Handler
}>;
type HandleResolvable = Handle | HandleData;

class Handle {
  static readonly HANDLE_ALL_METHOD = Symbol('HANDLE_ALL_METHOD');
  static readonly HANDLE_DEFAULT_METHOD = Symbol('HANDLE_DEFAULT_METHOD');

  readonly ['constructor']: typeof Handle = Handle;
  readonly methods: UppercaseMethodSet;
  readonly ignoreOnEnded: boolean;
  readonly handler: Handler;

  static toUppercaseMethod(method: CaseInsensitiveMethod): UppercaseMethod {
    if (typeof method === 'symbol') {
      return method;
    }

    return toUppercase(method);
  }

  constructor({ methods, ignoreOnEnded = true, handler }: HandleData) {
    const uppercaseMethods = new Set<UppercaseMethod>();
    const ctor = this.constructor;

    for (const method of methods) {
      uppercaseMethods.add(ctor.toUppercaseMethod(method));
    }

    this.methods = uppercaseMethods;
    this.ignoreOnEnded = ignoreOnEnded;
    this.handler = handler;
  }

  static isCaseInsensitiveStandardMethod(method: unknown): method is CaseInsensitiveStandardMethod {
    if (typeof method !== 'string') {
      return false;
    }

    return UPPERCASE_STANDARD_METHOD_SET.has(method.toUpperCase() as UppercaseStandardMethod);
  }

  static isCaseInsensitiveMethod(method: unknown): method is CaseInsensitiveMethod {
    if (method === this.HANDLE_ALL_METHOD || method === this.HANDLE_DEFAULT_METHOD) {
      return true;
    }

    return this.isCaseInsensitiveStandardMethod(method);
  }

  static resolve(resolvable: HandleResolvable): Handle {
    if (resolvable instanceof this) {
      return resolvable;
    }

    return new this(resolvable);
  }
}

export {
  type AdvancedMethod,
  type CaseInsensitiveMethod,
  type CaseInsensitiveStandardMethod,
  Handle,
  type HandleConstructor,
  type HandleResolvable,
  UPPERCASE_STANDARD_METHODS,
  UPPERCASE_STANDARD_METHOD_SET,
  type UppercaseMethod,
  type UppercaseMethodSet,
  type UppercaseStandardMethod,
  type UppercaseStandardMethodSet,
  type UppercaseStandardMethods
};
