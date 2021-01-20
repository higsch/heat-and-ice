<script>
  export let width = 0;
  export let height = 0;
</script>

<svg
  width={width}
  height={height}
>
  <g transform="translate({width / 2} {height / 2})">
    <slot />
  </g>
</svg>

<style>
  svg {
    position: absolute;
    z-index: 0;
  }
</style>
