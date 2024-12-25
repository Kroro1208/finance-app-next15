import BaseTrend from "@/components/Trend";

type TrendProps = {
  type: "Incom" | "Expense" | "Saving" | "Investment";
};

const Trend = async ({ type }: TrendProps) => {
  const response = await fetch(`${process.env.API_URL}/trends/${type}`);
  const { amount, prevAmount } = await response.json();
  return <BaseTrend amount={amount} prevAmount={prevAmount} type={"Income"} />;
};

export default Trend;
