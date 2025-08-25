// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { useCnbRates } from "./api/useCnbRates";
import "./App.css";
import styled from "styled-components";
import RatesList from "./components/RatesList";
import ExchangeRate from "./components/ExchangeRate";

const Wrap = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
  display: grid;
  gap: 24px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
`;

const Card = styled.section`
  background: color-mix(in oklab, canvas, canvastext 2%);
  border: 1px solid color-mix(in oklab, canvastext, transparent 85%);
  padding: 20px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.04);
`;

const Date = styled.ul`
  list-style: none;
  padding: 0;
`;

function App() {
  const { data, isLoading, error } = useCnbRates();

  return (
    <Wrap>
      <Title>Momence CNB Rates</Title>
      <ExchangeRate rows={data?.rows} />
      {error && (
        <Card role="alert">Failed to load rates. Please try again.</Card>
      )}
      <Date>{data ? `Date: ${data?.date}` : <span>&nbsp;</span>}</Date>
      {isLoading && <Card>Loading latest rates…</Card>}
      {data && <RatesList rows={data.rows} />}
    </Wrap>
  );
}

export default App;
