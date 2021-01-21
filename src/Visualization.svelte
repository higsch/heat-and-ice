<script>
  import { scaleLinear, scaleSqrt, extent, max } from 'd3';

  import { background as backgroundColor, temperature as temperatureColor } from './utils/colors';

  import Svg from './components/Svg.svelte';
  import WobbleLine from './components/WobbleLine.svelte';
  import MonthLabels from './components/MonthLabels.svelte';
  import Canvas from './components/Canvas.svelte';
  import Snowflake from './components/Snowflake.svelte';
  import YearLabels from './components/YearLabels.svelte';

  export let data = [];

  let width = 0;
  let height = 0;

  $: minDim = Math.min(width, height);

  $: angleScale = scaleLinear()
    .domain(extent(data, (d) => d.day))
    .range([2 * Math.PI / 366, 2 * Math.PI]);

  $: spiralRadiusScale = scaleLinear()
    .domain(extent(data, (d) => d.yearDay))
    .range([minDim / 10, minDim / 2.2]);

  $: temperatureScale = (temperature) => temperature > 10 ? minDim / data.length * 50 : 0;

  $: snowflakeRadiusScale = (snow) => snow && snow > 0 ? minDim / data.length * 50 : 0;

  $: spiralData = data.map((d) => {
      return {
        ...d,
        angle: angleScale(d.day),
        innerRadius: spiralRadiusScale(d.yearDay) - minDim / 2000,
        outerRadius: spiralRadiusScale(d.yearDay) + minDim / 2000
      };
    });

  $: renderedData = data.map((d) => {
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
        data={renderedData}
        strokeColor="none"
        fillColor={temperatureColor}
      />
      <MonthLabels
        radius={Math.min(minDim, spiralRadiusScale.range()[1] + minDim / 60)}
        angleScale={angleScale}
        color={temperatureColor}
      />
    </Svg>
    <Canvas
      width={width}
      height={height}
    >
      {#each renderedData.filter((d) => d.snow && d.snowflakeRadius > 0) as datum (datum.yearDay)}
        <Snowflake
          datum={datum}
          fillColor={null}
          strokeColor={temperatureColor}
          strokeWidth={minDim / 600}
          opacity={0.5}
          parentWidth={width}
          parentHeight={height}
        />
      {/each}
    </Canvas>
    <YearLabels
      data={data}
      spiralRadiusScale={spiralRadiusScale}
      color={temperatureColor}
      backgroundColor={backgroundColor}
      parentWidth={width}
      parentHeight={height}
    />
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
