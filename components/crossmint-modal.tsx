import { CrossmintEmbeddedCheckout } from "@crossmint/client-sdk-react-ui";
import { usePrivy } from "@privy-io/react-auth";

interface CrossmintModalProps {
  onClose: () => void;
}

export default function CrossmintModal({ onClose }: CrossmintModalProps) {
  const { user } = usePrivy();
  const { email } = user ?? { email: null };
  const { address } = user?.wallet ?? { address: null };
  const callData = {
    account: address,
    amount: 1,
    totalPrice: "0.0004",
  };

  const baseSepoliaCollectionId = "54b397c6-0e56-4404-bcda-876a338e29e5";
  const collectionLocator = `crossmint:${baseSepoliaCollectionId}`;

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
