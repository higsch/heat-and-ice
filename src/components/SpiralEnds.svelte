<script>
  import { areaRadial, curveBasis as curve } from 'd3';

  import { polarToCartesian } from '../utils/geometry';

  export let points = [];
  export let fillColor = '#FFFFFF';
  export let fillOpacity = 1.0;
  export let parentMinDim = 100;

  let startData = [];
  let endData = [];

  $: area = areaRadial()
    .angle((d) => d.angle)
    .innerRadius((d) => d.innerRadius)
    .outerRadius((d) => d.outerRadius)
    .curve(curve);

  $: if (points.length === 2) {
      const startPoint = points[0];
      startData = [
        startPoint,
        {
          angle: startPoint.angle * 0.6,
          innerRadius: startPoint.innerRadius - startPoint.outerRadius * 0.15,
          outerRadius: startPoint.outerRadius - startPoint.outerRadius * 0.15
        },
        {
          angle: startPoint.angle * 1.2,
          innerRadius: startPoint.innerRadius - startPoint.outerRadius * 0.25,
          outerRadius: startPoint.outerRadius - startPoint.outerRadius * 0.25
        }
      ];

      const endPoint = points[1];
      endData = [
        endPoint,
        {
          angle: endPoint.angle * 1.2,
          innerRadius: endPoint.innerRadius + startPoint.outerRadius * 0.03,
          outerRadius: endPoint.outerRadius + startPoint.outerRadius * 0.03
        },
        {
          angle: endPoint.angle * 1.4,
          innerRadius: endPoint.innerRadius + startPoint.outerRadius * 0.2,
          outerRadius: endPoint.outerRadius + startPoint.outerRadius * 0.2
        }
      ];
    }
  
  $: startPoint = polarToCartesian(0, 0, startData[2].innerRadius, startData[2].angle - Math.PI / 2);
  $: endPoint = polarToCartesian(0, 0, endData[2].innerRadius, endData[2].angle - Math.PI / 2);
</script>

<g class="spiral-ends">
  <g class="spiral-start">
    <path
      d={area(startData)}
      stroke="none"
      fill={fillColor}
      fill-opacity={fillOpacity}
    />
    <text
      transform="translate({startPoint.x - parentMinDim / 100} {startPoint.y + parentMinDim / 70})"
      fill={fillColor}
      fill-opacity={fillOpacity}
      font-size="0.7rem"
      text-anchor="middle"
    >
      1980 starts here
    </text>
  </g>
  <g class="spiral-end">
    <path
      d={area(endData)}
      stroke="none"
      fill={fillColor}
      fill-opacity={fillOpacity}
    />
    <text
      transform="translate({endPoint.x + parentMinDim / 200} {endPoint.y + parentMinDim / 450})"
      fill={fillColor}
      fill-opacity={fillOpacity}
      font-size="0.7rem"
      text-anchor="start"
    >
      2021
    </text>
  </g>
</g>

<style>
  text {
    font-family: var(--font);
  }
</style>
