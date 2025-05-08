import { CdpClient } from "@coinbase/cdp-sdk";

export async function getOrCreateWallet(owner: string) {
  if (!owner) throw new Error("Missing owner parameter");
  const cdp = new CdpClient();
  let cleanOwner = owner.startsWith("0x") ? owner.slice(2) : owner;
  if (cleanOwner.length > 36) {
    cleanOwner = cleanOwner.slice(-36);
  }
  const name = cleanOwner;

  try {
    const account = await cdp.evm.getAccount({ name });
    const smartAccounts = await cdp.evm.listSmartAccounts();
    // Filter smart accounts where owners includes account.address (case-insensitive)
    const filteredSmartAccounts = (smartAccounts.accounts || []).filter(
      (sa: any) =>
        (sa.owners || []).some(
          (o: string) => o.toLowerCase() === account.address.toLowerCase()
        )
    );
    return { owner, account, smartAccounts: filteredSmartAccounts };
  } catch (error) {
    const evmAccount = await cdp.evm.createAccount({ name });
    const smartAccount = await cdp.evm.createSmartAccount({
      owner: evmAccount,
    });
    return { owner, evmAccount, smartAccounts: [smartAccount] };
  }
}
