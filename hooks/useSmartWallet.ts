"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";

export function useSmartWallet() {
  const { authenticated, ready, user } = usePrivy();
  const address = user?.wallet?.address;

  const { data: smartWalletAddress } = useQuery({
    queryKey: ["smartWallet", address],
    queryFn: async () => {
      if (!ready || !authenticated || !address) return null;
      const res = await fetch(`/api/wallet?owner=${address}`);
      if (!res.ok) throw new Error("Failed to fetch smart wallet");
      const data = await res.json();
      return data.smartAccounts?.[0]?.address ?? null;
    },
    enabled: !!address && ready && authenticated,
    refetchInterval: 15000,
    placeholderData: null,
  });

  return { smartWalletAddress };
}
