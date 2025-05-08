import React, { createContext, useContext, ReactNode } from "react";
import { useSmartWallet } from "@/hooks/useSmartWallet";

const WalletContext = createContext<
  ReturnType<typeof useSmartWallet> | undefined
>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const wallet = useSmartWallet();
  return (
    <WalletContext.Provider value={wallet}>{children}</WalletContext.Provider>
  );
}

export function useWalletContext() {
  const ctx = useContext(WalletContext);
  if (!ctx)
    throw new Error("useWalletContext must be used within a WalletProvider");
  return ctx;
}
