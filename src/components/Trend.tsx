import { useFormatCurrency } from "@/app/hooks/UseFormatCurrency";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useCallback, useMemo } from "react";

type TrendProps = {
  type: "Income" | "Expense" | "Investment" | "Saving";
  amount: number;
  prevAmount?: number;
};

const Trend: React.FC<TrendProps> = ({ type, amount, prevAmount }) => {
  const colorClasses: Record<TrendProps["type"], string> = {
    Income: "text-green-700 dark:text-green-300",
    Expense: "text-red-700 dark:text-red-300",
    Investment: "text-indigo-700 dark:text-indigo-300",
    Saving: "text-yellow-700 dark:text-yellow-300",
  };

  // 差分の変化率を計算
  const calcPercentageChange = useCallback(
    (amount: number, prevAmount: number | undefined): number => {
      if (!prevAmount || prevAmount === 0) return 0;
      return ((amount - prevAmount) / prevAmount) * 100;
    },
    []
  );

  const percentageChange = useMemo(
    () => calcPercentageChange(amount, prevAmount),
    [amount, prevAmount, calcPercentageChange]
  );

  const formattedCurrency = useFormatCurrency(amount);

  return (
    <div className="flex flex-col">
      <div className={`${colorClasses[type]} font-semibold`}>{type}</div>
      <div className="text-2xl font-semibold text-black dark:text-white mb-2">
        {formattedCurrency}
      </div>
      <div className="text-xs flex space-x-1 items-center">
        {percentageChange < 0 && (
          <ArrowDownLeft
            className="text-red-500"
            size={20}
            data-testid="arrow-down"
          />
        )}
        {percentageChange > 0 && (
          <ArrowUpRight
            className="text-green-500"
            size={20}
            data-testid="arrow-up"
          />
        )}
        <div>{percentageChange}%</div>
      </div>
    </div>
  );
};

export default Trend;
