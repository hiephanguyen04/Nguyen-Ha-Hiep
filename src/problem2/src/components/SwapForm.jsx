import { useEffect, useState } from "react";
import useTokenData from "../hooks/useTokenData";
import { calculateSwap } from "../utils/calculateSwap";
import Button from "./Button";
import InputField from "./InputField";
import { SwapButton } from "./SwapButton";
import TokenSelect from "./TokenSelect";

const TOKEN_IMAGE_BASE =
  "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens";

const SwapForm = () => {
  const { tokens, error } = useTokenData();
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDC");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setConvertedAmount(null);
  }, [amount, fromToken, toToken]);

  const handleConvert = () => {
    if (!amount || amount <= 0) {
      setErrorMessage("Vui lòng nhập số lượng hợp lệ.");
      return;
    }
    setLoading(true);
    setErrorMessage("");
    setTimeout(() => {
      setLoading(false);
      setConvertedAmount(calculateSwap(amount, fromToken, toToken, tokens));
    }, 1500);
  };

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">
        Currency Converter
      </h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex items-center gap-8">
        <div className="mb-4 relative">
          <label className="block mb-1 text-sm font-medium">From</label>
          <div className="flex items-center border p-2 rounded-md bg-gray-100">
            <img
              src={`${TOKEN_IMAGE_BASE}/${fromToken}.svg`}
              alt={fromToken}
              className="w-6 h-6 mr-2"
            />
            <TokenSelect
              tokens={tokens}
              selectedToken={fromToken}
              onSelect={setFromToken}
            />
          </div>
        </div>

        <SwapButton onClick={handleSwapTokens} />

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">To</label>
          <div className="flex items-center border p-2 rounded-md bg-gray-100">
            <img
              src={`${TOKEN_IMAGE_BASE}/${toToken}.svg`}
              alt={toToken}
              className="w-6 h-6 mr-2"
            />
            <TokenSelect
              tokens={tokens}
              selectedToken={toToken}
              onSelect={setToToken}
            />
          </div>
        </div>
      </div>
      <InputField
        label="Amount"
        value={amount}
        onChange={setAmount}
        error={errorMessage}
      />

      {!!convertedAmount && (
        <p className="text-gray-600 text-sm mb-4">
          Converted: <strong>{convertedAmount.toFixed(4)}</strong> {toToken}
        </p>
      )}

      <Button onClick={handleConvert} loading={loading}>
        Convert
      </Button>
    </div>
  );
};

export default SwapForm;
