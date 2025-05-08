"use client";

import { CrossmintProvider } from "./CrossmintProvider";
import PrivyProvider from "./PrivyProvider";
import { WalletProvider } from "./WalletProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CrossmintProvider>
      <PrivyProvider>
        <WalletProvider>{children}</WalletProvider>
      </PrivyProvider>
    </CrossmintProvider>
  );
};

export default Providers;
