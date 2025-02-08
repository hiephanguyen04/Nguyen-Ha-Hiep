const TokenSelect = ({ tokens, selectedToken, onSelect }) => {
  return (
    <select
      className="w-full p-2 border rounded-md bg-gray-100"
      value={selectedToken}
      onChange={(e) => onSelect(e.target.value)}
    >
      {tokens.map((token) => (
        <option key={token.currency} value={token.currency}>
          {token.currency}
        </option>
      ))}
    </select>
  );
};

export default TokenSelect;
