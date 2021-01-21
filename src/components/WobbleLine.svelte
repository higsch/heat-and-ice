<script>
  import { areaRadial, curveBasis as curve } from 'd3';

  export let data = [];
  export let strokeColor = 'none';
  export let strokeWidth = 1;
  export let strokeOpacity = 1.0;
  export let fillColor = 'none';
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
    stroke={strokeColor}
    stroke-width={strokeWidth}
    stroke-opacity={strokeOpacity}
    fill={fillColor}
    fill-opacity={fillOpacity}
  />
</g>
