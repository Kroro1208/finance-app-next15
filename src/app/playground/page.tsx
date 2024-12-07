import PageHeader from "@/components/PageHeader";
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
      <div>
        <h2 className="mb-4 text-lg font-mono">Trend</h2>
        <hr className="mb-4 border-gray-200 dark:border-gray-800" />
        <div className="flex space-x-4">
          <Trend type="Income" amount={10000} />
          <Trend type="Expense" amount={1200} />
          <Trend type="Investment" amount={5000} />
          <Trend type="Saving" amount={3000} />
        </div>
      </div>
    </main>
  );
};

export default PlayGround;
