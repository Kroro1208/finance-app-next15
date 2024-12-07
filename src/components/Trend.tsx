
type TrendProps = {
    type: "Income" | "Expense" | "Investment" | "Saving";
    amount: number;
    prevAmount?: number
}

const Trend: React.FC<TrendProps> = ({type, amount}) => {
    const colorClasses: Record<TrendProps["type"], string> = {
        'Income': 'text-green-700 dark:text-green-300',
        'Expense': 'text-red-700 dark:text-red-300',
        'Investment': 'text-indigo-700 dark:text-indigo-300',
        'Saving': 'text-yellow-700 dark:text-yellow-300'
    }
    const calcPercentageChange = (amount: number, prevAmount: number | undefined): number => {
        if( !prevAmount || prevAmount === 0) return 0;
        return ((amount - prevAmount) / prevAmount) * 100
    }
    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'JPY'}).format(amount)
    }
    return (
      <div className="flex flex-col">
          <div className={`${colorClasses[type]} font-semibold`}>
          {type}
          </div>
          <div className="text-2xl font-semibold text-black dark:text-white mb-2">
              {amount ? formatCurrency(amount) : formatCurrency(0)}
          </div>
      </div>
    )

}

export default Trend
