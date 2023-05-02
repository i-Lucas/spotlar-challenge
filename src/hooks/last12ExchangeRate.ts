import { getLast12MonthsDates } from "@/utils/last12Dates";

export default async function getExchangeRateHistory(from: string, to: string): Promise<number[]> {

  const last12MonthsDates = getLast12MonthsDates();
  const promises = last12MonthsDates.map(async (date) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + `@latest/${date}/currencies/${from}.json`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data[from][to];
  });

  const results = await Promise.all(promises);
  return results;
};