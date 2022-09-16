// eslint-disable-next-line import/order
import { loadEnvConfig } from '@next/env';

const isDev = process.env.NODE_ENV === 'development';

loadEnvConfig(process.cwd(), isDev);

import { parse as parseCookie } from 'cookie';
import { Server } from 'socket.io';
// eslint-disable-next-line import/order
import { randomUUID } from 'node:crypto';
import { messagesDb } from '~/util/deta';
import { isLoggedInToken, isToken } from '~/util/token';

const setupSocketIo = (...args: ConstructorParameters<typeof Server>): void => {
  const io = new Server(...args);

  io.on('connection', async socket => {
    const { cookie } = socket.request.headers;

    if (!cookie) {
      socket.disconnect();

      return;
    }

    const { token } = parseCookie(cookie);

    if (!isToken(token)) {
      socket.disconnect();

      return;
    }

    if (!await isLoggedInToken(token)) {
      socket.disconnect();

      return;
    }

    socket.emit('ready');

    console.log(socket.id, 'is connected');

    socket.on('join', async ({ name, hideActivity }) => {
      socket.join('furage-chat');

      if (!hideActivity) {
        io.to('furage-chat').emit('join', { name });

        const uuid = randomUUID({ disableEntropyCache: false });
        const key = Buffer.from(uuid.split('-').join(''), 'hex').toString('base64url');

        messagesDb.put({
          id: 0,
          system: true,
          sent_timestamp: Date.now(),
          content: `${name}さんが入室しました`
        }, key);
      }
    });
  });
};

export { setupSocketIo };
