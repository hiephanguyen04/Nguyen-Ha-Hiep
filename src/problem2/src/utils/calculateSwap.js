export const calculateSwap = (amount, fromToken, toToken, tokens) => {
  const fromPrice = tokens.find((t) => t.currency === fromToken)?.price || 0;
  const toPrice = tokens.find((t) => t.currency === toToken)?.price || 0;
  return fromPrice && toPrice ? (amount * fromPrice) / toPrice : 0;
};
