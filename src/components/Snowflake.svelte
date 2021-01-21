<script>
  import { getContext, onMount, onDestroy, afterUpdate } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  import { polarToCartesian } from '../utils/geometry';

  export let datum = {};
  export let fillColor = '#FFFFFF';
  export let strokeColor = '#FFFFFF';
  export let strokeWidth = 1;
  export let opacity = 0.3;
  export let parentWidth = 0;
  export let parentHeight = 0;

  const { register, deregister, invalidate } = getContext('canvas');
  const fallingDuration = 1000;
  const delay = Math.random() * fallingDuration;

  const x = tweened(parentWidth * (Math.random() - 0.5), {
    duration: fallingDuration,
    delay,
    easing: cubicOut
  });

  const y = tweened(-parentHeight / 1.9, {
    duration: fallingDuration,
    delay,
    asing: cubicOut
  });

  function draw(ctx) {
    if (datum.snowflakeRadius) {
      ctx.globalAlpha = opacity;
      if (fillColor) ctx.fillStyle = fillColor;
      if (strokeColor) ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
      ctx.beginPath();
      ctx.arc($x, $y, datum.snowflakeRadius, 0, 2 * Math.PI, false);
      if (strokeColor) ctx.stroke();
      if (fillColor) ctx.fill()
    }
  }

  onMount(() => {
    invalidate();
    register(draw);
    return () => {
      deregister(draw);
    };
  });

	afterUpdate(invalidate);
	onDestroy(invalidate);

  $: cartesianCoordinates = polarToCartesian(0, 0, (datum.innerRadius + datum.outerRadius) / 2, datum.angle - Math.PI / 2)

  $: x.set(cartesianCoordinates.x);
  $: y.set(cartesianCoordinates.y);
</script>
