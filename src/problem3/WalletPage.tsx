interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: BlockchainType;
}

type BlockchainType = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";

interface Props extends BoxProps {}

// Define blockchain priority mapping for O(1) lookup
const BLOCKCHAIN_PRIORITY: Record<BlockchainType, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

// Memoized function for retrieving blockchain priority
const getPriority = (blockchain: BlockchainType): number =>
  BLOCKCHAIN_PRIORITY[blockchain] ?? -99;

const WalletPage: React.FC<Props> = (props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter(
        ({ amount, blockchain }) => getPriority(blockchain) > -99 && amount > 0
      )
      .map((balance) => ({
        ...balance,
        priority: getPriority(balance.blockchain),
      }))
      .sort((a, b) => b.priority - a.priority);
  }, [balances]);

  return (
    <div {...rest}>
      {sortedBalances.map(({ currency, amount, blockchain }) => (
        <WalletRow
          key={currency} // Use stable key
          amount={amount}
          usdValue={prices[currency] * amount}
          formattedAmount={amount.toFixed(2)}
        />
      ))}
    </div>
  );
};

export default WalletPage;
