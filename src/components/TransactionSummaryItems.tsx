import { useFormatCurrency } from "@/app/hooks/UseFormatCurrency";
type TransactionSummaryProps = {
  date: Date;
  amount: number;
};
const TransactionSummaryItems = ({ date, amount }: TransactionSummaryProps) => {
  const formattedAmount = useFormatCurrency(amount);
  const formattedDate = date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  });

  return (
    <div className="flex text-gray-500 dark:text-gray-400 font-semibold">
      <div className="grow">{formattedDate}</div>
      <div className="min-w-[70px] text-right font-semibold text-green-500">
        {formattedAmount}
      </div>
      <div className="min-w-[50px]" />
    </div>
  );
};

export default TransactionSummaryItems;
