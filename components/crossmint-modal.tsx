import { CrossmintEmbeddedCheckout } from "@crossmint/client-sdk-react-ui";
import { usePrivy } from "@privy-io/react-auth";

interface CrossmintModalProps {
  onClose: () => void;
  quantity: number;
}

export default function CrossmintModal({
  onClose,
  quantity,
}: CrossmintModalProps) {
  const { user } = usePrivy();
  const { email } = user ?? { email: null };
  const { address } = user?.wallet ?? { address: null };
  const collectionLocator = `crossmint:${process.env.NEXT_PUBLIC_CROSSMINT_COLLECTION_ID}`;
  const callData = {
    account: address,
    amount: quantity,
    totalPrice: (0.0004 * quantity).toString(),
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {collectionLocator && callData && (address || email) && (
          <CrossmintEmbeddedCheckout
            lineItems={{
              collectionLocator,
              callData,
            }}
            payment={{
              crypto: { enabled: false },
              fiat: { enabled: true },
            }}
            recipient={
              address
                ? { walletAddress: address }
                : { email: email?.address ?? "" }
            }
          />
        )}
      </div>
    </div>
  );
}
