"use client";

import CreditsDrawer from "@/components/credits-drawer";
import { SongPurchaseButton } from "@/components/song-purchase-button";
import LoginButton from "@/components/login-button";
import { useWalletContext } from "@/providers/WalletProvider";
import { useBalance } from "@/hooks/useBalance";

export default function Home() {
  const { smartWalletAddress } = useWalletContext();
  const { data: balance, isPending: isBalanceLoading } =
    useBalance(smartWalletAddress);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md p-0 bg-white rounded-2xl shadow-md">
        {/* Card Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-2xl font-bold">Coop Credits</h1>
          <LoginButton />
        </div>
        {/* Card Body */}
        <div className="px-6 py-8 flex flex-col gap-6">
          <p className="text-gray-500 text-center text-base">
            Purchase credits to listen to your favorite songs.
          </p>
          {!!balance && <SongPurchaseButton />}
          <div className="flex justify-center mt-2">
            <CreditsDrawer
              balance={balance ?? 0}
              isBalanceLoading={isBalanceLoading}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
