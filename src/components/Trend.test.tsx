import { render, screen } from "@testing-library/react";
import Trend from "./Trend";

describe("Trend Component", () => {
  it("renders the type and formatted amount correctly", () => {
    render(<Trend type="Income" amount={10000} prevAmount={5000} />);
    expect(screen.getByText("Income")).toBeInTheDocument();
    expect(screen.getByText("¥10,000")).toBeInTheDocument();
  });

  it("calculates and displays the percentage change", () => {
    render(<Trend type="Income" amount={10000} prevAmount={5000} />);
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("renders an upward arrow for positive changes", () => {
    render(<Trend type="Income" amount={10000} prevAmount={5000} />);
    expect(screen.getByTestId("arrow-up")).toBeInTheDocument();
  });

  it("renders a downward arrow for negative changes", () => {
    render(<Trend type="Expense" amount={500} prevAmount={1000} />);
    expect(screen.getByTestId("arrow-down")).toBeInTheDocument();
  });
});
