import { getLast12MonthsDates } from "@/utils/last12Dates";

/**
 * @function get the last 12 valid quotes between two currencies O(n2)
 * @param from base currency
 * @param to destination currency
 * @returns an array of quotes from the last 12 months
 * @throws an error if it was not possible to find data for the last few months for the specified currency pair
 */

type Quote = {
  date: string,
  rate: number
};

async function fetchExchangeRate(date: string, from: string, to: string): Promise<Quote | null> {
  const apiUrl = `${process.env.API_URL}@latest/${date}/currencies/${from}.json`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const exchangeRate = data[from][to];
    if (!isNaN(exchangeRate)) return { date, rate: exchangeRate };

  } catch (error) {
    console.error(`Error fetching data for date ${date}: ${error}`);
  };

  return null;
};

export default async function getExchangeRateHistory(from: string, to: string): Promise<number[]> {

  const quotes: Quote[] = [];
  const last12MonthsDates = getLast12MonthsDates();

  for (const date of last12MonthsDates) {
    const daysUntilPreviousMonth = new Date(date).getDate();
    const maxAttempts = daysUntilPreviousMonth + 1;

    let quote: Quote | null = null;
    let attempts = 0;

    while (!quote && attempts < maxAttempts) {
      quote = await fetchExchangeRate(date, from, to);
      attempts++;
    }

    if (quote) {
      quotes.push(quote);
    } else if (quotes.length > 0) {
      const lastQuote = quotes[quotes.length - 1];
      console.error(`No data found for ${date}, using previous quote from ${lastQuote.date}`);
      quotes.push({ date, rate: lastQuote.rate });
    } else {
      throw new Error(`No data found for ${from} to ${to} for the last few months`);
    }
  };

  return quotes.map((quote) => quote.rate);
};