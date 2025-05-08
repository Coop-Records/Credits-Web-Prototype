import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

export function useSmartWallet() {
  const { authenticated, ready, user } = usePrivy();
  const [smartWalletAddress, setSmartWalletAddress] = useState<any>(null);

  useEffect(() => {
    const fetchWallet = async () => {
      if (ready && authenticated && user?.wallet?.address) {
        try {
          const res = await fetch(`/api/wallet?owner=${user.wallet.address}`);
          if (res.ok) {
            const data = await res.json();
            setSmartWalletAddress(data.smartAccounts?.[0]?.address);
          }
        } catch (err) {
          console.error((err as Error).message);
        }
      }
    };
    fetchWallet();
  }, [ready, authenticated, user?.wallet?.address]);

  return { smartWalletAddress };
}
