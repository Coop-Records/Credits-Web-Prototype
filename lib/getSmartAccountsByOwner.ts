import { cdp } from "./cdpClient";

interface SmartAccount {
  address: string;
  owners: string[];
  [key: string]: unknown;
}

export async function getSmartAccountsByOwner(address: string) {
  const smartAccounts = await cdp.evm.listSmartAccounts();
  return (smartAccounts.accounts || []).filter((sa) =>
    ((sa as unknown as SmartAccount).owners || []).some(
      (o: string) => o.toLowerCase() === address.toLowerCase()
    )
  );
}
