<script lang="ts">
    import type { GridItem } from "$types/dynamic-grid";
    import { cssStringify } from '$lib/utils';
	import { size } from "zod";

    const { widget }: { widget: GridItem} = $props();

    const style: Record<string, string> = {
        'grid-column': `span ${widget.size.width}`,
        'grid-row': `span ${widget.size.height}`
    };
</script>

<div class="flex flex-col" style={cssStringify(style)}>
    <p>{widget.data}</p> <br/>
    <p>{widget.size.width} x {widget.size.height}</p>
</div>