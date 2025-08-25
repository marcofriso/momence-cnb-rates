import React, { useState } from "react";
import type { RateRow } from "../../types";
import styled from "styled-components";
import { formatNumber } from "../../lib/parseCnb";

const Card = styled.section`
  background: color-mix(in oklab, canvas, canvastext 2%);
  border: 1px solid color-mix(in oklab, canvastext, transparent 85%);
  padding: 20px;
  box-shadow: 0 1px 8px rgba(247, 236, 236, 0.04);
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

const ExchangeRate = ({ rows }: { rows: RateRow[] | undefined }) => {
  const [amount, setAmount] = useState("1");
  const [currency, setCurrency] = useState("EUR");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.includes("-") || (value !== "" && !/^\d*\.?\d*$/.test(value))) {
      setAmount("1");
      return;
    }

    setAmount(value);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  function czkToForeign(czk: number, row: RateRow): number {
    return (czk * row.amount) / row.rate;
  }

  const selectedRow = rows?.find((r) => r.code === currency);
  const converted = selectedRow ? czkToForeign(Number(amount), selectedRow) : 0;

  return (
    <Card aria-label="exchange-rate">
      <h2>Convert CZK → currency</h2>
      <Input
        type="text"
        inputMode="decimal"
        value={amount}
        onChange={handleAmountChange}
        placeholder="Enter amount"
      />
      <Select value={currency} onChange={handleCurrencyChange}>
        {rows ? (
          rows.map((r) => (
            <option key={r.code} value={r.code}>
              {r.code} — {r.currency}
            </option>
          ))
        ) : (
          <option value="EUR">EUR — euro</option>
        )}
      </Select>
      <p>
        {Number(amount) > 0 && selectedRow ? (
          <strong>
            {formatNumber(Number(amount), "cs-CZ", 2)} CZK ≈{" "}
            {formatNumber(converted, "en-US", 2)} {selectedRow?.code}
          </strong>
        ) : (
          <span>&nbsp;</span>
        )}
      </p>
    </Card>
  );
};

export default ExchangeRate;
