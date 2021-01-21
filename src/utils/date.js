const monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const firstYear = 1980;

export const getYearDays = (day, year) => day + (366 * (year - firstYear))

export const getDayOfYear = (date) => {
  const month = +date.getMonth();
  const day = +date.getDate();

  const previousMonthDays = monthDays.slice(0, month).reduce((acc, cur) => acc + cur, 0);

  return previousMonthDays + day;
};

export const monthLabels = [
  {
    name: 'January'
  },
  {
    name: 'February'
  },
  {
    name: 'March'
  },
  {
    name: 'April'
  },
  {
    name: 'May'
  },
  {
    name: 'June'
  },
  {
    name: 'July'
  },
  {
    name: 'August'
  },
  {
    name: 'September'
  },
  {
    name: 'October'
  },
  {
    name: 'November'
  },
  {
    name: 'December'
  }
].map((d, i) => {
  const startDay = getDayOfYear(new Date(2021, i, 1));
  const endDay = startDay + monthDays[i];
  const middleDay = (startDay + endDay) / 2;
  return {
    ...d,
    startDay,
    endDay,
    middleDay
  };
});
