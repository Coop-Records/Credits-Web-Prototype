"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { toast } from "sonner";
import { SongMetadata } from "./song-metadata";
import { useMetadata } from "@/hooks/useMetadata";

export function SongPurchaseButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: metadata } = useMetadata();
  const { user } = usePrivy();
  const tokenRecipient = user?.wallet?.address;

  const handlePurchase = async () => {
    if (!tokenRecipient) return;

    try {
      setIsLoading(true);
      const response = await fetch("/api/mint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokenRecipient,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to purchase song");
      }
      const data = await response.json();
      if (data.transactionHash) {
        toast(`${metadata?.name} purchased for 1 credit.`, {
          action: {
            label: "View Transaction",
            onClick: () =>
              window.open(
                `https://sepolia.basescan.org/tx/${data.transactionHash}`,
                "_blank"
              ),
          },
        });
      }
    } catch (error) {
      console.error("Error purchasing song:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <SongMetadata metadata={metadata} />
      <Button
        onClick={handlePurchase}
        disabled={isLoading || !tokenRecipient}
        className="w-full"
      >
        {isLoading ? "Purchasing..." : "Purchase Song"}
      </Button>
    </div>
  );
}
