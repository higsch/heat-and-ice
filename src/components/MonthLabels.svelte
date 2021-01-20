<script>
  import { arc as d3arc} from 'd3';

  import { monthLabels } from '../utils/date';

  export let radius = 0;
  export let angleScale;
  export let color = '#FFFFFF';

  $: arc = d3arc()
    .startAngle(d => angleScale(d.middleDay) - Math.PI / monthLabels.length)
    .endAngle(d => angleScale(d.middleDay) + Math.PI / monthLabels.length)
    .innerRadius(() => radius)
    .outerRadius(() => radius);
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
        style="font-family: var(--font);
               font-size: 1rem;"
      >
        <textPath
          xlink:href="#month-path-{label.name}"
          text-anchor="middle"
          startOffset="{angleScale(label.middleDay) > Math.PI / 2 && angleScale(label.middleDay) < 1.5 * Math.PI ? '7' : '2'}5%"
        >
          {label.name}
        </textPath>
      </text>
    {/each}
  </g>
{/if}
