import { creditsAbi } from "@/abi/creditsAbi";
import { cdp } from "@/lib/cdpClient";
import {
  COLLECTION_ADDRESS,
  CREDITS_PROTOCOL_ADDRESS,
  IS_PROD,
} from "@/lib/consts";
import { getOrCreateWallet } from "@/lib/getOrCreateWallet";
import { NextResponse } from "next/server";
import { encodeFunctionData } from "viem";

export async function POST(request: Request) {
  try {
    const { tokenRecipient } = await request.json();

    if (!COLLECTION_ADDRESS || !tokenRecipient) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
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
      return NextResponse.json(
        { error: "Failed to get smart account" },
        { status: 500 }
      );
    }
    const smartAccount = await cdp.evm.getSmartAccount({
      address: smartAccounts[0].address,
      owner: account,
    });
    const sendUserOpts = {
      smartAccount,
      network: IS_PROD ? "base" : "base-sepolia", // supported networks: https://docs.cdp.coinbase.com/api/docs/networks#network-identifiers
      paymasterUrl: process.env.CDP_PAYMASTER_URL,
      calls: [
        {
          to: CREDITS_PROTOCOL_ADDRESS, // Contract factory address
          data: createContractData,
        },
      ],
    } as const;
    console.log("sendUserOpts", sendUserOpts);

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

    return NextResponse.json({
      smartAccountAddress: smartAccount.address,
      transactionHash: userOp.transactionHash,
    });
  } catch (error) {
    console.error("Error in mint endpoint:", error);
    return NextResponse.json(
      { error: "Failed to process mint request" },
      { status: 500 }
    );
  }
}
