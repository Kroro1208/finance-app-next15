import type { Metadata } from "next";
import TransactionForm from "../../components/TransactionForm";
export const metadata: Metadata = {
  title: "Add Transaction",
  description: "新しい取引を追加する",
};

const page = () => {
  return (
    <div className="text-4xl font-semibold mb-8">
      Add Transaction
      <TransactionForm />
    </div>
  );
};

export default page;
