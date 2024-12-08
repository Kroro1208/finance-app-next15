import { describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import TransactionSummaryItems from "./TransactionSummaryItems";

vi.mock("@/app/hooks/UseFormatCurrency", () => ({
  useFormatCurrency: vi.fn((amount: number) => `¥${amount.toLocaleString()}`),
}));

describe("TransactionSummaryItems", () => {
  const cases = [
    {
      date: new Date("2024-01-01"),
      amount: 1000,
      expectedDate: "2024/01/01月曜日",
      expectedAmount: "¥1,000",
    },
    {
      date: new Date("2024-12-31"),
      amount: 1000000,
      expectedDate: "2024/12/31火曜日",
      expectedAmount: "¥1,000,000",
    },
    {
      date: new Date("2024-12-08"),
      amount: 0,
      expectedDate: "2024/12/08日曜日",
      expectedAmount: "¥0",
    },
  ];

  it.each(cases)(
    "renders with date $expectedDate and amount $expectedAmount",
    ({ date, amount, expectedDate, expectedAmount }) => {
      render(<TransactionSummaryItems date={date} amount={amount} />);

      const dateElement = screen.getByText(expectedDate);
      const amountElement = screen.getByText(expectedAmount);

      expect(dateElement).toBeInTheDocument();
      expect(amountElement).toBeInTheDocument();

      cleanup();
    },
  );
});
