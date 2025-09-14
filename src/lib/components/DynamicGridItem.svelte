<script lang="ts">
    import type { GridItem } from "$types/dynamic-grid";
    import { cssStringify } from '$lib/utils';
    import { size } from "zod";
    import LinePlot from './LinePlot.svelte';
    import * as d3 from 'd3';
    import { onDestroy, onMount } from 'svelte';
	import { dataService } from "../dataService";

    //let data = $state(d3.ticks(-2, 2, 200).map(Math.sin));
    let data = $state([] as number[]);
    let interval: any;
    
    const { widget }: { widget: GridItem} = $props();
    
    const style: Record<string, string> = {
        'grid-column': `span ${widget.size.width}`,
        'grid-row': `span ${widget.size.height}`
    };

    onMount(() => {
        if(widget.dataSource) {
            const dataStore = dataService.connect(widget.id, widget.dataSource);
            const unsubscribe = dataStore.subscribe((newData) => {
                console.log('Received new data for widget', widget.id, newData);
                data = newData;
            });

            return () => {
                unsubscribe();
            };
        }
    });

    onDestroy(() => {
        dataService.disconnect(widget.id);
    });
</script>

<div class="flex flex-col" style={cssStringify(style)}>
    {#if widget.type === 'line'}
        <LinePlot {data} lineConfig={widget.config} />
    {:else}
        <p>{widget.data}</p>
    {/if}
    <br/>
    <!-- <p>{widget.size.width} x {widget.size.height}</p> -->
</div>