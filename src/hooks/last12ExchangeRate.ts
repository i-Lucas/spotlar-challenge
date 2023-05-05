import { getLast12MonthsDates } from "@/utils/last12Dates";

/**
 * 
 * @function get the last 12 valid quotes between two currencies O(n2)
 * @param from base currency
 * @param to destination currency
 * @returns a array of quotes from the last 12 months
 * @catch if there is no result for the current day, we search for the previous day
 */

export default async function getExchangeRateHistory(from: string, to: string): Promise<number[]> {

  const results = [];
  let lastValidExchangeRate = 0;
  const last12MonthsDates = getLast12MonthsDates();

  for (let i = 0; i < last12MonthsDates.length; i++) {

    let date = last12MonthsDates[i];
    let apiUrl = process.env.API_URL + `@latest/${date}/currencies/${from}.json`;

    while (true) {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const exchangeRate = data[from][to];
        if (!isNaN(exchangeRate)) {
          results.push(exchangeRate);
          lastValidExchangeRate = exchangeRate;
        };
        break;
      } catch (error) {
        // console.error(`Error fetching data for date ${date}: ${error}`);
        const [year, month, day] = date.split('-').map(Number);
        const newDate = new Date(year, month - 1, day - 1);
        if (newDate.getMonth() !== month - 1) {
          console.error(`Previous day is from previous month, returning a last valid result for ${date}`);
          results.push(lastValidExchangeRate);
          break;
        };
        date = newDate.toISOString().slice(0, 10);
        apiUrl = process.env.API_URL + `@latest/${date}/currencies/${from}.json`;
      };
    }
  };
  return results;
};