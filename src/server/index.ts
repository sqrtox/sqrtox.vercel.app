import { createServer } from 'node:http';
import { loadEnvConfig } from '@next/env';
import express from 'express';
import next from 'next';
import { setupSocketIo } from '~/server/socket-io';

const isDev = process.env.NODE_ENV === 'development';

loadEnvConfig(process.cwd(), isDev);

const { hostname } = new URL(process.env.NEXT_PUBLIC_BASE_URL);
const port = Number(process.env.PORT ?? 3000);
const app = next({
  dev: isDev,
  hostname,
  port
});
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const expressApp = express();

  expressApp.disable('x-powered-by');

  const server = createServer(expressApp);

  setupSocketIo(server, { path: '/ws/furage-chat/' });
  expressApp.all('*', (req, res) => handle(req, res));
  server.listen(port);
});
