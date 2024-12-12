import { describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import TransactionSummaryItems from "./TransactionSummaryItems";

vi.mock("@/app/hooks/UseFormatCurrency", () => ({
  useFormatCurrency: vi.fn((amount: number) => `¥${amount.toLocaleString()}`),
}));

describe("TransactionSummaryItems", () => {
  const cases = [
    {
      date: "2024-01-01",
      amount: 1000,
      expectedAmount: "¥1,000",
    },
    {
      date: "2024-12-31",
      amount: 1000000,
      expectedAmount: "¥1,000,000",
    },
    {
      date: "2024-12-08",
      amount: 0,
      expectedAmount: "¥0",
    },
  ];

  afterEach(() => {
    cleanup();
  });

  it.each(cases)(
    "renders with date $date and amount $expectedAmount",
    ({ date, amount, expectedAmount }) => {
      render(<TransactionSummaryItems date={date} amount={amount} />);

      const dateElement = screen.getByText(date);
      const amountElement = screen.getByText(expectedAmount);

      expect(dateElement).toBeInTheDocument();
      expect(amountElement).toBeInTheDocument();
    },
  );
});
