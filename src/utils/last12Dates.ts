export function getLast12MonthsNames(): string[] {
  const months = [];
  const date = new Date();

  for (let i = 0; i < 12; i++) {
    months.unshift(date.toLocaleString("en-US", { month: "short" }));
    date.setMonth(date.getMonth() - 1);
  };

  return months;
};

export function getLast12MonthsDates() {

  const dates = [];
  const today = new Date();

  for (let i = 11; i >= 0; i--) {

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() - i + 1, 0).getDate();

    if (firstDayOfMonth.getMonth() === today.getMonth()) {
      dates.push(today.toISOString().slice(0, 10));
    } else {
      dates.push(new Date(today.getFullYear(), today.getMonth() - i, lastDayOfMonth).toISOString().slice(0, 10));
    }
  };

  return dates;
};