<script>
  import { scaleLinear, extent } from 'd3';

  import TemperatureLine from './components/TemperatureLine.svelte';

  export let data = [];

  let width = 0;
  let height = 0;

  $: minDim = Math.min(width, height);

  $: angleScale = scaleLinear()
    .domain(extent(data, d => d.day))
    .range([2 * Math.PI / 366, 2 * Math.PI]);

  $: spiralRadiusScale = scaleLinear()
    .domain(extent(data, (_, i) => i))
    .range([0, minDim / 3]);
</script>

<div class="visualization-wrapper">
  <div
    class="draw-wrapper"
    bind:clientWidth={width}
    bind:clientHeight={height}
  >
    <TemperatureLine
      data={data}
      angleScale={angleScale}
      spiralRadiusScale={spiralRadiusScale}
    />
  </div>
</div>

<style>
  .visualization-wrapper {
    width: 100%;
    height: 100%;
  }

  .draw-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
