import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Converter from "./index";
import { rowsSample } from "../../test/fixtures";

describe("<Converter />", () => {
  it("renders select options from rows", () => {
    render(<Converter rows={rowsSample} />);
    // EUR, USD, JPY should be in the select options
    expect(
      screen.getByRole("option", { name: /EUR — euro/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: /USD — dollar/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: /JPY — yen/i })
    ).toBeInTheDocument();
  });

  it("prevents negatives and keeps amount non-negative", async () => {
    const user = userEvent.setup();
    render(<Converter rows={rowsSample} />);

    const input = screen.getByPlaceholderText(
      /Enter amount/i
    ) as HTMLInputElement;

    // initial value is "1"
    expect(input.value).toBe("1");

    // try to type a minus; your handler resets to "1"
    await user.clear(input);
    await user.type(input, "-");
    expect(input.value).toBe("1");
  });

  it("converts CZK to selected currency", async () => {
    const user = userEvent.setup();
    render(<Converter rows={rowsSample} />);

    const input = screen.getByPlaceholderText(/Enter amount/i);
    const select = screen.getByRole("combobox");

    // 1000 CZK to JPY
    await user.clear(input);
    await user.type(input, "1000");
    await user.selectOptions(select, "JPY");

    // Using rowsSample: JPY amount=100, rate=16.234 → 1000 * 100 / 16.234 ≈ 6158.5
    // We just assert the result line shows "JPY" and looks like a conversion
    const result = await screen.findByText(/CZK ≈/i);
    expect(result).toHaveTextContent("JPY");
    expect(result.textContent).toMatch(/^1\s000,00 CZK ≈ 6\s159,91 JPY$/);
  });

  it("accepts decimal input (e.g., 12.5)", async () => {
    const user = userEvent.setup();
    render(<Converter rows={rowsSample} />);

    const input = screen.getByPlaceholderText(
      /Enter amount/i
    ) as HTMLInputElement;
    await user.clear(input);
    await user.type(input, "12.5");
    expect(input.value).toBe("12.5");
  });
});
