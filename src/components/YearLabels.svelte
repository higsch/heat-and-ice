<script>
  import { scaleLinear, extent } from 'd3';

  import { getYearDays } from '../utils/date';

  export let data = [];
  export let spiralRadiusScale;
  export let color = '#FFFFFF';
  export let backgroundColor = '#000000';
  export let parentWidth = 0;
  export let parentHeight = 0;

  $: years = [...new Set(data.map((d) => d.year))];
  $: yearScale = scaleLinear().domain(extent(years));
  $: ticks = years
      .filter((year) => yearScale.ticks(4).includes(year))
      .map((year) => {
        return {
          year,
          x: parentWidth / 2,
          y: parentHeight / 2 + spiralRadiusScale(getYearDays(366 / 2, year))
        };
      });
</script>

<div class="year-labels">
  {#each ticks as tick (tick)}
    <div
      class="year-label"
      style="left: {tick.x}px;
             top: {tick.y}px;"
    >
      <div
        class="year-label-content"
        style="color: {color};
               background-color: {backgroundColor};"
      >
        <span>{tick.year}</span>
      </div>
    </div>
  {/each}
</div>

<style>
  .year-labels {
    position: absolute;
    z-index: 50;
    width: 100%;
    height: 100%;
  }

  .year-label {
    position: absolute;
  }

  .year-label-content {
    position: relative;
    left: -50%;
    margin-top: -50%;
    padding: 0.2rem 0.3rem;
    font-family: var(--font);
    font-size: 0.9rem;
    border-radius: 0.3rem;
  }

  .year-label-content span {
    opacity: 0.8;
  }
</style>
