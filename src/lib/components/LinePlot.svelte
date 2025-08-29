<script lang="ts">
  import * as d3 from 'd3';

  export let data: number[];
  export let width = 640;
  export let height = 400;
  export let marginTop = 20;
  export let marginRight = 20;
  export let marginBottom = 20;
  export let marginLeft = 20;

  $: x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  $: extent = d3.extent(data) ?? [0, 1] as [number, number];
  $: y = d3.scaleLinear(extent !== undefined ? (extent as [number, number]) : [0, 1], [height - marginBottom, marginTop]);
  $: line = d3.line((d, i) => x(i), y);
</script>
<svg width="100%" height="100%">
  <path fill="none" stroke="currentColor" stroke-width="1.5" d={line(data)} />
  <g fill="white" stroke="currentColor" stroke-width="1.5">
    {#each data as d, i}
      <circle cx={x(i)} cy={y(d)} r="2.5" />
    {/each}
  </g>
</svg>