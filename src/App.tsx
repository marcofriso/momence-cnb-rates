import { useCnbRates } from "./api/useCnbRates";
import "./App.css";
import styled from "styled-components";
import RatesList from "./components/RatesList";
import Converter from "./components/Converter";
import { Card } from "./styled";

const Wrap = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
  display: grid;
  gap: 24px;
`;

const Title = styled.h1`
  margin: 0;
`;

function App() {
  const { data, isLoading, error } = useCnbRates();

  return (
    <Wrap>
      <Title>Momence CNB Rates</Title>
      <Converter rows={data?.rows} />
      {error && (
        <Card role="alert">Failed to load rates. Please try again.</Card>
      )}
      {isLoading && <Card>Loading latest rates…</Card>}
      {data && <RatesList data={data} />}
    </Wrap>
  );
}

export default App;
