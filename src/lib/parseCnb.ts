import type { RateRow, RatesPayload } from "../types";

function parseCnbDailyTxt(txt: string): RatesPayload {
  const lines = txt.trim().split(/\r?\n/);

  const firstLine = lines[0] ?? "";

  const headerIdx = lines.findIndex((l) =>
    l.startsWith("Country|Currency|Amount|Code|Rate")
  );
  if (headerIdx === -1) {
    throw new Error("Unexpected CNB format: header not found");
  }

  const date = firstLine.replace(/#.*/, "").trim();

  const rows = lines.slice(headerIdx + 1).map((line) => {
    const [country, currency, amount, code, rate] = line.split("|");

    const amountNum = Number(amount);
    const rateNum = Number((rate || "").replace(",", "."));

    if (amountNum <= 0) {
      throw new Error(`Invalid numeric data in line: ${line}`);
    }

    return {
      country: country?.trim(),
      currency: currency?.trim(),
      amount: amountNum,
      code: code?.trim(),
      rate: rateNum,
    };
  });

  return { date, rows };
}

function formatNumber(n: number, locale = "cs-CZ", digits = 2): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n);
}

function czkToForeign(czk: number, row: RateRow): number {
  return (czk * row.amount) / row.rate;
}

export { parseCnbDailyTxt, formatNumber, czkToForeign };
