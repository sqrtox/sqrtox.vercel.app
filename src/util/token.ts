import { createHash, randomBytes } from 'node:crypto';
import { type IncomingMessage } from 'node:http';
import { tokensDb } from '~/util/deta';
import { type Brand } from '~/util/types/Brand';
import { Handle } from '~api-template';

type Token = Brand<string, 'token'>;

const isToken = (value: unknown): value is Token => (
  typeof value === 'string' &&
  /^[\w-]{43}$/.test(value)
);

type HashedToken = Brand<string, 'hashedToken'>;

const isHashedToken = (value: unknown): value is HashedToken => (
  typeof value === 'string' &&
  /^hashed-[\w-]{43}$/.test(value)
);

const hashToken = (token: Token): HashedToken => {
  const hashedToken = `hashed-${createHash('sha256').update(token).digest('base64url')}`;

  if (!isHashedToken(hashedToken)) {
    throw new TypeError('Could not hash the token');
  }

  return hashedToken;
};

type IncomingMessageWithCookies = IncomingMessage & {
  cookies: Partial<{
    [key: string]: string
  }>
};

interface CreateToken {
  (): Token;
  (req: IncomingMessageWithCookies): Token | undefined;
}

const createToken = ((req?: IncomingMessageWithCookies): Token | undefined => {
  if (req) {
    const { token } = req.cookies;

    if (token) {
      if (!isToken(token)) {
        throw new TypeError('The token was included in the request, but could not be retrieved');
      }

      return token;
    }
  }

  const token = randomBytes(32).toString('base64url');

  if (!isToken(token)) {
    throw new TypeError('Could not create token');
  }

  return token;
}) as CreateToken;

const isLoggedInToken = async (tokenResolvable: IncomingMessageWithCookies | Token): Promise<boolean> => {
  const token = (
    typeof tokenResolvable === 'string'
      ? tokenResolvable
      : tokenResolvable.cookies.token
  );

  if (!isToken(token)) {
    return false;
  }

  const hashed = hashToken(token);
  const res = await tokensDb.get(hashed);

  return !!res;
};

const loginHandle = new Handle({
  methods: [Handle.HANDLE_ALL_METHOD],
  handler: async ctx => {
    if (!await isLoggedInToken(ctx.req)) {
      ctx.sendJsonByStatusCode(401);
    }
  }
});

export {
  type CreateToken,
  type HashedToken,
  type IncomingMessageWithCookies,
  type Token,
  createToken,
  hashToken,
  isHashedToken,
  isLoggedInToken,
  isToken,
  loginHandle
};
