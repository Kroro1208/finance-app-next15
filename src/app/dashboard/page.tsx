import Trend from "@/components/Trend";
import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense } from "react";
import TransactionList from "./components/TransactionList";

const Page = () => {
  return (
    <>
      <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <Trend type="Income" amount={0} />
        <Trend type="Expense" amount={0} />
        <Trend type="Saving" amount={0} />
        <Trend type="Investment" amount={0} />
      </section>
      <Suspense fallback={<Skeleton />}>
        <TransactionList />
      </Suspense>
    </>
  );
};

export default Page;
