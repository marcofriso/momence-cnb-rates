import type { RatesPayload, RateRow } from "../types";

export const rowsSample: RateRow[] = [
  { country: "EMU", currency: "euro", amount: 1, code: "EUR", rate: 24.85 },
  { country: "USA", currency: "dollar", amount: 1, code: "USD", rate: 22.95 },
  { country: "Japan", currency: "yen", amount: 100, code: "JPY", rate: 16.234 },
];

export const payloadSample: RatesPayload = {
  date: "25 Aug 2025",
  rows: rowsSample,
};
