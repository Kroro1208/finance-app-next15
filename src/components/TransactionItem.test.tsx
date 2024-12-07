import { render, screen } from "@testing-library/react";
import TransactionItem from "./TransactionItem";
import * as UseFormatCurrency from "@/app/hooks/UseFormatCurrency";
import { vi } from "vitest";

// モックの設定を修正
vi.mock("@/app/hooks/UseFormatCurrency", () => ({
  useFormatCurrency: vi.fn(),
}));

describe("TransactionItem Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the description and formatted amount", () => {
    // モックの使用方法を修正
    vi.spyOn(UseFormatCurrency, "useFormatCurrency").mockReturnValue("¥10,000");

    render(
      <TransactionItem
        type="Income"
        description="Salary"
        amount={10000}
        category="Work"
      />,
    );

    expect(screen.getByText("Salary")).toBeInTheDocument();
    expect(screen.getByText("¥10,000")).toBeInTheDocument();
  });

  // 他のテストケースも同様に修正
  it("renders the correct icon for the type", () => {
    vi.spyOn(UseFormatCurrency, "useFormatCurrency").mockReturnValue("¥10,000");

    render(
      <TransactionItem
        type="Investment"
        description="Stock Purchase"
        amount={5000}
      />,
    );

    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toHaveClass("text-indigo-500");
  });

  it("renders the category if provided", () => {
    vi.spyOn(UseFormatCurrency, "useFormatCurrency").mockReturnValue("¥10,000");

    render(
      <TransactionItem
        type="Saving"
        description="Emergency Fund"
        amount={3000}
        category="Savings"
      />,
    );

    expect(screen.getByText("Savings")).toBeInTheDocument();
  });

  it("does not render the category if not provided", () => {
    vi.spyOn(UseFormatCurrency, "useFormatCurrency").mockReturnValue("¥5,000");

    render(
      <TransactionItem type="Expense" description="Groceries" amount={5000} />,
    );

    expect(screen.queryByText("Savings")).not.toBeInTheDocument();
  });

  it("uses the correct color for the type", () => {
    vi.spyOn(UseFormatCurrency, "useFormatCurrency").mockReturnValue("¥10,000");

    render(
      <TransactionItem type="Income" description="Bonus" amount={20000} />,
    );

    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toHaveClass("text-green-500");
  });
});
