<script>
  export let color = '#FFFFFF';
</script>

<div
  class="title"
  style="color: {color};"
>
  <h1>
    Heat & Ice in Stockholm
  </h1>
  <h2>The weather spiral from 1980 until 2021.</h2>
</div>

<style>
  .title {
    position: absolute;
    z-index: 70;
    width: 100%;
    padding: 1rem;
    font-family: var(--font);
  }

  @media (min-width: 600px) {
    .title {
      width: 30%;
    }
  }

  h1 {
    font-size: 2rem;
    font-weight: bold;
  }

  @media (min-width: 1500px ) {
    h1 {
      font-size: 3rem;
    }
  }

  h2 {
    width: 80%;
    margin: 0 0 0 0.2rem;
    line-height: 1.3;
    font-size: 1rem;
    font-weight: normal;
    opacity: 0.8;
  }
</style>
