import React from "react";
import styled from "styled-components";
import type { RateRow } from "../../types";
import { formatNumber } from "../../lib/parseCnb";

const Card = styled.section`
  background: color-mix(in oklab, canvas, canvastext 2%);
  border: 1px solid color-mix(in oklab, canvastext, transparent 85%);

  padding: 20px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.04);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  gap: 10px;
  align-items: center;
`;

const Head = styled.div`
  font-weight: 700;
  opacity: 0.8;
`;

const RatesList = ({ rows }: { rows: RateRow[] }) => {
  return (
    <Card aria-label="rates-list">
      <h2>Daily exchange rates</h2>
      <Grid role="table">
        <Head>Country</Head>
        <Head>Currency</Head>
        <Head>Amount</Head>
        <Head>Code</Head>
        <Head>Rate (CZK)</Head>
        {rows.map((r) => (
          <React.Fragment key={r.code}>
            <div>{r.country}</div>
            <div>{r.currency}</div>
            <div>{r.amount}</div>
            <div>{r.code}</div>
            <div>{formatNumber(r.rate, "cs-CZ", 4)}</div>
          </React.Fragment>
        ))}
      </Grid>
    </Card>
  );
};

export default RatesList;
