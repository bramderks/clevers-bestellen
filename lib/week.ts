export function getWeekInfo() {
  const now = new Date();

  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  const day = start.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  start.setDate(start.getDate() + diff);

  const year = start.getFullYear();

  const firstDay = new Date(year, 0, 1);
  const week = Math.ceil(
    ((start.getTime() - firstDay.getTime()) / 86400000 +
      firstDay.getDay() +
      1) /
      7
  );

  return {
    jaar: year,
    week,
    maandag: start,
  };
}