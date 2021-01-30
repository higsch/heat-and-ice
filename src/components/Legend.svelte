<script>
  import { scaleLinear, area as d3area, curveBasis as curve } from 'd3';

  export let radius = 0;
  export let temperatureScale;
  export let snowflakeRadiusScale;
  export let temperatureColor = '#FFFFFF';
  export let snowStrokeColor = '#FFFFFF';
  export let snowStrokeWidth = '2';
  export let snowStrokeOpacity = 1.0;

  $: temperatureData = [
    temperatureScale(0),
    temperatureScale(20),
    temperatureScale(20),
    temperatureScale(20),
    temperatureScale(20),
    temperatureScale(20),
    temperatureScale(20),
    temperatureScale(0)
  ];

  $: xScale = scaleLinear()
      .domain([0, temperatureData.length - 1])
      .range([-radius / 4, radius / 4]);

  $: area = d3area()
    .x((_, i) => xScale(i))
    .y0((d) => d)
    .y1((d) => -d)
    .curve(curve);
</script>

<g class="legend">
  <g
    class="temperature-legend"
    transform="translate(0 {radius / 8})"
  >
    <path
      d={area(temperatureData)}
      stroke="none"
      fill={temperatureColor}
    />
    <text
      transform="translate (0 {7 * temperatureScale(20)})"
      fill={temperatureColor}
      fill-opacity={0.8}
      text-anchor="middle"
      style="font-family: var(--font);
             font-size: 0.8rem;"
    >
      Days above 10 °C.
    </text>
  </g>
  <g
    class="snow-legend"
    transform="translate(0 {-radius / 3})"
  >
    <circle
      cx="0"
      cy="0"
      r={snowflakeRadiusScale(1)}
      stroke={snowStrokeColor}
      stroke-width={snowStrokeWidth}
      stroke-opacity={snowStrokeOpacity}
    />
    <text
      transform="translate (0 {7 * temperatureScale(20)})"
      fill={temperatureColor}
      fill-opacity={0.8}
      text-anchor="middle"
      style="font-family: var(--font);
             font-size: 0.8rem;"
    >
      Snowy day.
    </text>
  </g>
</g>
