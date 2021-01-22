import { getDayOfYear, getYearDays } from '../utils/date';

export const data = [
  {
    date: new Date(2010, 1, 29),
    title: 'Leap years',
    description: 'This tentative straight line pattern reveals missing 29th February days in leap years.'
  },
  {
    date: new Date(2016, 4, 20),
    title: 'Järnnätter',
    description: 'The saints of the ice – in Germany: die Eisheiligen. Between 21st and 25th May, there are the last icy nights in spring. At least according to country sayings.'
  },
  {
    date: new Date(2016, 11, 17),
    title: 'Where is the snow?',
    description: 'Last year and this year we had to wait a while until it snowed for the first time in winter.'
  },
  {
    date: new Date(1991, 5, 19),
    title: 'Midsummer',
    description: 'Watch the temperature dropping in some years around midsummer. This is exactly what we feel almost every year. Apparently, in most years it is at least 10 degrees...'
  },
  {
    date: new Date(2000, 9, 30),
    title: 'Getting cold',
    description: 'In October the weather turns to colder temperatures. However, in recent years there were quite a few warm days even in November.'
  }
].map((d, i) => {
  const dayOfYear = getDayOfYear(d.date);
  const yearDays = getYearDays(dayOfYear, d.date.getFullYear());
  return {
    id: i,
    ...d,
    dayOfYear,
    yearDays
  };
});
