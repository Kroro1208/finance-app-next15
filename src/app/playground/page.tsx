import PageHeader from "@/components/PageHeader";
import TransactionItem from "@/components/TransactionItem";
import Trend from "@/components/Trend";
import type { NextPage } from "next";

const PlayGround: NextPage = () => {
  return (
    <main className="space-y-8">
      <h1 className="text-4xl mt-8">Playground</h1>
      <div>
        <h2 className="mb-4 text-lg font-mono">Page Header</h2>
        <hr className="mb-4 border-gray-200 dark:border-gray-800" />
        <PageHeader className="mt-8" />
      </div>
      {/* Trend */}
      <div>
        <h2 className="mb-4 text-lg font-mono">Trend</h2>
        <hr className="mb-4 border-gray-200 dark:border-gray-800" />
        <div className="flex space-x-4">
          <Trend type="Income" amount={10000} prevAmount={5000} />
          <Trend type="Expense" amount={1200} prevAmount={1000} />
          <Trend type="Investment" amount={5000} prevAmount={1000} />
          <Trend type="Saving" amount={3000} prevAmount={5000} />
        </div>
      </div>
      {/* Transaction Item */}
      <div>
        <h2 className="mb-4 text-lg font-mono">Transaction Item</h2>
        <hr className="mb-4 border-gray-200 dark:border-gray-800" />
        <div className="space-y-4">
          <TransactionItem
            type="Income"
            amount={10000}
            description="給料"
            category="salary"
          />
          <TransactionItem
            type="Expense"
            amount={1200}
            description="外食"
            category="food"
          />
          <TransactionItem
            type="Investment"
            amount={5000}
            description="iDeco"
            category="ivest"
          />
          <TransactionItem
            type="Saving"
            amount={3000}
            description="養育費"
            category="save"
          />
        </div>
      </div>
    </main>
  );
};

export default PlayGround;
