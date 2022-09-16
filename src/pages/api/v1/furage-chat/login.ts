import { compare } from 'bcrypt';
import contentTypeParser from 'content-type-parser';
import { serialize as serializeCookie } from 'cookie';
import { type NextApiHandler } from 'next';
import { tokensDb } from '~/util/deta';
import { createToken, hashToken, isLoggedInToken } from '~/util/token';
import { ApiTemplate } from '~api-template/ApiTemplate';

const LOGIN_PASSWORD_HASH = process.env.LOGIN_PASSWORD_HASH;

const handler: NextApiHandler = async (...args) => new ApiTemplate(...args).handle([
  {
    methods: ['GET', 'HEAD'],
    handler: async ctx => {
      ctx.sendJson(await isLoggedInToken(ctx.req));
    }
  },
  {
    methods: ['POST'],
    handler: async ctx => {
      const { req, res } = ctx;
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

      const { password }: Record<string, string> = req.body;
      const isCorrectPassword = await compare(password, LOGIN_PASSWORD_HASH);

      if (!isCorrectPassword) {
        ctx.sendJsonByStatusCode(401);

        return;
      }

      const token = createToken();
      const hashedToken = hashToken(token);

      await tokensDb.put(hashedToken, hashedToken, {
        expireIn: 604800
      });

      res.setHeader('Set-Cookie', serializeCookie('token', token, {
        httpOnly: true,
        path: '/',
        secure: true,
        sameSite: 'strict'
      }));
      res.status(204).end();
    }
  }
]);

export default handler;
