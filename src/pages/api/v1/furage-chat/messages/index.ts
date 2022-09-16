import { randomUUID } from 'node:crypto';
import contentTypeParser from 'content-type-parser';
import { type NextApiHandler } from 'next';
import { messagesDb } from '~/util/deta';
import { hashToken, isToken, loginHandle } from '~/util/token';
import { ApiTemplate } from '~api-template/ApiTemplate';

const handler: NextApiHandler = async (...args) => new ApiTemplate(...args).handle([
  loginHandle,
  {
    methods: ['POST'],
    handler: async ctx => {
      const { req } = ctx;
      const { token } = req.cookies;

      if (!isToken(token)) {
        ctx.sendJsonByStatusCode(401);

        return;
      }

      const contentTypeHeader = req.headers['content-type'];

      if (!contentTypeHeader) {
        ctx.sendJsonByStatusCode(400);

        return;
      }

      const contentType = contentTypeParser(contentTypeHeader);

      if (
        !contentType ||
        contentType.type !== 'application' ||
        contentType.subtype !== 'json'
      ) {
        ctx.sendJsonByStatusCode(415);

        return;
      }

      const { content }: Record<string, string> = req.body;

      const uuid = randomUUID({ disableEntropyCache: false });
      const key = Buffer.from(uuid.split('-').join(''), 'hex').toString('base64url');

      await messagesDb.put({
        sent_timestamp: Date.now(),
        system: false,
        id: 0,
        content,
        author: {
          hashed_token: hashToken(token),
          name: 'kyota'
        }
      }, key);
      ctx.sendJsonByStatusCode(204);
    }
  }
]);

export default handler;
