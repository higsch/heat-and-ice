<script>
  import { areaRadial, curveBasis as curve } from 'd3';

  export let data = [];
  export let fillColor = '#000000';
  export let fillOpacity = 1.0;

  $: area = areaRadial()
    .angle((d) => d.angle)
    .innerRadius((d) => d.innerRadius)
    .outerRadius((d) => d.outerRadius)
    .curve(curve);
</script>

<g class="temperature-line">
  <path
    d={area(data)}
    stroke="none"
    fill={fillColor}
    fill-opacity={fillOpacity}
  />
</g>
