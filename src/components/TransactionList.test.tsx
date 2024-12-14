import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { TransactionData } from "./TransactionList";
import TransactionList, { groupTransactionsByDate } from "./TransactionList";

// モックデータ
const mockTransactions: TransactionData[] = [
  {
    id: 1,
    amount: 1000,
    type: "Income",
    description: "給料",
    category: "収入",
    created_at: "2024-03-15T10:00:00.000Z",
  },
  {
    id: 2,
    amount: 500,
    type: "Expense",
    description: "食費",
    category: "生活費",
    created_at: "2024-03-15T15:30:00.000Z",
  },
  {
    id: 3,
    amount: 300,
    type: "Expense",
    description: "交通費",
    category: "交通",
    created_at: "2024-03-16T09:00:00.000Z",
  },
];

// コンポーネントのモック
vi.mock("./TransactionItem", () => ({
  default: ({
    amount,
    type,
    description,
  }: {
    amount: number;
    type: string;
    description: string;
  }) => (
    <div data-testid="transaction-item">
      {`${type}: ${amount}円 - ${description}`}
    </div>
  ),
}));

vi.mock("./TransactionSummaryItems", () => ({
  default: ({ date, amount }: { date: string; amount: number }) => (
    <div data-testid="summary-item">{`${date}: ${amount}円`}</div>
  ),
}));

// fetchのモック
global.fetch = vi.fn();

describe("TransactionList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("取引データを正しく取得してグループ化できること", async () => {
    // fetchのモックを設定
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockTransactions),
    });

    render(await TransactionList());

    // サマリーアイテムが正しく表示されることを確認
    const summaryItems = screen.getAllByTestId("summary-item");
    expect(summaryItems).toHaveLength(2); // 2日分のデータ
    expect(summaryItems[0].textContent).toContain("2024-03-15: 500円"); // 収入1000 - 支出500
    expect(summaryItems[1].textContent).toContain("2024-03-16: -300円"); // 支出300

    // 取引アイテムが正しく表示されることを確認
    const transactionItems = screen.getAllByTestId("transaction-item");
    expect(transactionItems).toHaveLength(3); // 全3件の取引
    expect(transactionItems[0].textContent).toContain("Income: 1000円");
    expect(transactionItems[1].textContent).toContain("Expense: 500円");
    expect(transactionItems[2].textContent).toContain("Expense: 300円");
  });

  it("APIエラー時にエラーがスローされること", async () => {
    // fetchのモックでエラーを設定
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    await expect(TransactionList()).rejects.toThrow("API Error");
  });
});

describe("groupTransactionsByDate", () => {
  it("取引を日付で正しくグループ化できること", () => {
    const result = groupTransactionsByDate(mockTransactions);

    // 2024-03-15のグループ
    expect(result["2024-03-15"].transactions).toHaveLength(2);
    expect(result["2024-03-15"].amount).toBe(500); // 収入1000 - 支出500

    // 2024-03-16のグループ
    expect(result["2024-03-16"].transactions).toHaveLength(1);
    expect(result["2024-03-16"].amount).toBe(-300); // 支出300
  });

  it("空の配列を渡した場合に空のオブジェクトを返すこと", () => {
    const result = groupTransactionsByDate([]);
    expect(Object.keys(result)).toHaveLength(0);
  });
});
