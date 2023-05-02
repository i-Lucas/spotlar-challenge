export default async function fetchExchangeRate(fromCurrency: string, toCurrency: string): Promise<IExchangeRate> {

  const from = fromCurrency.toLowerCase();
  const to = toCurrency.toLowerCase();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL + `@1/latest/currencies/${from}/${to}.json`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  return ({
    date: data.date,
    rate: data[toCurrency.toLowerCase()],
  });
};