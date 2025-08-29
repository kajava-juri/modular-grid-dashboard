import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { appRouter } from './routes/_app';
import { createWSSContext } from './context';
import { createWSClient } from 'trpc-svelte-query';
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({
  port: 3001,
});
const handler = applyWSSHandler({
  wss,
  router: appRouter,
  createContext: createWSSContext,
  // Enable heartbeat messages to keep connection open (disabled by default)
  keepAlive: {
    enabled: true,
    // server ping message interval in milliseconds
    pingMs: 30000,
    // connection is terminated if pong message is not received in this many milliseconds
    pongWaitMs: 5000,
  },
});

process.on('SIGTERM', () => {
  console.log('SIGTERM');
  handler.broadcastReconnectNotification();
  wss.close();
});