import { trpcServer } from '$lib/server/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({fetch}) => {
	// You don't need to return the result of this function,
	// just call it and your data will be hydrated!
	await trpcServer.greeting.ssr({ name: 'server side' });

	const dashboardConfig = await fetch('/static/dashboard.json').then(res => res.json());

	return {
		dashboardConfig
	}
};
