import TransactionItem from "./TransactionItem";
import TransactionSummaryItems from "./TransactionSummaryItems";
import { Separator } from "./ui/separator";

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
  transactions: TransactionData[],
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
// 下記のようなgroupedオブジェクトを返す
// {
//     "2023-03-15": {
//       transactions: [
//         // その日の全ての取引データ
//         {id: 1, amount: 100, type: "Expense", ...},
//         {id: 2, amount: 159, type: "Expense", ...},
//         {id: 3, amount: 500, type: "Income", ...}
//       ],
//       amount: 241  // 収入500 - 支出(100 + 159) = 241
//     }
//   }

const TransactionList = async () => {
  const response = await fetch("http://localhost:3001/transactions");
  const transactions = await response.json();

  const groupedData = groupTransactionsByDate(transactions);

  return Object.entries(groupedData).map(([date, { transactions, amount }]) => (
    <div key={date}>
      <TransactionSummaryItems date={date} amount={amount} />
      <Separator />
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
