<script lang="ts">
	import NextStep from '$lib/components/NextStep.svelte';
	import { trpc } from '$lib/trpc';
	import DynamicGrid from '$lib/components/DynamicGrid.svelte';
	import DynamicGridItem from '$lib/components/DynamicGridItem.svelte';
	import type { GridConfig } from '$types/dynamic-grid';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();

	const greeting = trpc.greeting.query({ name: "server side" });
	const dashboardConfig = data.dashboardConfig;

	console.log(dashboardConfig);

	const gridConfig: GridConfig = {
		columns: 6,
		rows: 2
	}

</script>

<main class="container mx-auto p-4">
	<h4 class="absolute left-1/2 transform -translate-x-1/2">Dasboard size - {gridConfig.columns} x {gridConfig.rows}</h4>
	<DynamicGrid config={gridConfig} >
		{#each dashboardConfig.widgets as widget}
			<DynamicGridItem widget={widget} />
		{/each}
	</DynamicGrid>
</main>

<style>

</style>
