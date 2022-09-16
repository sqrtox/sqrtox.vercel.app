import { type ApiTemplate } from '~api-template/ApiTemplate';
import { type CaseInsensitiveMethod, type CaseInsensitiveStandardMethod, Handle, type HandleResolvable, type UppercaseMethod, type UppercaseMethodSet } from '~api-template/Handle';

class HandleManager {
  readonly #apiTemplate: ApiTemplate;
  readonly #handledMethods: UppercaseMethodSet;
  readonly #handles: readonly Handle[];

  constructor(apiTemplate: ApiTemplate, handleResolvables: readonly HandleResolvable[]) {
    this.#apiTemplate = apiTemplate;

    const handledMethods = new Set<UppercaseMethod>();
    const handles: Handle[] = [];

    for (const handleResolvable of handleResolvables) {
      const handle = Handle.resolve(handleResolvable);

      for (const method of handle.methods) {
        handledMethods.add(method);
      }

      handles.push(handle);
    }

    this.#handledMethods = handledMethods;
    this.#handles = handles;

    if (
      !handledMethods.has(Handle.HANDLE_ALL_METHOD) &&
      (!handledMethods.has('GET') || !handledMethods.has('HEAD'))
    ) {
      throw new TypeError('GET and HEAD method requests must handle');
    }

    if (!handledMethods.has(Handle.HANDLE_DEFAULT_METHOD)) {
      handledMethods.add(Handle.HANDLE_DEFAULT_METHOD);
      handles.push(this.#buildUnsupportedMethodHandle());
    }
  }

  isHandled(method: CaseInsensitiveMethod): boolean {
    return this.#handledMethods.has(Handle.toUppercaseMethod(method));
  }

  #isInvoke(method: CaseInsensitiveStandardMethod, { methods, ignoreOnEnded }: Handle): boolean {
    if (this.#apiTemplate.res.writableEnded && ignoreOnEnded) {
      return false;
    }

    if (methods.has(Handle.HANDLE_ALL_METHOD)) {
      return true;
    }

    const notHandled = !this.isHandled(method);

    if (notHandled && methods.has(Handle.HANDLE_DEFAULT_METHOD)) {
      return true;
    }

    if (methods.has(Handle.toUppercaseMethod(method))) {
      return true;
    }

    return false;
  }

  async invoke(method: CaseInsensitiveStandardMethod): Promise<void> {
    for (const handle of this.#handles) {
      if (this.#isInvoke(method, handle)) {
        await handle.handler(this.#apiTemplate);
      }
    }
  }

  #createAllowHeader(): string {
    let allowHeader = '';

    for (const method of this.#handledMethods) {
      if (typeof method !== 'string') {
        continue;
      }

      if (allowHeader) {
        allowHeader += ', ';
      }

      allowHeader += method;
    }

    return allowHeader;
  }

  #buildUnsupportedMethodHandle(): Handle {
    const allowHeader = this.#createAllowHeader();

    return new Handle({
      methods: [Handle.HANDLE_DEFAULT_METHOD],
      handler: ctx => {
        ctx.setHeader('Allow', allowHeader);
        ctx.sendJsonByStatusCode(405);
      }
    });
  }
}

export { HandleManager };
