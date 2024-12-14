import { useFormatCurrency } from "@/app/hooks/UseFormatCurrency";
type TransactionSummaryProps = {
  date: string;
  amount: number;
};
const TransactionSummaryItems = ({ date, amount }: TransactionSummaryProps) => {
  const formattedAmount = useFormatCurrency(amount);

  return (
    <div className="flex text-gray-500 dark:text-gray-400 font-semibold items-center justify-center mt-5">
      <div className="grow mt-3">{date}</div>
      <div className="min-w-[70px] text-right font-semibold text-green-500">
        {formattedAmount}
      </div>
      <div className="min-w-[50px]" />
    </div>
  );
};

export default TransactionSummaryItems;
