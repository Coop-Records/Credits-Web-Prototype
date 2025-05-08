import { useQuery } from "@tanstack/react-query";
import { publicClient } from "@/lib/viem";
import { CREDITS_PROTOCOL_ADDRESS } from "@/lib/consts";
import { creditsAbi } from "@/abi/creditsAbi";
import { Address } from "viem";

export function useBalance(address?: Address) {
  return useQuery({
    queryKey: ["balance", address],
    queryFn: async () => {
      if (!address) return 0;
      const balance = await publicClient.readContract({
        address: CREDITS_PROTOCOL_ADDRESS as `0x${string}`,
        abi: creditsAbi,
        functionName: "balanceOf",
        args: [address, BigInt(1)],
      });
      return Number(balance);
    },
    enabled: !!address,
    refetchInterval: 15000,
    placeholderData: 0,
  });
}
