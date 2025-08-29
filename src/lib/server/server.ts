import { createTRPCSvelteServer } from 'trpc-svelte-query/server';
import { appRouter } from './routes/_app';
import { createContext } from './context';
import "./wsServer"

export const trpcServer = createTRPCSvelteServer({
	endpoint: '/api/trpc',
	router: appRouter,
	createContext,
});


