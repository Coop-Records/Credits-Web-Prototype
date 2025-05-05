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

interface CreditOption {
  amount: number;
  price: number;
}

export default function CreditsDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState(0);

  const creditOptions: CreditOption[] = [
    { amount: 5, price: 1.44 },
    { amount: 25, price: 4.52 },
    { amount: 100, price: 16.08 },
  ];

  const handlePurchase = (amount: number) => {
    // In a real app, this would trigger a payment process
    // For demo purposes, we'll just update the balance
    setBalance((prev) => prev + amount);
    // Close the drawer after purchase (optional)
    // setIsOpen(false)
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
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
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Top up with Credits
            </h2>
            <div className="flex items-center justify-center gap-2 text-gray-500 mt-4">
              Balance : <PlusIcon className="h-5 w-5" /> {balance}
            </div>
            <p className="text-center mt-6 text-2xl font-normal text-gray-500">
              Each song costs 1 credit.
            </p>
          </SheetHeader>
        </div>

        <div className="px-6 space-y-4">
          {creditOptions.map((option) => (
            <button
              key={option.amount}
              onClick={() => handlePurchase(option.amount)}
              className="w-full bg-gray-100 hover:bg-gray-200 hover:scale-[1.02] transition-all duration-200 rounded-lg py-4 px-6 flex items-center justify-between"
            >
              <div className="flex items-center">
                <PlusIcon className="h-6 w-6 mr-2" />
                <span className="text-lg text-gray-500">{option.amount}</span>
              </div>
              <span className="text-lg text-gray-500">
                ${option.price.toFixed(2)}
              </span>
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
