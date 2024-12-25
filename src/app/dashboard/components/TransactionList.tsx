import TransactionItem from "@/components/TransactionItem";
import TransactionSummaryItems from "@/components/TransactionSummaryItems";
import { Separator } from "@/components/ui/separator";

export type TransactionData = {
  id: number;
  amount: number;
  type: "Income" | "Expense" | "Investment" | "Saving";
  description: string;
  category: string;
  created_at: string;
};

type GroupTransactions = {
  [date: string]: {
    transactions: TransactionData[];
    amount: number;
  };
};

// 取引を日付でグループ化する
export const groupTransactionsByDate = (
  transactions: TransactionData[]
): GroupTransactions => {
  const grouped: GroupTransactions = {};
  for (const transaction of transactions) {
    const date = transaction.created_at.split("T")[0];

    // その日初めての取引の場合は初期化
    if (!grouped[date]) {
      grouped[date] = { transactions: [], amount: 0 };
    }
    // 2回目以降の取引は配列に追加
    grouped[date].transactions.push(transaction);

    // 合計金額を更新
    const amount =
      transaction.type === "Income" ? transaction.amount : -transaction.amount;
    grouped[date].amount += amount;
  }

  return grouped;
};

const TransactionList = async () => {
  const response = await fetch(`${process.env.API_URL}/transactions`);
  const transactions = await response.json();

  const groupedData = groupTransactionsByDate(transactions);

  return Object.entries(groupedData).map(([date, { transactions, amount }]) => (
    <div key={date}>
      <TransactionSummaryItems date={date} amount={amount} />
      <Separator className="mt-2 mb-2" />
      <section className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id}>
            <TransactionItem {...transaction} />
          </div>
        ))}
      </section>
    </div>
  ));
};

export default TransactionList;
