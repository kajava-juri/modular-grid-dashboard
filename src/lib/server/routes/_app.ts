import EventEmitter, { on } from 'events';
import { router, publicProcedure } from '../trpc';
import { url, z } from 'zod';

const fetcher = async (url: string) => {
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`Failed to fetch from ${url}`);
	}

	return res.json();
}

const ee = new EventEmitter();

export const appRouter = router({
	greeting: publicProcedure
		.input(
			z.object({
				name: z.string().optional(),
			}),
		)
		.query(({ input }) => {
			return `Welcome to ${input.name ?? 'the world'}!`;
		}),
	randomNumber: publicProcedure
	.input(z.string())
	.subscription(async function* (opts) {
		while(!opts.signal?.aborted) {
			let data;
			if(opts.input == "test") {
				data = Math.random() * 4 - 2;
			}
			else if(opts.input == "data") {
				data = "some data";
			}
			yield {
				value: data,
				timestamp: Date.now(),
			};
			await new Promise((resolve) => setTimeout(resolve, 50));
		}
	})
});

export type AppRouter = typeof appRouter;
