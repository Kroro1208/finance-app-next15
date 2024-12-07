import { useMemo } from "react";

export const useFormatCurrency = (amount: number): string => {
  return useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "JPY",
    }).format(amount);
  }, [amount]);
};
