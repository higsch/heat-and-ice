<script>
  import { csv, timeParse } from 'd3';

  import { getDayOfYear, getYearDays, firstYear } from './utils/date';

  import Visualization from './Visualization.svelte';

  const dataPath = 'data/date_temperature_snow.csv';
  const parseDate = timeParse('%Y-%m-%d');

  let data = [];

  csv(dataPath, (d) => {
    const date = parseDate(d.Time);
    const day = getDayOfYear(date);
    const month = date.getMonth();
    const year = date.getFullYear();
    return {
      date,
      day,
      month,
      year,
      yearDay: getYearDays(day, year),
      temperature: d.Temperature === '#N/A' ? null : +d.Temperature,
      snow: d.Snow === '#N/A' ? null : +d.Snow
    };
  }).then((d) => {
    data = d.filter((dd) => dd.date > parseDate(`${firstYear}-01-16`));
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
