import React from "react";
import styled from "styled-components";
import type { RatesPayload } from "../../types";
import { formatNumber } from "../../lib/parseCnb";
import { Card } from "../../styled";

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

const Date = styled.p`
  font-style: italic;
  margin-bottom: 28px;
`;

const RatesList = ({ data }: { data: RatesPayload }) => {
  const { rows, date } = data;

  return (
    <Card aria-label="rates-list">
      <h2>Daily exchange rates</h2>
      <Date>{date}</Date>
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
