import Image from "next/image";

export function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/plus-icon.png"
      alt="Plus"
      width={24}
      height={24}
      className={className}
    />
  );
}
