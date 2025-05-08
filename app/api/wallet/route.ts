import { NextRequest, NextResponse } from "next/server";
import { CdpClient } from "@coinbase/cdp-sdk";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const owner = searchParams.get("owner");
  if (!owner) {
    return NextResponse.json(
      { error: "Missing owner parameter" },
      { status: 400 }
    );
  }

  try {
    const cdp = new CdpClient();
    let cleanOwner = owner.startsWith("0x") ? owner.slice(2) : owner;
    // Truncate to the final 36 characters
    if (cleanOwner.length > 36) {
      cleanOwner = cleanOwner.slice(-36);
    }
    const name = cleanOwner;
    try {
      const account = await cdp.evm.getAccount({
        name,
      });
      const smartAccounts = await cdp.evm.listSmartAccounts();
      // Filter smart accounts where owners includes account.address (case-insensitive)
      const filteredSmartAccounts = (smartAccounts.accounts || []).filter(
        (sa: any) =>
          (sa.owners || []).some(
            (o: string) => o.toLowerCase() === account.address.toLowerCase()
          )
      );
      return NextResponse.json({
        owner,
        account,
        smartAccounts: filteredSmartAccounts,
      });
    } catch (error) {
      const evmAccount = await cdp.evm.createAccount({ name });
      const smartAccount = await cdp.evm.createSmartAccount({
        owner: evmAccount,
      });

      return NextResponse.json({
        owner,
        evmAccount,
        smartAccounts: [smartAccount],
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
