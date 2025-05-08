import dynamic from "next/dynamic";
import SkeletonCrossmint from "./skeleton-crossmint";

const CrossmintEmbeddedCheckout = dynamic(
  () =>
    import("@crossmint/client-sdk-react-ui").then(
      (mod) => mod.CrossmintEmbeddedCheckout
    ),
  {
    ssr: false,
    loading: () => <SkeletonCrossmint />,
  }
);

interface CrossmintModalProps {
  onClose: () => void;
  quantity: number;
  recipient: string; // address
}

export default function CrossmintModal({
  onClose,
  quantity,
  recipient,
}: CrossmintModalProps) {
  const collectionLocator = `crossmint:${process.env.NEXT_PUBLIC_CROSSMINT_COLLECTION_ID}`;
  const callData = {
    account: recipient,
    amount: quantity,
    totalPrice: (0.0004 * quantity).toString(),
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-lg relative min-w-[320px] min-h-[320px] flex flex-col items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {collectionLocator && callData && recipient && (
          <CrossmintEmbeddedCheckout
            lineItems={{
              collectionLocator,
              callData,
            }}
            payment={{
              crypto: { enabled: false },
              fiat: { enabled: true },
            }}
            recipient={{ walletAddress: recipient }}
          />
        )}
      </div>
    </div>
  );
}
