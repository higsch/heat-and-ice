<script>
  export let color = '#FFFFFF';
</script>

<div
  class="credits"
  style="color: {color};"
>
  <p>
    The data was collected at a weather station in central Stockholm (59.3417 | 18.0549).
  </p>
  <p>
    Created with Svelte and D3.
  </p>
  <p>
    2021, Matthias Stah <a href="https://higsch.com" target="_blank">(higsch | data & design)</a>
  </p>
  <p>
    If you like this viz, consider <a href="https://www.buymeacoffee.com/higsch" target="_blank">buying me a coffee</a>. Thanks!
  </p>
</div>

<style>
  .credits {
    position: absolute;
    z-index: 70;
    bottom: 0;
    right: 0;
    width: 30%;
    padding: 1rem;
    font-family: var(--font);
    font-size: 0.7rem;
  }

  p {
    text-align: right;
    line-height: 1.5;
    opacity: 0.8;
  }

  a {
    color: inherit;
  }
</style>
