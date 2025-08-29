import { createTRPCSvelte } from 'trpc-svelte-query';
import { httpBatchLink, createTRPCClient, createWSClient, wsLink, splitLink } from '@trpc/client';
import type { AppRouter } from '$lib/server/routes/_app';
import { parse, stringify, uneval } from 'devalue';
import type { inferRouterOutputs, inferRouterInputs } from '@trpc/server';
import { browser } from '$app/environment';

const getBaseUrl = () => {
  if (browser) return '';
  return 'http://localhost:5173'; // or your server URL
};

export const transformer = {
	input: {
		serialize: (object: unknown) => stringify(object),
		deserialize: (object: string) => parse(object),
	},
	output: {
		serialize: (object: unknown) => uneval(object),
		deserialize: (object: string) => (0, eval)(`(${object})`),
	},
};


// create persistent WebSocket connection
const wsClient = createWSClient({
  url: `ws://localhost:3001`
});

export const trpc = createTRPCClient<AppRouter>({
	links: [
		splitLink({
			condition(op) {
				return op.type === 'subscription';
			},
			true: wsLink({
				client: wsClient,
				transformer,
			}),
			false: httpBatchLink({
				url: `${getBaseUrl()}/api/trpc`,
				transformer,
			}),
		}),
	],
});

export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouterInput = inferRouterInputs<AppRouter>;
