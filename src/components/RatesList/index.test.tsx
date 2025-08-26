import { render, screen, within } from "@testing-library/react";
import RatesList from "./index";
import { payloadSample } from "../../test/fixtures";

describe("<RatesList />", () => {
  it("renders date, headers, and rows", () => {
    render(<RatesList data={payloadSample} />);

    // Date shown
    expect(screen.getByText(payloadSample.date)).toBeInTheDocument();

    const table = screen.getByRole("table");
    const tableEl = within(table);

    // Headers
    expect(
      tableEl.getByRole("columnheader", { name: "Country" })
    ).toBeInTheDocument();
    expect(
      tableEl.getByRole("columnheader", { name: "Currency" })
    ).toBeInTheDocument();
    expect(
      tableEl.getByRole("columnheader", { name: "Amount" })
    ).toBeInTheDocument();
    expect(
      tableEl.getByRole("columnheader", { name: "Code" })
    ).toBeInTheDocument();
    expect(
      tableEl.getByRole("columnheader", { name: /Rate \(CZK\)/ })
    ).toBeInTheDocument();

    // Some data cells
    expect(tableEl.getByRole("cell", { name: "EMU" })).toBeInTheDocument();
    expect(tableEl.getByRole("cell", { name: "euro" })).toBeInTheDocument();
    expect(tableEl.getByRole("cell", { name: "EUR" })).toBeInTheDocument();
    expect(tableEl.getByRole("cell", { name: "24,8500" })).toBeInTheDocument();
  });
});
