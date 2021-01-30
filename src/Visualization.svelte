<script>
  import { scaleLinear, extent } from 'd3';

  import { background as backgroundColor, temperature as temperatureColor } from './utils/colors';

  import Title from './components/Title.svelte';
  import Svg from './components/Svg.svelte';
  import WobbleLine from './components/WobbleLine.svelte';
  import SpiralEnds from './components/SpiralEnds.svelte';
  import MonthLabels from './components/MonthLabels.svelte';
  import Legend from './components/Legend.svelte';
  import Canvas from './components/Canvas.svelte';
  import Snowflake from './components/Snowflake.svelte';
  import YearLabels from './components/YearLabels.svelte';
  import Explainers from './components/Explainers.svelte';
  import Credits from './components/Credits.svelte';

  export let data = [];

  const spiralOpacity = 0.3;
  const fallingDuration = 2000;

  let width = 0;
  let height = 0;

  $: minDim = Math.min(width, height);

  $: angleScale = scaleLinear()
    .domain(extent(data, (d) => d.day))
    .range([2 * Math.PI / 366, 2 * Math.PI]);

  $: spiralRadiusScale = scaleLinear()
    .domain(extent(data, (d) => d.yearDay))
    .range([minDim / 10, minDim / 2.2]);

  $: temperatureScale = (temperature) => data.length > 0 && temperature > 10 ? minDim / data.length * 50 : 0;

  $: snowflakeRadiusScale = (snow) => data.length > 0 && snow && snow > 0 ? minDim / data.length * 50 : 0;

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
    <Title
      color={temperatureColor}
    />
    {#if (spiralData.length)}
      <Svg
        width={width}
        height={height}
      >
        <WobbleLine
          data={spiralData}
          fillColor={temperatureColor}
          fillOpacity={spiralOpacity}
        />
        <WobbleLine
          data={renderedData}
          strokeColor="none"
          fillColor={temperatureColor}
        />
        <SpiralEnds
          points={[ ...spiralData.slice(-1), ...spiralData.slice(0, 1)]}
          fillColor={temperatureColor}
          fillOpacity={spiralOpacity * 1.5}
          parentMinDim={minDim}
        />
        <MonthLabels
          innerRadius={Math.min(minDim, spiralRadiusScale.range()[1] + minDim / 60)}
          outerRadius={Math.min(minDim, spiralRadiusScale.range()[1] + minDim / 40)}
          veryInnerRadius={minDim / 10}
          angleScale={angleScale}
          color={temperatureColor}
        />
        <Legend
          radius={minDim / 10}
          temperatureScale={temperatureScale}
          snowflakeRadiusScale={snowflakeRadiusScale}
          temperatureColor={temperatureColor}
          snowStrokeColor={temperatureColor}
          snowStrokeWidth={minDim / 600}
          snowStrokeOpacity={0.8}
        />
      </Svg>
    {/if}
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
          fallingDuration={fallingDuration}
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
    {#if (width > 600)}
      <Explainers
        angleScale={angleScale}
        spiralRadiusScale={spiralRadiusScale}
        foregroundColor={temperatureColor}
        backgroundColor={backgroundColor}
        delay={fallingDuration + 2000}
      />
    {/if}
    <Credits
      color={temperatureColor}
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
