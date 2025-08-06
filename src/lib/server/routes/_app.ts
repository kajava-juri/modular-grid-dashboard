import { router, publicProcedure } from '../trpc';
import { url, z } from 'zod';

const fetcher = async (url: string) => {
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`Failed to fetch from ${url}`);
	}

	return res.json();
}

export const appRouter = router({
	greeting: publicProcedure
		.input(
			z.object({
				name: z.string().optional(),
			}),
		)
		.query(({ input }) => {
			return `Welcome to ${input.name ?? 'the world'}!`;
		})
});

export type AppRouter = typeof appRouter;
