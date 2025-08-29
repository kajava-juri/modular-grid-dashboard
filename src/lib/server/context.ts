import type { RequestEvent } from '@sveltejs/kit';
import type { CreateWSSContextFnOptions } from 'node_modules/@trpc/server/dist/adapters/ws.cjs';

export async function createContext(_event: RequestEvent) {
	return {};
}

export async function createWSSContext(opts: CreateWSSContextFnOptions) {
  return {};
};
 
export type Context = Awaited<ReturnType<typeof createContext>>;
export type WSSContext = Awaited<ReturnType<typeof createWSSContext>>;
