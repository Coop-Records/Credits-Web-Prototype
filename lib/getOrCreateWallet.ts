import { cdp } from "./cdpClient";
import { getSmartAccountsByOwner } from "./getSmartAccountsByOwner";

export async function getOrCreateWallet(owner: string) {
  if (!owner) throw new Error("Missing owner parameter");
  let cleanOwner = owner.startsWith("0x") ? owner.slice(2) : owner;
  if (cleanOwner.length > 36) {
    cleanOwner = cleanOwner.slice(-36);
  }
  const name = cleanOwner;

  try {
    const account = await cdp.evm.getAccount({ name });
    const filteredSmartAccounts = await getSmartAccountsByOwner(
      account.address
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
