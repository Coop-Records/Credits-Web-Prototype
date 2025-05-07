import { useState, useEffect } from "react";

export function useEthPrice() {
  const [ethPrice, setEthPrice] = useState<number | null>(null);

  useEffect(() => {
    async function fetchEthPrice() {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );
        const data = await res.json();
        setEthPrice(data.ethereum.usd);
      } catch (e) {
        setEthPrice(null);
      }
    }
    fetchEthPrice();
  }, []);

  return { ethPrice };
}
