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
  <h2>Weather history from 1980 through 2021.</h2>
  <p>
  
  </p>
</div>

<style>
  .title {
    position: absolute;
    z-index: 70;
    width: 100%;
    padding: 1rem;
    font-family: var(--font);
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
    font-size: 1rem;
    font-weight: normal;
    opacity: 0.8;
  }

  p {
    font-size: 1rem;
    opacity: 0.8;
  }
</style>
