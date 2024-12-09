import TransactionItem from "./TransactionItem";

type TransactionData = {
  id: number;
  amount: number;
  type: "Income" | "Expense" | "Investment" | "Saving";
  description: string;
  category: string;
  created_at: string;
};

const TransactionList = async () => {
  const response = await fetch("http://localhost:3001/transactions");
  const transactions = await response.json();
  return (
    <section className="space-y-4">
      {transactions.map((transaction: TransactionData) => (
        <div key={transaction.id}>
          <TransactionItem
            type={transaction.type}
            amount={transaction.amount}
            description={transaction.description}
          />
        </div>
      ))}
    </section>
  );
};

export default TransactionList;
