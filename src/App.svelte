<script>
  import { csv, timeParse } from 'd3';

  import Visualization from './Visualization.svelte';

  const dataPath = 'data/date_temperature_snow.csv';
  const parseDate = timeParse('%Y-%m-%d');
  const dayOfYear = (date) => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

  let data = [];

  csv(dataPath, (d) => {
    const date = parseDate(d.Time);
    return {
      date,
      day: dayOfYear(date),
      year: date.getYear(),
      temperature: d.Temperature === '#N/A' ? null : +d.Temperature,
      snow: d.Snow === '#N/A' ? null : +d.Snow
    };
  }).then((d) => {
    data = d.filter((dd) => dd.date > parseDate('2000-01-16'));
  });
</script>

<div class="app-wrapper">
  <Visualization
    data={data}
  />
</div>

<style>
  .app-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
