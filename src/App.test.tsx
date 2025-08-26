import { render, screen } from "@testing-library/react";
import { type Mock } from "vitest";
import "@testing-library/jest-dom/vitest";
import App from "./App";
import { payloadSample } from "./test/fixtures";

// Mock the hook module
vi.mock("./api/useCnbRates", () => {
  return {
    useCnbRates: vi.fn(),
  };
});

import { useCnbRates } from "./api/useCnbRates";

const mockedUseCnbRates = useCnbRates as unknown as Mock;

describe("<App />", () => {
  it("shows loading state", () => {
    mockedUseCnbRates.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    render(<App />);
    expect(screen.getByText(/Loading latest rates…/i)).toBeInTheDocument();
  });

  it("shows error state", () => {
    mockedUseCnbRates.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("boom"),
    });

    render(<App />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      /Failed to load rates/i
    );
  });

  it("renders converter and rates list when data is loaded", () => {
    mockedUseCnbRates.mockReturnValue({
      data: payloadSample,
      isLoading: false,
      error: null,
    });

    render(<App />);

    // Title present
    expect(screen.getByText(/Momence CNB Rates/i)).toBeInTheDocument();

    // Converter card label
    expect(
      screen.getByRole("heading", { name: /Convert CZK/i })
    ).toBeInTheDocument();

    // Rates list card label
    expect(
      screen.getByRole("heading", { name: /Daily exchange rates/i })
    ).toBeInTheDocument();

    // A couple of cells from the list
    expect(screen.getByText("EUR")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
  });
});
