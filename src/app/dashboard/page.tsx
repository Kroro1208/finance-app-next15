import Trend from "@/components/Trend";
import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense } from "react";
import TransactionList from "./components/TransactionList";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <>
      <section className="mb-8">
        <h1 className="text-4xl font-semibold">Summary</h1>
      </section>
      <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <Trend type="Income" amount={0} />
        <Trend type="Expense" amount={0} />
        <Trend type="Saving" amount={0} />
        <Trend type="Investment" amount={0} />
      </section>
      <section className="flex justify-between items-center mb-8">
        <h2 className="text-2xl">Transactions</h2>
        <Link href="/dashboard/transaction/add" className="flex items-center">
          <Button variant="outline" className="hover:bg-green-500">
            <PlusCircle className="w-4 h-4" />
            追加
          </Button>
        </Link>
      </section>
      <Suspense fallback={<Skeleton />}>
        <TransactionList />
      </Suspense>
    </>
  );
};

export default Page;
