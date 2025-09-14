<script lang="ts">
	import * as d3 from 'd3';
	import type { LineConfig } from '$types/chart-config';
	import { untrack } from 'svelte';

	// export let data: number[] = [];
	// export let width = 640;
	// export let height = 400;
	// export let marginTop = 20;
	// export let marginRight = 20;
	// export let marginBottom = 20;
	// export let marginLeft = 20;

	const {
		data,
		width = 640,
		height = 400,
		marginTop = 20,
		marginRight = 20,
		marginBottom = 20,
		marginLeft = 20,
		lineConfig = { lineColor: 'currentColor' },
	}: {
		data: number;
		width?: number;
		height?: number;
		marginTop?: number;
		marginRight?: number;
		marginBottom?: number;
		marginLeft?: number;
		lineConfig?: LineConfig;
	} = $props();

  let dataPoints = $state([] as number[]);

	// $: x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
	// $: extent = d3.extent(data) ?? [0, 1] as [number, number];
	// $: y = d3.scaleLinear(extent !== undefined ? (extent as [number, number]) : [0, 1], [height - marginBottom, marginTop]);
	// $: line = d3.line((d, i) => x(i), y);

	let x = $state(d3.scaleLinear([0, 1], [marginLeft, width - marginRight]));
	let y = $state(d3.scaleLinear([0, 1], [height - marginBottom, marginTop]));
	let line = $state(d3.line((d, i) => x(i), y));
	let extent = $state(([0, 1] as [number, number] | [undefined, undefined]));

	$effect(() => {
    $inspect(data);
		if (data) {
      untrack(() => {
        dataPoints = [...dataPoints.slice(-199), data];
        x = d3.scaleLinear(
          [0, dataPoints.length - 1],
          [marginLeft, width - marginRight],
        );
        extent = d3.extent(dataPoints) ?? ([0, 1] as [number, number]);
        y = d3.scaleLinear(
          extent !== undefined ? (extent as [number, number]) : [0, 1],
          [height - marginBottom, marginTop],
        );
        line = d3.line((d, i) => x(i), y);
      })
		}
	});
</script>

<svg width="100%" height="100%">
	{#if dataPoints && dataPoints.length > 0}
		<path
			fill="none"
			stroke={lineConfig.lineColor}
			stroke-width="1.5"
			d={line(dataPoints)}
		/>
		<g fill="white" stroke={lineConfig.lineColor} stroke-width="1.5">
			{#each dataPoints as d, i}
				<circle cx={x(i)} cy={y(d)} r="2.5" />
			{/each}
		</g>
	{/if}
</svg>
