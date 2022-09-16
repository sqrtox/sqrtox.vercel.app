import { Deta } from 'deta';

const DETA_PROJECT_KEY = process.env.DETA_PROJECT_KEY;

const deta = Deta(DETA_PROJECT_KEY);
const tokensDb = deta.Base('tokens');
const messagesDb = deta.Base('messages');

export {
  deta,
  messagesDb,
  tokensDb
};
