<script>
  import { fade } from 'svelte/transition';

  import { data } from '../inputs/explainers';
  import { polarToCartesian } from '../utils/geometry';
  import { css } from '../actions/css';
  import { tooltipable } from '../actions/tooltipable';

  export let angleScale;
  export let spiralRadiusScale;
  export let foregroundColor = '#FFFFFF';
  export let backgroundColor = '#000000';
  export let delay = 2000;

  let width = 0;
  let height = 0;
  let tooltipTarget;

  $: renderedData = data.map((d) => {
      const angle = angleScale(d.dayOfYear) - Math.PI / 2;
      const radius = spiralRadiusScale(d.yearDays);
      const { x, y } = polarToCartesian(width / 2, height / 2, radius, angle);
      return {
        ...d,
        x,
        y
      };
    });
</script>

<div
  class="explainers"
  use:css={{foregroundColor, backgroundColor}}
  bind:clientWidth={width}
  bind:clientHeight={height}
  bind:this={tooltipTarget}
>
  {#each renderedData as explainer (explainer.id)}
    <div
      class="explainer"
      style="left: {explainer.x}px;
             top: {explainer.y}px;"
      transition:fade={{duration: 200, delay: delay + Math.random() * 1000}}
    >
      <div
        class="explainer-content"
        use:tooltipable={{data: explainer,
                          target: tooltipTarget,
                          foregroundColor,
                          backgroundColor}}
      >
        ?
      </div>
    </div>
  {/each}
</div>

<style>
  .explainers {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .explainer {
    position: absolute;
    z-index: 80;
  }

  .explainer-content {
    position: relative;
    left: -50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.8rem;
    height: 1.8rem;
    margin-top: -50%;
    color: var(--foregroundColor);
    background-color: var(--backgroundColor);
    opacity: 0.8;
    line-height: 1;
    font-family: var(--font);
    font-size: 1.1rem;
    font-weight: bold;
    border: 0.15rem solid var(--foregroundColor);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
  }

  .explainer-content:hover {
    color: var(--backgroundColor);
    background-color: var(--foregroundColor);
  }
</style>
