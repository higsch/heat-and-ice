<script>
  import { fade } from 'svelte/transition';
  import { css } from '../actions/css';

  export let title = 'Title';
  export let description = 'Description';
  export let x = 0;
  export let y = 0;
  export let foregroundColor = '#FFFFFF';
  export let backgroundColor = '#000000';
  export let targetWidth = 0;
  export let targetHeight = 0;

  let width = 0;
  let height = 0;

  const margin = {
    top: 2,
    right: 2,
    bottom: 2,
    left: 2
  };

  $: leftPos = `${x}px`;
  $: topPos = `${Math.max(margin.top, Math.min(y, targetHeight - height - margin.bottom))}px`;
</script>

<div
  class="tooltip"
  use:css={{leftPos, topPos, foregroundColor, backgroundColor}}
  transition:fade={{duration: 200}}
>
  <div
    class="tooltip-content"
    bind:clientWidth={width}
    bind:clientHeight={height}
  >
    <h2>
      {title}
    </h2>
    <p>
      {description}
    </p>
  </div>
</div>

<style>
  .tooltip {
    position: absolute;
    z-index: 100;
    left: var(--leftPos);
    top: var(--topPos);
  }

  .tooltip-content {
    position: relative;
    left: -50%;
    max-width: 250px;
    padding: 0.6rem;
    color: var(--foregroundColor);
    background-color: var(--backgroundColor);
    font-family: var(--font);
    border: 0.1rem solid var(--foregroundColor);
    border-radius: 0.2rem;
    box-shadow: 0 0 2px var(--foregroundColor), 
                0 0 4px var(--foregroundColor);
  }

  h2, p {
    opacity: 0.85;
  }

  h2 {
    font-size: 1.1rem;
    font-weight: normal;
  }

  p {
    margin: 0.4rem 0 0 0;
    line-height: 1.3;
    font-size: 0.8rem;
  }
</style>
