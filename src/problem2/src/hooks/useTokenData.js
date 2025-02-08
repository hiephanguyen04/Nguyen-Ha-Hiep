import { useState, useEffect } from "react";

const API_URL = "https://interview.switcheo.com/prices.json";

const useTokenData = () => {
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const uniqueTokens = Array.from(
          new Map(data.map((item) => [item.currency, item])).values()
        );
        setTokens(uniqueTokens);
      })
      .catch(() => setError("Không thể tải danh sách token."));
  }, []);

  return { tokens, error };
};

export default useTokenData;
