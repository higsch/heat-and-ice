<script>
  import { scaleLinear, scaleSqrt, extent, max } from 'd3';

  import { background, background as backgroundColor, temperature as temperatureColor } from './utils/colors';

  import Svg from './components/Svg.svelte';
  import WobbleLine from './components/WobbleLine.svelte';
  import MonthLabels from './components/MonthLabels.svelte';
  import Canvas from './components/Canvas.svelte';
  import Snowflake from './components/Snowflake.svelte';

  export let data = [];

  let width = 0;
  let height = 0;

  let spiralData = [];
  let temperatureData = [];
  let snowData = [];

  $: minDim = Math.min(width, height);

  $: angleScale = scaleLinear()
    .domain(extent(data, (d) => d.day))
    .range([0, 2 * Math.PI]);

  $: spiralRadiusScale = scaleLinear()
    .domain(extent(data, (d) => d.yearDay))
    .range([minDim / 10, minDim / 2.2]);

  $: temperatureScale = (temperature) => temperature > 10 ? minDim / data.length * 50 : 0;

  $: snowflakeRadiusScale = scaleSqrt()
    .domain([0, max(data, (d) => d.snow)])
    .range([0, minDim / 50]);

  $: spiralData = data.map((d) => {
      return {
        ...d,
        angle: angleScale(d.day),
        innerRadius: spiralRadiusScale(d.yearDay) - minDim / 2000,
        outerRadius: spiralRadiusScale(d.yearDay) + minDim / 2000,
        snowflakeRadius: snowflakeRadiusScale(d.snow)
      };
    });

  $: temperatureData = data.map((d) => {
      return {
        ...d,
        angle: angleScale(d.day),
        innerRadius: spiralRadiusScale(d.yearDay) - temperatureScale(d.temperature),
        outerRadius: spiralRadiusScale(d.yearDay) + temperatureScale(d.temperature),
        snowflakeRadius: snowflakeRadiusScale(d.snow)
      };
    });
</script>

<div
  class="visualization-wrapper"
  style="background-color: {backgroundColor};"
>
  <div
    class="draw-wrapper"
    bind:clientWidth={width}
    bind:clientHeight={height}
  >
    <Svg
      width={width}
      height={height}
    >
      <WobbleLine
        data={spiralData}
        fillColor={temperatureColor}
        fillOpacity={0.3}
      />
      <WobbleLine
        data={temperatureData}
        strokeColor="none"
        fillColor={temperatureColor}
      />
      <MonthLabels
        radius={Math.min(minDim, spiralRadiusScale.range()[1] + minDim / 60)}
        angleScale={angleScale}
        color={temperatureColor}
      />
    </Svg>
    <!-- <Canvas
      width={width}
      height={height}
    >
      {#each renderedData.filter((d) => d.snow && d.snowflakeRadius > 0) as datum (datum.yearDay)}
        <Snowflake
          datum={datum}
          fillColor={temperatureColor}
          opacity={0.4}
          strokeWidth={minDim / 400}
          parentWidth={width}
          parentHeight={height}
        />
      {/each}
    </Canvas> -->
  </div>
</div>

<style>
  .visualization-wrapper {
    width: 100%;
    height: 100%;
  }

  .draw-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
