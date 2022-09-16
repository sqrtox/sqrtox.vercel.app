import { type NextApiRequest, type NextApiResponse } from 'next';
import statuses from 'statuses';
import { getByteLength } from '~/util/getByteLength';
import { Handle, type HandleResolvable } from '~api-template/Handle';
import { HandleManager } from '~api-template/HandleManager';
import { ErrorJsonResponse } from '~api-template/error-json-response';

type SetHeaderArgs = Parameters<NextApiResponse['setHeader']>;
type Headers = Readonly<Record<SetHeaderArgs[0], SetHeaderArgs[1]>>;

class ApiTemplate {
  constructor(
    readonly req: NextApiRequest,
    readonly res: NextApiResponse
  ) { }

  readonly ['constructor']: typeof ApiTemplate = ApiTemplate;

  #isHead(): boolean {
    return this.req.method === 'HEAD';
  }

  setHeader(...args: Parameters<NextApiResponse['setHeader']>): this {
    this.res.setHeader(...args);

    return this;
  }

  setHeaders(headers: Headers): this {
    const { res } = this;

    for (const key in headers) {
      const value = headers[key];

      res.setHeader(key, value);
    }

    return this;
  }

  send(body: Buffer | string): this {
    const { res } = this;

    this.#setContentLength(body);

    if (this.#isHead()) {
      res.end();
    } else {
      res.send(body);
    }

    return this;
  }

  #setContentLength(body: Buffer | string): void {
    this.res.setHeader('Content-Length', getByteLength(body));
  }

  sendJson(body: unknown): this {
    const { res } = this;
    const json = JSON.stringify(body);

    if (this.#isHead()) {
      this.#setContentLength(json);
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end();
    } else {
      res.json(body);
    }

    return this;
  }

  sendJsonByStatusCode(statusCode: number): this {
    const { res } = this;

    res.status(statusCode);

    const statusMessage = statuses(statusCode);

    if (typeof statusMessage !== 'string') {
      throw new TypeError('Could not retrieve message from status code');
    }

    this.sendJson(new ErrorJsonResponse(statusCode, statusMessage));

    return this;
  }

  async handle(handles: readonly HandleResolvable[]): Promise<void> {
    const { method } = this.req;

    if (!Handle.isCaseInsensitiveStandardMethod(method)) {
      return;
    }

    const handleManager = new HandleManager(this, handles);

    await handleManager.invoke(method);
  }
}

export {
  ApiTemplate,
  type Headers,
  type SetHeaderArgs
};
