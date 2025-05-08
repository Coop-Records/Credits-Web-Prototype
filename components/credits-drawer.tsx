"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "./plus-icon";
import { usePrivy } from "@privy-io/react-auth";
import CrossmintModal from "./crossmint-modal";
import { useEthPrice } from "@/hooks/useEthPrice";
import { CreditOptions } from "./credit-options";
import { useSmartWallet } from "@/hooks/useSmartWallet";

export default function CreditsDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [isOpenCrossmint, setIsOpenCrossmint] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const { authenticated, ready, login } = usePrivy();
  const { ethPrice } = useEthPrice();
  const { smartWalletAddress } = useSmartWallet();
  console.log("smartWalletAddress", smartWalletAddress);

  const CROSSMINT_MARKUP = 1.05;
  const creditOptions = [5, 25, 100].map((amount) => ({
    amount,
    price: ethPrice
      ? Math.ceil(0.0004 * ethPrice * amount * CROSSMINT_MARKUP)
      : null,
  }));

  const handlePurchase = (amount: number) => {
    setSelectedQuantity(amount);
    setIsOpenCrossmint(true);
    // In a real app, this would trigger a payment process
    // For demo purposes, we'll just update the balance
    setBalance((prev) => prev + amount);
  };

  const handleOpenChange = (open: boolean) => {
    if (!ready) return;
    if (!authenticated) {
      login();
      return;
    }
    setIsOpen(open);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button
          disabled={!ready}
          variant="outline"
          className="flex items-center gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Top up Credits</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="rounded-t-3xl px-0 max-w-md mx-auto [&>button]:hidden"
      >
        <div className="px-6">
          <SheetHeader className="text-center">
            <h2 className="text-lg font-bold text-gray-800 text-center">
              Top up with Credits
            </h2>
            <div className="flex items-center justify-center gap-2 text-gray-500 mt-4">
              Balance : <PlusIcon className="h-5 w-5" /> {balance}
            </div>
            <p className="text-center mt-6 text-gray-500">
              Each song costs 1 credit.
            </p>
          </SheetHeader>
        </div>
        <CreditOptions
          creditOptions={creditOptions}
          onSelect={handlePurchase}
        />
      </SheetContent>
      {isOpenCrossmint && smartWalletAddress && (
        <CrossmintModal
          onClose={() => {
            setIsOpenCrossmint(false);
          }}
          quantity={selectedQuantity}
          recipient={smartWalletAddress}
        />
      )}
    </Sheet>
  );
}
