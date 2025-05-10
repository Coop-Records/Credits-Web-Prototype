"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

export function SongPurchaseButton() {
  const [isLoading, setIsLoading] = useState(false);
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
      console.log("Song purchased successfully!", data);
    } catch (error) {
      console.error("Error purchasing song:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePurchase}
      disabled={isLoading || !tokenRecipient}
      className="w-full"
    >
      {isLoading ? "Purchasing..." : "Purchase Song"}
    </Button>
  );
}
