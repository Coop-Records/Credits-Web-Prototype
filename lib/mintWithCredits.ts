import { creditsAbi } from "@/abi/creditsAbi";
import { cdp } from "@/lib/cdpClient";
import {
  COLLECTION_ADDRESS,
  CREDITS_PROTOCOL_ADDRESS,
  IS_PROD,
} from "@/lib/consts";
import { getOrCreateWallet } from "@/lib/getOrCreateWallet";
import { Address, encodeFunctionData } from "viem";

export async function mintWithCredits(tokenRecipient: Address) {
  if (!COLLECTION_ADDRESS || !tokenRecipient) {
    throw new Error("Missing required parameters");
  }

  // Encode the function call data
  const createContractData = encodeFunctionData({
    abi: creditsAbi,
    functionName: "mintWithCredits",
    args: [
      COLLECTION_ADDRESS,
      BigInt(1), // tokenId
      BigInt(1), // tokenQuantity
      tokenRecipient,
      tokenRecipient,
    ],
  });

  // Send the transaction
  const { account, smartAccounts } = await getOrCreateWallet(tokenRecipient);
  if (!account || !smartAccounts) {
    throw new Error("Failed to get smart account");
  }
  const smartAccount = await cdp.evm.getSmartAccount({
    address: smartAccounts[0].address,
    owner: account,
  });
  const sendUserOpts = {
    smartAccount,
    network: IS_PROD ? "base" : "base-sepolia",
    paymasterUrl: process.env.CDP_PAYMASTER_URL,
    calls: [
      {
        to: CREDITS_PROTOCOL_ADDRESS,
        data: createContractData,
      },
    ],
  } as const;

  const sendResult = await cdp.evm.sendUserOperation(sendUserOpts);

  // Wait for the transaction to be mined
  await cdp.evm.waitForUserOperation({
    smartAccountAddress: smartAccount.address,
    userOpHash: sendResult.userOpHash,
  });

  // Get the transaction details
  const userOp = await cdp.evm.getUserOperation({
    smartAccount,
    userOpHash: sendResult.userOpHash,
  });

  return {
    smartAccountAddress: smartAccount.address,
    transactionHash: userOp.transactionHash,
  };
}
