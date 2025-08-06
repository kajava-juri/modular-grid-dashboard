<script lang="ts">
	import type { GridConfig } from '$types/dynamic-grid';
    import { cssStringify } from '$lib/utils';

	const {
		config,
		children,
	}: {
		config: GridConfig;
		children: any;
	} = $props();

	let mounted = $state(false);

	//console.log(window.innerWidth, window.innerHeight);

	let gridStyle: Record<string, string> = $state({});

	let gridElement: HTMLElement;

	$effect(() => {
		if (gridElement && window) {
			const gridRect = gridElement.getBoundingClientRect();
			const top = gridRect.top;
			console.log('Grid top position:', top);

			gridStyle = {
				'display': 'grid',
				'grid-template-columns': `repeat(${config.columns}, minmax(0, 1fr))`,
				'grid-auto-rows': `${window.innerHeight / config.rows - top}px`,
				'gap': '1rem',
			};

			mounted = true;
		}
	});
</script>

<div class="w-full p-4">
	<div bind:this={gridElement}>
		{#if mounted}
			<div
				style={cssStringify(gridStyle)}
				class="content-start items-center text-center *:flex *:size-full *:justify-center *:border"
			>
				{@render children?.()}
			</div>
		{:else}
			<p>Loading...</p>
		{/if}
		{#if !config.columns || !config.rows}
			<p>Invalid grid configuration.</p>
		{/if}
	</div>
</div>
