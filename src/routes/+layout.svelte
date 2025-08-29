<script lang="ts">
	import '../app.css';
	import { trpc } from '$lib/trpc';
	import { getContext } from 'svelte';
	import { showOverlay } from '$lib/stores/overlay';

	const { data, children } = $props();

	//trpc.hydrateFromServer(() => data.trpc);


</script>

<header class="flex items-start px-6 py-3 bg-stone-500 place-content-between">
	<h1 class="text-xl font-bold">Dynamic Dashboard</h1>
	<div class="self-end">
		<button class="bg-blue-500 text-white px-4 py-2 rounded"
		onclick={() => {showOverlay.update(v => !v)}}>Toggle grid cell overlay</button>
	</div>
</header>
{@render children()}
