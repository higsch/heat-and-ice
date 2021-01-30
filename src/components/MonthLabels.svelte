<script>
  import { arc as d3arc} from 'd3';

  import { monthLabels } from '../utils/date';
  import { polarToCartesian } from '../utils/geometry';

  export let innerRadius = 0;
  export let outerRadius = 0;
  export let angleScale;
  export let color = '#FFFFFF';

  let separators = [];

  $: isTop = (d) => angleScale(d.middleDay) > Math.PI / 2 && angleScale(d.middleDay) < 1.5 * Math.PI;

  $: arc = d3arc()
    .startAngle(d => angleScale(d.middleDay) - Math.PI / monthLabels.length)
    .endAngle(d => angleScale(d.middleDay) + Math.PI / monthLabels.length)
    .innerRadius((d) => isTop(d) ? outerRadius : innerRadius)
    .outerRadius((d) => isTop(d) ? outerRadius : innerRadius);

  $: if (angleScale) separators = monthLabels.map((d, i) => {
      const angle = angleScale(d.startDay);
      const { x: x1, y: y1 } = polarToCartesian(0, 0, innerRadius, angle);
      const { x: x2, y: y2 } = polarToCartesian(0, 0, outerRadius, angle);
      return {
        id: i,
        x1, y1,
        x2, y2
      };  
    });
</script>

{#if (angleScale)}
  <g class="month-labels">
    {#each monthLabels as label (label.name)}
      <path
        id="month-path-{label.name}"
        d={arc(label)}
        stroke="none"
        fill="none"
      />
      <text
        fill={color}
        fill-opacity={0.8}
        style="font-family: var(--font);
               font-size: 0.9rem;"
      >
        <textPath
          xlink:href="#month-path-{label.name}"
          text-anchor="middle"
          startOffset="{isTop(label) ? '7' : '2'}5%"
        >
          {label.name}
        </textPath>
      </text>
    {/each}
  </g>
  <g class="month-labels-separators">
    {#each separators as sep (sep.id)}
      <line
        x1={sep.x1 || 0}
        y1={sep.y1 || 0}
        x2={sep.x2 || 0}
        y2={sep.y2 || 0}
        stroke={color}
        stroke-width="2"
        stroke-opacity="0.5"
        stroke-stroke-linecap="round"
      />
    {/each}
  </g>
{/if}
