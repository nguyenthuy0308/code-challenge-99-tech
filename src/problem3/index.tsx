// Define blockchain priorities as a constant to avoid recreating the object on every render
// Use record to define the object would be more efficient and ensure type safety,
// prevent typos and invalid keys at compile time
// would be better for refactor later
const BLOCKCHAIN_PRIORITIES: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

// Both WalletBalance and FormattedWalletBalance have the same properties,
// so we can use a base interface to avoid code duplication
interface WalletBase {
    currency: string;
    amount: number;
}

// This interface seem not fully defined, as the function sortedBalances bellow
// the WalletBalance has to contain the blockchain property also.
interface WalletBalance extends WalletBase {
  blockchain: string;
}

// Use extends to define the FormattedWalletBalance interface intead of using interface to define again the same 2 properties
interface FormattedWalletBalance extends WalletBase {
  formatted: string;
}


// Define children props for react component
interface Props extends BoxProps {
    children?: React.ReactNode;
}



const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Memoized priority getter to avoid recreating function on every render
  const getPriority = useCallback((blockchain: string): number => {
    return BLOCKCHAIN_PRIORITIES[blockchain] ?? -99;
  }, []);

  // Combined filtering and sorting into a single useMemo
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const priority = getPriority(balance.blockchain);
        return priority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority; // Simplified sort comparison
      });
  }, [balances, getPriority]);

  // Memoized formatted balances to prevent unnecessary recalculations
  const formattedBalances = useMemo(() => 
    sortedBalances.map((balance: WalletBalance) => ({
      ...balance,
      formatted: balance.amount.toFixed(0)
    }))
  , [sortedBalances]);

  // Memoized rows to prevent unnecessary re-renders
  const rows = useMemo(() => 
    formattedBalances.map((balance: FormattedWalletBalance) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow 
          className={classes.row}
        //   key should be unique and should not be an index,because the index is not stable, and react could not realize which items have changed/added/removed, if key props change,react will treat the item as a new one if its content remains the same
          key={`${balance.currency}-${balance.amount}`}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    })
  , [formattedBalances, prices]);

  return (
    <div {...rest}>
      {rows}
    </div>
  );
};