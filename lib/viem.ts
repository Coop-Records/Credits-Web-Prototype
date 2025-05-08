import { createPublicClient, http } from "viem";
import { base, baseSepolia } from "viem/chains";
import { IS_PROD } from "./consts";

export const publicClient = createPublicClient({
  chain: IS_PROD ? base : baseSepolia,
  transport: http(),
});
