<script lang="ts">
    import type { GridItem } from "$types/dynamic-grid";
    import { cssStringify } from '$lib/utils';
    import { size } from "zod";
    import LinePlot from './LinePlot.svelte';
    import * as d3 from 'd3';
    import { onMount } from 'svelte';

    let data = $state(d3.ticks(-2, 2, 200).map(Math.sin));
    let interval: any;
    onMount(() => {
        interval = setInterval(() => {
            data = [...data.slice(-199), Math.random() * 4 - 2];
        }, 50);
        return () => clearInterval(interval);
    });

    const { widget }: { widget: GridItem} = $props();

    const style: Record<string, string> = {
        'grid-column': `span ${widget.size.width}`,
        'grid-row': `span ${widget.size.height}`
    };
</script>

<div class="flex flex-col" style={cssStringify(style)}>
    {#if widget.type === 'line'}
        <LinePlot {data} />
    {:else}
        <p>{widget.data}</p>
    {/if}
    <br/>
    <!-- <p>{widget.size.width} x {widget.size.height}</p> -->
</div>