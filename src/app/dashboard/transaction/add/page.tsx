import type { Metadata } from "next";
import TransactionForm from "../../components/TransactionForm";
export const metadata: Metadata = {
  title: "Add Transaction",
  description: "新しい取引を追加する",
};

const Page = () => {
  return (
    <div className="text-4xl font-semibold mb-8">
      <TransactionForm />
    </div>
  );
};

export default Page;
