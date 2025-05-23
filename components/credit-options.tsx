import { PlusIcon } from "./plus-icon";

interface CreditOption {
  amount: number;
  price: number | null;
}

interface CreditOptionsProps {
  creditOptions: CreditOption[];
  onSelect: (amount: number) => void;
}

export function CreditOptions({ creditOptions, onSelect }: CreditOptionsProps) {
  return (
    <div className="px-6 space-y-4">
      {creditOptions.map((option) => (
        <button
          key={option.amount}
          onClick={() => onSelect(option.amount)}
          className="w-full bg-gray-100 hover:bg-gray-200 hover:scale-[1.02] transition-all duration-200 rounded-lg py-6 px-6 flex items-center justify-between"
        >
          <div className="flex items-center">
            <PlusIcon className="h-6 w-6 mr-2" />
            <span className="text-gray-500">{option.amount}</span>
          </div>
          <span className="text-gray-500">${option.price || "N/A"}</span>
        </button>
      ))}
      <div className="h-8"></div>
    </div>
  );
}
