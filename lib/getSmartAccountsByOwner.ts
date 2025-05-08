import { cdp } from "./cdpClient";

export async function getSmartAccountsByOwner(address: string) {
  const smartAccounts = await cdp.evm.listSmartAccounts();
  return (smartAccounts.accounts || []).filter((sa: any) =>
    (sa.owners || []).some(
      (o: string) => o.toLowerCase() === address.toLowerCase()
    )
  );
}
