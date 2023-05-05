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
  const yesterday = getYesterday(today);

  for (let i = 11; i >= 0; i--) {
    const firstDayOfMonth = getFirstDayOfMonth(today, i);
    const lastDayOfMonth = getLastDayOfMonth(today, i);

    const date = firstDayOfMonth.getMonth() === today.getMonth() ? yesterday : lastDayOfMonth;
    dates.push(date.toISOString().slice(0, 10));
  }

  return dates;
};

function getYesterday(date: Date) {
  const yesterday = new Date(date.getTime());
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
};

function getFirstDayOfMonth(date: Date, offset: number) {
  return new Date(date.getFullYear(), date.getMonth() - offset, 1);
};

function getLastDayOfMonth(date: Date, offset: number) {
  return new Date(date.getFullYear(), date.getMonth() - offset + 1, 0);
};
