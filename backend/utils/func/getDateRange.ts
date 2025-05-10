function getDateRange(start: Date, end: Date): Date[] {
  const dates: Date[] = [];
  const current: Date = new Date(start);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}
export { getDateRange };
