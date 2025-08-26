import { useQuery } from "@tanstack/react-query";
import { parseCnbDailyTxt } from "../lib/parseCnb";

const CNB_URL = import.meta.env.DEV
  ? "/cnb/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt"
  : `${import.meta.env.BASE_URL}data/daily.txt`;

const DATA_REFRESH_MINUTES = 30;

async function fetchCnbDaily(): Promise<ReturnType<typeof parseCnbDailyTxt>> {
  const res = await fetch(CNB_URL, { cache: "no-store" });

  if (!res.ok) throw new Error(`CNB fetch failed: ${res.status}`);

  const txt = await res.text();

  return parseCnbDailyTxt(txt);
}

export function useCnbRates() {
  return useQuery({
    queryKey: ["cnb", "daily"],
    queryFn: fetchCnbDaily,
    staleTime: DATA_REFRESH_MINUTES * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
