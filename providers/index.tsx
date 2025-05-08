"use client";

import { CrossmintProvider } from "./CrossmintProvider";
import PrivyProvider from "./PrivyProvider";
import { WalletProvider } from "./WalletProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CrossmintProvider>
        <PrivyProvider>
          <WalletProvider>{children}</WalletProvider>
        </PrivyProvider>
      </CrossmintProvider>
    </QueryClientProvider>
  );
};

export default Providers;
