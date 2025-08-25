export type RateRow = {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
};

export type RatesPayload = {
  date: string;
  rows: RateRow[];
};
